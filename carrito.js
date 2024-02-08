const pintarCarrito = () => {
  modal.innerHTML = "";
  modal.style.display = "flex";
  const modalCaptura = document.createElement("div");
  modalCaptura.className = "modal-captura";
  modalCaptura.innerHTML = `
    <h1 class="modal-captura-title">Carrito.</h1>
  `;
  modal.append(modalCaptura);

  carrito.forEach((producto) => {
    let carritoContent = document.createElement("div");
    carritoContent.className = "modal-content";
    carritoContent.innerHTML = `
      <img src="${producto.img}">
      <h3>${producto.nombre}</h3>
      <p>${producto.precio}</p>
      <p>${producto.ciudad}</p>
      <span class="restar">-</span>
      <p>unidades: ${producto.unidades}</p>
      <span class="sumar">+</span>
      <p>Total: ${producto.unidades * producto.precio}$</p>
      <span class="delete-producto">❌</span>
    `;
    modal.append(carritoContent);

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

  const total = carrito.reduce((acc, el) => acc + el.precio * el.unidades, 0);
  const totalBuying = document.createElement("div");
  totalBuying.className = "total-content";
  totalBuying.innerHTML = `Total a pagar: ${total}$`;
  modal.append(totalBuying);
};

const eliminarProducto = (id) => {
  carrito = carrito.filter((producto) => producto.id !== id);
};

const carritoContent = () => {
  const carritoLengeth = carrito.reduce((acc, el) => acc + el.unidades, 0);
  unidadescarrito.innerText = carritoLengeth;
};

const getObjetos = async () => {
  const response = await fetch("doc.Json");
  const doc = await response.json();

  doc.forEach((producto) => {
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
    comprar.innerText = "comprar";
    comprar.className = "comprar";
    comprar.addEventListener("click", () => {
      const repeat = carrito.some((prod) => prod.id === producto.id);
      if (repeat) {
        carrito.find((prod) => prod.id === producto.id).unidades++;
      } else {
        carrito.push({ ...producto, unidades: 1 });
      }
      saveLocal();
      carritoContent();
    });
    content.append(comprar);
  });
};

verCarrito.addEventListener("click", pintarCarrito);
carritoContent();
getObjetos();

