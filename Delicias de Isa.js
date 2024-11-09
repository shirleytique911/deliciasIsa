function saludarCliente() {
  alert("¡Bienvenido a nuestra tienda!");
}

saludarCliente();

const cartitas = document.getElementById("cartitas");  // Solo debe declararse una vez
const verCarrito = document.getElementById("verCarrito");
const modal = document.getElementById("modal");
const unidadesCarrito = document.getElementById("unidadesCarrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Función para guardar el carrito en el localStorage
const saveLocal = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

// Función para actualizar el carrito en el ícono del carrito
const actualizarCarrito = () => {
  unidadesCarrito.textContent = carrito.length;
  verCarrito.classList.toggle("active", carrito.length > 0);  // Muestra el carrito solo si tiene productos
};

// **Aquí está tu función pintarCarrito, ya definida correctamente**
const pintarCarrito = () => {
  modal.innerHTML = "";
  modal.style.display = "flex";

  const modalCaptura = document.createElement("div");
  modalCaptura.className = "modal-captura";
  modalCaptura.innerHTML = `<h1 class="modal-captura-title">Carrito</h1>`;
  modal.append(modalCaptura);

  const modalButton = document.createElement("h1");
  modalButton.innerText = "❌";
  modalButton.className = "modal-captura-button";
  modalButton.addEventListener("click", () => {
    modal.style.display = "none";
  });
  modalCaptura.append(modalButton);

  if (carrito.length === 0) {
    const mensajeVacio = document.createElement("p");
    mensajeVacio.innerText = "El carrito está vacío.";
    modal.append(mensajeVacio);
    return;
  }

  carrito.forEach((producto) => {
    let carritoContent = document.createElement("div");
    carritoContent.className = "modal-content";
    carritoContent.innerHTML = `
      <img src="${producto.img}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>Precio: ${producto.precio}$</p>
      <p>Ciudad: ${producto.ciudad}</p>
      <span class="restar"> - </span>
      <p>Unidades: ${producto.unidades}</p>
      <span class="sumar"> + </span>
      <p>Total: ${producto.unidades * producto.precio}$</p>
      <span class="delete-producto">❌</span>
    `;

    const restar = carritoContent.querySelector(".restar");
    restar.addEventListener("click", () => {
      if (producto.unidades > 1) {
        producto.unidades--;
        saveLocal();
      }
    });

    const sumar = carritoContent.querySelector(".sumar");
    sumar.addEventListener("click", () => {
      producto.unidades++;
      saveLocal();
    });

    const eliminar = carritoContent.querySelector(".delete-producto");
    eliminar.addEventListener("click", () => {
      carrito = carrito.filter((prod) => prod.id !== producto.id);
      saveLocal();
    });

    modal.append(carritoContent);
  });

  const total = carrito.reduce((acc, producto) => acc + producto.precio * producto.unidades, 0);
  const totalBuying = document.createElement("div");
  totalBuying.className = "total-content";
  totalBuying.innerHTML = `Total a pagar: ${total}$`;
  modal.append(totalBuying);
};

// Función para cargar productos
const getObjetos = async () => {
  const response = await fetch("doc.Json");
  const productos = await response.json();

  productos.forEach((producto) => {
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
      <img src="${producto.img}">
      <h3>${producto.nombre}</h3>
      <p>${producto.precio}$</p>
      <p>${producto.ciudad}</p>
    `;

    cartitas.append(content);

    let comprar = document.createElement("button");
    comprar.innerText = "Comprar";
    comprar.className = "comprar";
    content.append(comprar);

    comprar.addEventListener("click", () => {
      const existe = carrito.some((prod) => prod.id === producto.id);
      if (existe) {
        carrito.forEach((prod) => {
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
      saveLocal();
      actualizarCarrito();
    });
  });
};

getObjetos();

// Actualiza el carrito al cargar la página
actualizarCarrito();

// Mostrar el carrito al hacer clic
verCarrito.addEventListener("click", pintarCarrito);
