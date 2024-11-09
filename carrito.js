const pintarCarrito = () => {
  modal.innerHTML = "";
  modal.style.display = "flex";
  
  // Encabezado del modal
  const modalCaptura = document.createElement("div");
  modalCaptura.className = "modal-captura";
  modalCaptura.innerHTML = `
    <h1 class="modal-captura-title">Carrito</h1>
  `;
  
  modal.append(modalCaptura);

  // Botón para cerrar el modal
  const modalButton = document.createElement("h1");
  modalButton.innerText = "❌";
  modalButton.className = "modal-captura-button";
  modalButton.addEventListener("click", () => {
    modal.style.display = "none";
  });
  modalCaptura.append(modalButton);

  // Mostrar productos en el carrito
  carrito.forEach((producto) => {
    let carritoContent = document.createElement("div");
    carritoContent.className = "modal-content";
    carritoContent.innerHTML = `
      <img src="${producto.img}">
      <h3>${producto.nombre}</h3>
      <p>Precio: ${producto.precio}$</p>
      <p>Ciudad: ${producto.ciudad}</p>
      <span class="restar"> - </span>
      <p>Unidades: ${producto.unidades}</p>
      <span class="sumar"> + </span>
      <p>Total: ${producto.unidades * producto.precio}$</p>
      <span class="delete-producto">❌</span>
    `;
    
    // Eventos para sumar y restar unidades
    const restar = carritoContent.querySelector(".restar");
    restar.addEventListener("click", () => {
      if (producto.unidades > 1) {
        producto.unidades--;
        saveLocal();
        pintarCarrito();
      }
    });

    const sumar = carritoContent.querySelector(".sumar");
    sumar.addEventListener("click", () => {
      producto.unidades++;
      saveLocal();
      pintarCarrito();
    });

    // Evento para eliminar el producto
    const eliminar = carritoContent.querySelector(".delete-producto");
    eliminar.addEventListener("click", () => {
      eliminarProducto(producto.id);
    });

    modal.append(carritoContent);
  });

  // Calcular y mostrar el total
  const total = carrito.reduce((acc, producto) => {
    return acc + (producto.precio || 0) * (producto.unidades || 0);
  }, 0);

  console.log("Total calculado:", total); // Verifica el total en la consola

  // Mostrar el total en el modal
  const totalBuying = document.createElement("div");
  totalBuying.className = "total-content";
  totalBuying.innerHTML = `Total a pagar: ${total}$`;
  modal.append(totalBuying);
};

// Mostrar el carrito al hacer clic en el botón
verCarrito.addEventListener("click", pintarCarrito);
