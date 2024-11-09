const pintarCarrito = () => {
  modal.innerHTML = "";
  modal.style.display = "flex";
  
  // Encabezado del modal
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

      // Eventos para sumar y restar unidades
      let restar = carritoContent.querySelector(".restar");
      restar.addEventListener("click", () => {
        if (producto.unidades !== 1) {
          producto.unidades--;
        }
        saveLocal();
        pintarCarrito();
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

  // Calcular y mostrar el total
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

// Función para eliminar producto
const eliminarProducto = (id) => {
  carrito = carrito.filter((producto) => producto.id !== id);
  carritoCounter();
};

// Actualizar el contador de unidades en el carrito
const carritoCounter = () => {
  const carritoLength = carrito.reduce((acc, el) => acc + el.unidades, 0);
  unidadesCarrito.innerText = carritoLength;
};

// Función para obtener los productos desde un archivo JSON
const getObjetos = async () => {
  try {
    const response = await fetch("doc.Json");
    const doc = await response.json();
    console.log(doc);
    doc.forEach((producto) => {
      // Renderizar cada producto en la página
      renderizarProducto(producto);
    });
    pintarCarrito(); // Llamar a pintarCarrito después de obtener los productos
  } catch (error) {
    console.error("Error al cargar objetos:", error);
  }
};

// Función para renderizar un producto en la página
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
    // Lógica para añadir productos al carrito
  });
  content.append(comprar);
};

// Mostrar el carrito al hacer clic en el botón
verCarrito.addEventListener("click", pintarCarrito);

// Llamada a la función para obtener los productos
getObjetos();
