
const cartitas = document.getElementById("cartitas");
const verCarrito=document.getElementById("verCarrito")
const modal=document.getElementById("modal")


const Productos =[



  { id:1, nombre:"almojabanas",precio: 2000,unidades: 400,ciudad:"ibague",img:"https://scontent.fibe1-1.fna.fbcdn.net/v/t1.6435-9/98205729_10222820604210463_8633883162683899904_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=FtJICEEGmRMAX-mamEB&_nc_ht=scontent.fibe1-1.fna&oh=00_AfCzDio0T1nVTJcp97x3v8C32dhuAyDf_nhPa3Aan1XI-A&oe=64A649B1"},

  { id:2, nombre:"pandeyucas",precio: 2000, unidades: 400,ciudad:"ibague", img:"https://scontent.fibe1-1.fna.fbcdn.net/v/t1.6435-9/99122753_10222820601650399_525658990068105216_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=oLUd-Br8dKsAX8Nx1Sa&_nc_ht=scontent.fibe1-1.fna&oh=00_AfAzdE02YLICMMYXQW6jtVPBNM_kWPF7MZOOaZ4pbeKaMg&oe=64A65296"},

  { id:3, nombre:"bizcochos",precio: 4000, unidades: 400,ciudad:"ibague", img:"https://media-cdn.tripadvisor.com/media/photo-s/1a/be/23/c0/bizcochos-de-achira-y.jpg"},

  {id:4, nombre:"bizcochuelos",precio: 6000, unidades: 400,ciudad:"ibague",img:"https://scontent.fibe1-1.fna.fbcdn.net/v/t1.6435-9/99127654_10222820609050584_6367990990069825536_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=dmMlgHYncgUAX-gP6gW&_nc_ht=scontent.fibe1-1.fna&oh=00_AfAK8blIUgyFAyLqHEGLourz3_BnmiKwV8qg2jjM7ZbdTw&oe=64A63FBE" },

  {id:5, nombre:"almojabanas de dulce",precio: 2500, unidades: 400,ciudad:"ibague",img:"https://blog.redbus.co/wp-content/uploads/2020/04/almojabana-1280x720.jpg"},

  {id:6, nombre:"pandeyucas de dulce",precio: 2500, unidades: 400,ciudad:"ibague",img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN69C84ISh1x_dhb39YkBoPC64h9jIP3paNQ&usqp=CAU"},

  {id:7, nombre:"merengues",precio:3000, unidades:400,ciudad:"ibague",img:"https://img-global.cpcdn.com/recipes/aeb3bc3836547403/1360x964cq70/merengues-o-suspiros-foto-principal.webp" },

  {id:8, nombre:"bizcochos de achira", precio:8000, unidades: 400,ciudad:"ibague",img:"https://cdn.colombia.com/gastronomia/2011/08/05/achira-1568.gif" },

  {id:9, nombre:"bizcochos de manteca", precio:3000, unidades: 400,ciudad:"ibague",img:"https://img-global.cpcdn.com/recipes/42c1063d14df1547/1200x630cq70/photo.jpg"},

  {id:10, nombre:"panderos", precio:4000, unidades: 400,ciudad:"ibague",img:"https://img-global.cpcdn.com/recipes/2850f7565061226b/1360x964cq70/panderos-vallunos-foto-principal.webp"},

]


let carrito = []


Productos.forEach((objeto) => {
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
   content.className ="comprar"

content.append(comprar);


comprar.addEventListener("click", () => {
  carrito.push({
    id: objeto.id,
    nombre: objeto.nombre,
    precio: objeto.precio,
    ciudad: objeto.ciudad,
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



    });

 













function saludarCliente() {

 alert("¡Bienvenido a nuestra tienda!");

}

saludarCliente();



