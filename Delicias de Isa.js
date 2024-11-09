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
