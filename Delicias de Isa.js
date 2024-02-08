

function saludarCliente() {

 alert("¡Bienvenido a nuestra tienda!");

}

saludarCliente();





const cartitas = document.getElementById("cartitas");
const verCarrito=document.getElementById("verCarrito")
const modal=document.getElementById("modal")
// const showAlert =document.getElementById("showAlert")
const unidadesCarrito = document.getElementById("unidadesCarrito");




let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const getObjetos = async () =>{
const response =await fetch("doc.Json")
const doc =await response.json();
console.log(doc);

doc.forEach((producto) => {
  let content = document.createElement("div");
  content.className="card";
  content.innerHTML =`
 <img  src="${producto.img}">
  <h3 >${producto.nombre}</h3>
  <p > $${producto.precio}</p>
  <p >${producto.ciudad}</p>
  <p>${producto.unidades}</p>
  `;

  cartitas.append(content);

  let comprar = document.createElement("button");
  comprar.innerText ="comprar";
  comprar.className ="comprar";

content.append(comprar);


comprar.addEventListener("click", () => {
  const repeat =carrito.some((repeatProducto) => repeatProducto.id === producto.id);

  if(repeat){

    carrito.map((prod) =>{
      if(prod.id === producto.id){
        prod.unidades++;
      }
    });
  }else{
    carrito.push({
      id:producto.id,
      img: producto.img,
      nombre: producto.nombre,
      unidades: producto.unidades,
    });
  console.log (carrito);
  console.log(carrito.length);
  carritoCounter();
  saveLocal();
  }
});
});



}
getObjetos()


//set item
const saveLocal =() => {
  localStorage.setItem("carrito",JSON.stringify(carrito));
};

//get item


JSON.parse(localStorage.getItem("carrito"));


  



 














     





