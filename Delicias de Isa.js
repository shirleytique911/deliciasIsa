
// const urlapi 





const cartitas = document.getElementById("cartitas");
const verCarrito=document.getElementById("verCarrito")
const modal=document.getElementById("modal")




let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const getObjetos= async () =>{
const response =await fetch("doc.Json");
const doc =await response.json();
console.log(doc);

doc.forEach((objeto) => {
  let content = document.createElement("div");
  content.className="card";
  content.innerHTML =`
 <img class="foto" src="${objeto.img}">
  <h3 class="nombre">${objeto.nombre}</h3>
  <p class="valor">$${objeto.precio}</p>
  <p class="unidades">${objeto.unidades}Un.</p>
  <p class="ciudad">${objeto.ciudad}</p>
  `;

  cartitas.append(content);

  let comprar = document.createElement("button");
  comprar.innerText ="comprar";
  content.className ="comprar";
content.append(comprar);


comprar.addEventListener("click", () => {
 carrito.push({
   id: objeto.id,
   nombre: objeto.nombre,
   precio: objeto.precio,
   ciudad: objeto.ciudad,
   img: objeto.img,
 });

   console.log(carrito);
 });
 });


 verCarrito.addEventListener("click",() => {

   const modalCaptura =document.createElement("div");
   modalCaptura.className="modal-captura";
   modalCaptura.innerHTML=`
    <h1 class="modal-captura-title">Carrito.</h1>

    `;

    modal.append(modalCaptura);

    const modalbutton =document.createElement("h1");
    modalbutton.innerText="opcion";
    modalbutton.className="modal-captura-button";

modalbutton.addEventListener("click",()=>{
 modal.style.display ="none";
});


    modalCaptura.append(modalbutton);



    
    carrito.forEach((objeto) =>{
    
    let carritoContent =document.createElement("div")
    carritoContent.className ="modal-content";
    carritoContent.innerHTML=`
  <h3>${objeto.nombre}</h3>
  <p>$${objeto.precio}</p>
  <p>${objeto.ciudad}</p>
   
    `;

    modal.append(carritoContent);

    });
const total =carrito.reduce((acc,el) => acc + el.precio, 0 )


const totalBuying = document.createElement("div")
   totalBuying.className ="total-content"
   totalBuying.innerHTML=`cancelar:${total} $`;
   
   modal.append(totalBuying);
   console.log();







   });



 };




doc.forEach((objeto) => {
   let content = document.createElement("div");
   content.className="card";
   content.innerHTML =`
  <img class="foto" src="${objeto.img}">
   <h3 class="nombre">${objeto.nombre}</h3>
   <p class="valor">$${objeto.precio}</p>
   <p class="unidades">${objeto.unidades}Un.</p>
   <p class="ciudad">${objeto.ciudad}</p>
   `;

   cartitas.append(content);

   let comprar = document.createElement("button");
   comprar.innerText ="comprar";
   content.className ="comprar";
content.append(comprar);


comprar.addEventListener("click", () => {
const repeat =carrito.some((repeatObjetos) => repeatObjetos.id === getObjetos.id);

if (repeat){
  carrito.map((prod) =>{
    if (prod.id === objetos.id){
      prod.cantidad++;
    }
  })
}else{
  carrito.push({
    id: objeto.id,
    nombre: objeto.nombre,
    precio: objeto.precio,
    ciudad: objeto.ciudad,
    img: objeto.img,
    unidades: objeto.unidades,
  });

    console.log(carrito);
    console.log(carrito.length);
    carritoCounter();
    saveLocal();
}
  });
});



getObjetos(); 


// set item
const saveLocal =() =>{
  localStorage.setItem("carrito", JSON.stringify(carrito));

};

  verCarrito.addEventListener("click",() => {

    const modalCaptura =document.createElement("div");
    modalCaptura.className="modal-captura";
    modalCaptura.innerHTML=`
     <h1 class="modal-captura-title">Carrito.</h1>

     `;

     modal.append(modalCaptura);

     const modalbutton =document.createElement("h1");
     modalbutton.innerText="opcion";
     modalbutton.className="modal-captura-button";

modalbutton.addEventListener("click",()=>{
  modal.style.display ="none";
});


     modalCaptura.append(modalbutton);



     
     carrito.forEach((objeto) =>{
     
     let carritoContent =document.createElement("div")
     carritoContent.className ="modal-content";
     carritoContent.innerHTML=`
   <h3>${objeto.nombre}</h3>
   <p>$${objeto.precio}</p>
   <p>${objeto.ciudad}</p>
    
     `;

     modal.append(carritoContent);

     });
const total =carrito.reduce((acc,el) => acc + el.precio, 0 )


const totalBuying = document.createElement("div")
    totalBuying.className ="total-content"
    totalBuying.innerHTML=`cancelar:${total} $`;
    
    modal.append(totalBuying);
    console.log();







    });

  
     


function saludarCliente() {

 alert("¡Bienvenido a nuestra tienda!");

}

saludarCliente();




