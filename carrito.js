   const pintarCarrito =() =>{
     modal.innerHTML ="";
     modal.style.display="flex";
     const modalCaptura= document.createElement("div");
     modalCaptura.className ="modal-captura";
     modalCaptura.innerHTML=`
      <h1 class="modal-captura-title">Carrito.</h1>
    `;
  
      modal.append(modalCaptura);
   
      const modalbutton =document.createElement("h1");
      modalbutton.innerText="❌";
      modalbutton.className="modal-captura-button";
    
  modalbutton.addEventListener("click",() => {
   modal.style.display ="none";
  });
  modalCaptura.append(modalbutton); 

      carrito.forEach((producto) =>{
      let carritoContent =document.createElement("div")
      carritoContent.className ="modal-content";
      carritoContent.innerHTML=`
      <img src="${producto.img}">
    <h3> ${producto.nombre}</h3>
    <p> ${producto.precio}</p>
    <p> ${producto.ciudad}</p>
    <span class="restar"> - </span>
    <p>unidades: ${producto.unidades}</p>
    <span class ="sumar"> + </span>
    <p>Total: ${producto.unidades * producto.precio}$</p>
    <span class ="delete-producto"> "❌" </span>

    `;
      }); 
      modal.append(carritoCounter);
 
  let restar = carritoContent.querySelector(".restar");
restar.addEventListener("click",() => {
    if(producto.unidades !== 1){
        producto.unidades--;
    };
carritoContent();
  saveLocal();
  pintarCarrito();

    });

    let sumar = carritoContent.querySelector(".sumar");
    sumar.addEventListener("click",() =>{
        producto.unidades++;
    
        saveLocal();
    pintarCarrito();
    carritoContent();
    });
    

let eliminar =carritoContent.querySelector(".delete-producto");

eliminar.addEventListener("click",() => {
    eliminarProducto(producto.id);
});


  const total =carrito.reduce((acc,el) => acc + el.precio * unidades, 0 )
  
  
  const totalBuying = document.createElement("div")
     totalBuying.className ="total-content"
     totalBuying.innerHTML=`Total a pagar:${total} $`;
       modal.append(totalBuying);
     
};

     verCarrito.addEventListener("click",pintarCarrito);

    const eliminarProducto =(id ) => {
      const foundId =carrito.find((element)=> element.id === id);
      console.log (foundId);
      pintarCarrito();
      saveLocal();
      carritoContent();
    
    };
      carrito =carrito.filter((carritoId)=>{
      return carritoId !== foundId;
      });  
    
  
  
  
  const carritoContent = ()=>{
    unidadesCarrito.style.display ="block";
    
    const carritoLengeth =carrito.length;
    
  
    localStorage.setItem("carritoLength",JSON.stringify(carritoLengeth));
    
    unidadescarrito.innerText = JSON.parse(localStorage.getItem("carritoLengeth"));
  };
  
    carritoContent();

  