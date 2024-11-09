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
  const carritoElement = document.getElementById('carrito');  // Asumiendo que tienes un ID 'carrito'
  const contadorCarrito = document.getElementById('contador-carrito'); // Asumiendo que tienes un ID 'contador-carrito'

  if (carrito.length === 0) {
    carritoElement.classList.add('vacio'); // Ocultar el carrito si está vacío
  } else {
    carritoElement.classList.remove('vacio'); // Mostrar el carrito si tiene productos
    contadorCarrito.textContent = carrito.length; // Actualizar el contador de productos
  }
};

const getObjetos = async () => {
  const response = await fetch("doc.Json");
  const doc = await response.json();
  console.log(doc);

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
    comprar.innerText = "Comprar";
    comprar.className = "comprar";

    content.append(comprar);

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
      console.log(carrito.length);
      carritoCounter();
      saveLocal();
      actualizarCarrito(); // Actualizamos el carrito después de agregar un producto
    });
  });
};

getObjetos();

// Función para guardar el carrito en el localStorage
const saveLocal = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

// Llamada inicial para actualizar el estado del carrito al cargar la página
actualizarCarrito();