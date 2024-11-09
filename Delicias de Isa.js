function saludarCliente() {
  alert("¡Bienvenido a nuestra tienda!");
}

saludarCliente();

const cartitas = document.getElementById("cartitas");
const verCarrito = document.getElementById("verCarrito");
const modal = document.getElementById("modal");
const unidadesCarrito = document.getElementById("unidadesCarrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Función para actualizar el carrito y ocultar el carrito vacío
const actualizarCarrito = () => {
  const carritoElement = document.getElementById('carrito');
  const contadorCarrito = document.getElementById('contador-carrito');

  if (carrito.length === 0) {
    carritoElement.classList.add('vacio');
  } else {
    carritoElement.classList.remove('vacio');
    contadorCarrito.textContent = carrito.length;
  }
};

// Obtener productos
const getObjetos = async () => {
  try {
    const response = await fetch("doc.Json");
    const doc = await response.json();
    console.log(doc);
    doc.forEach((producto) => {
      renderizarProducto(producto);
    });
    pintarCarrito();
  } catch (error) {
    console.error("Error al cargar objetos:", error);
  }
};

const renderizarProducto = (producto) => {
  let content = document.createElement("div");
  content.className = "card";
  content.innerHTML = `
    <img src="${producto.img}">
    <h3>${producto.nombre}</h3>
    <p>$${producto.precio}</p>
    <p>${producto.ciudad}</p>
    <p>${producto.unidades}</p>
  `;
  cartitas.append(content);

  let comprar = document.createElement("button");
  comprar.innerText = "Comprar";
  comprar.className = "comprar";
  comprar.addEventListener("click", () => {
    const repeat = carrito.some((repeatProducto) => repeatProducto.id === producto.id);
    if (repeat) {
      carrito.map((prod) => {
        if (prod.id === producto.id) {
          prod.unidades++;
        }
      });
    } else {
      carrito.push({
        id: producto.id,
        img: producto.img,
        nombre: producto.nombre,
        unidades: 1,
        precio: producto.precio,
      });
    }
    console.log(carrito);
    saveLocal();
    actualizarCarrito();
  });
  content.append(comprar);
};

// Función para pintar el carrito
const pintarCarrito = () => {
  modal.innerHTML = "";
  modal.style.display = "flex";
  const modalCaptura = document.createElement("div");
  modalCaptura.className = "modal-captura";
  modalCaptura.innerHTML = `
    <h1 class="modal-captura-title">Carrito</h1>
    <span class="close-modal">&times;</span>
  `;
  modal.append(modalCaptura);

  if (carrito.length === 0) {
    const emptyCart = document.createElement("div");
    emptyCart.textContent = "El carrito está vacío";
    modal.append(emptyCart);
  } else {
    carrito.forEach((producto) => {
      let carritoContent = document.createElement("div");
      carritoContent.className = "modal-content";
      carritoContent.innerHTML = `
        <img class="modal-img" src="${producto.img}">
        <h3>${producto.nombre}</h3>
        <p>${producto.precio}</p>
        <p>${producto.ciudad}</p>
        <span class="restar">-</span>
        <p>Unidades: ${producto.unidades}</p>
        <span class="sumar">+</span>
        <p>Total: ${producto.unidades * producto.precio}$</p>
        <span class="delete-producto">❌</span>
      `;
      modal.append(carritoContent);

      let restar = carritoContent.querySelector(".restar");
      restar.addEventListener("click", () => {
        if (producto.unidades > 1) {
          producto.unidades--;
          saveLocal();
          pintarCarrito();
        }
      });

      let sumar = carritoContent.querySelector(".sumar");
      sumar.addEventListener("click", () => {
        producto.unidades++;
        saveLocal();
        pintarCarrito();
      });

      let eliminar = carritoContent.querySelector(".delete-producto");
      eliminar.addEventListener("click", () => {
        eliminarProducto(producto.id);
        saveLocal();
        pintarCarrito();
      });
    });
  }

  const total = carrito.reduce((acc, el) => acc + el.precio * el.unidades, 0);
  const totalBuying = document.createElement("div");
  totalBuying.className = "total-content";
  totalBuying.innerHTML = `Total a pagar: ${total}$`;
  modal.append(totalBuying);

  const closeModal = document.querySelector(".close-modal");
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });
};

// Función para eliminar producto del carrito
const eliminarProducto = (id) => {
  carrito = carrito.filter((producto) => producto.id !== id);
  carritoCounter();
};

// Función para contar productos en el carrito
const carritoCounter = () => {
  const carritoLength = carrito.reduce((acc, el) => acc + el.unidades, 0);
  unidadesCarrito.innerText = carritoLength;
};

// Guardar el carrito en localStorage
const saveLocal = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

// Llamada inicial para cargar los productos y actualizar el carrito
getObjetos();
actualizarCarrito();

// Evento para abrir el carrito
verCarrito.addEventListener("click", pintarCarrito);
