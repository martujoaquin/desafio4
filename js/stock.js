//clase producto
class Producto {
  constructor(nombre, precio, cantidad) {
    this.nombre = nombre;
    this.precio = parseFloat(precio);
    this.cantidad = parseInt(cantidad);
  }
  sumarIva() {
    return this.precio * 1.21;
  }
  precioSugerido() {
    return this.precio * 1.21 * 1.25;
  }
}

//funcion mensaje no ingresa producto
function noIngresa() {
  alert("Ingrese menos");
  arrayProductos[0] = 0;
}

const url = "./js/productos.json";
const EjProductos=async()=>{
  const respuesta=await fetch(url);
  const productos=await respuesta.json()
  let tituloEj = document.createElement("h2");
  tituloEj.innerHTML=`<h3>Ejemplos:</h3>`;
  document.body.appendChild(tituloEj);
  productos.forEach(productos => {
    let { nombre, precio, cantidad } = productos;
    let ejemplo = document.createElement("div");
    ejemplo.innerHTML = `<div class="card">
      <h4>Nombre: ${nombre.toUpperCase()}</h4>
      <p>Cantidad: ${cantidad}</p>
      <p>Precio: $${precio}</p>
      </div>`;
    document.body.appendChild(ejemplo);
  });
}

EjProductos();

setTimeout(() => {
  Toastify({
    text: "Cargar productos",
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "blue",
    },
    onClick: function(){ cargarProductos() } // Callback after click
  }).showToast();
}, 2000);


const arrayProductos = [];
function cargarProductos(){
  let compro = prompt("Ingrese el nombre del producto o 'FIN' para terminar de agregar");
  if(compro.toUpperCase()==="FIN"){
      noIngresa();
      arrayProductos[0]=0;
  }else{
      while(compro.toUpperCase()!="FIN"){
          let nombreP = compro;
          let precioP = prompt("Ingrese el precio del producto");
          let cantidadP = prompt("Ingrese la cantidad comprada del producto");
          arrayProductos.push(new Producto(nombreP,precioP,cantidadP));
          compro=prompt("Ingrese el nombre del producto o 'FIN' para terminar de agregar");
      }
  }
  Toastify({
    text: "Cargaste tus productos!",
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "blue",
    },
    onClick: function(){} // Callback after click
  }).showToast();
  
  Toastify({
    text: "Tocá para imprimir",
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "blue",
    },
    onClick: function(){
      imprimirProductos();
      prodpocoStock();
      prodsinstock();
      setTimeout(()=>{
        Ordenar();
      },3000);
    } // Callback after click
  }).showToast();
}




let producto

//imprimir productos
function imprimirProductos(){
  let tituloProd = document.createElement("h2");
  tituloProd.innerHTML=`<h3>Tus productos:</h3>`;
  document.body.appendChild(tituloProd);
  for (producto of arrayProductos) {
    let { nombre, precio, cantidad } = producto;
    let contenedor = document.createElement("div");
    contenedor.innerHTML = `<div class="card">
      <h4>Nombre: ${nombre.toUpperCase()}</h4>
      <p>Cantidad: ${cantidad}</p>
      <p>Precio: $${precio}</p>
      <p>Precio con IVA: $${producto.sumarIva().toFixed(2)}</p>
      <b>Precio sugerido: $${producto.precioSugerido().toFixed(2)}</b>
      </div>`;
    document.body.appendChild(contenedor);
  }
}


//poco stock - menos de 2 productos
function prodpocoStock() {
  const pocoStock = arrayProductos.filter((producto) => producto.cantidad <= 2);
  if (pocoStock != 0){
    let tituloPstock = document.createElement("h4");
    tituloPstock.innerHTML =
      "<h4>Lista de productos con stock menor a dos unidades:</h4>";
    document.body.appendChild(tituloPstock);
    for (producto of pocoStock) {
      let { nombre, precio, cantidad } = producto;
      let pstock = document.createElement("ul");
      pstock.innerHTML = `<ul class="lista">
              <li>Nombre: <b>${nombre.toUpperCase()}</b>, Cantidad: ${cantidad}</li>
              </ul>`;
      document.body.appendChild(pstock);
    }
  }
}



//sin stock
function prodsinstock() {
  const sinStock = arrayProductos.filter((producto) => producto.cantidad == 0);
  if(sinStock!=0){
    let tituloSstock = document.createElement("h4");
    tituloSstock.innerHTML = "<h4>Lista de productos sin stock:</h4>";
    document.body.appendChild(tituloSstock);
    for (producto of sinStock) {
      let { nombre, precio, cantidad } = producto;
      let sstock = document.createElement("ul");
      sstock.innerHTML = `<ul class="lista">
              <li>Nombre: <b>${nombre.toUpperCase()}</b>, Cantidad: ${cantidad}</li>
              </ul>`;
      document.body.appendChild(sstock);
    }
  }
}


//funcion imprimir
function imprimir(ordenados) {
  Toastify({
    text: "Ordenaste tus productos!",
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "blue",
    },
    onClick: function(){} // Callback after click
  }).showToast();
  for (producto of ordenados) {
    let { nombre, precio, cantidad } = producto;
    let ordenados = document.createElement("div");
    ordenados.innerHTML = `<div class="card">
            <h4>Nombre: ${nombre.toUpperCase()}</h4>
            <p>Cantidad: ${cantidad}</p>
            <p>Precio: $${precio}</p>
            </div>`;
    document.body.appendChild(ordenados);
  }
}

function Ordenar(){
  const ordenados = arrayProductos.map((el) => el);
  let tituloOrdenados;
  
  if (arrayProductos[0] != 0) {
    let opcion = parseInt(
      prompt(
        "Ingrese una opción:\n1. Ordenar por precio ascendente.\n2. Ordenar por precio descendente.\n3. Ordenar de la A-Z.\n4. Ordenar de la Z-A.\n5. Ordenar por cantidad ascendente.\n6. Ordenar por cantidad descendente."
      )
    );
  
    switch (opcion) {
      case 1:
        tituloOrdenados = document.createElement("h2");
        tituloOrdenados.innerHTML = `<h2>Productos ordenados por Precio Ascendente: </h2>`;
        document.body.append(tituloOrdenados);
        ordenados.sort((a, b) => a.precio - b.precio);
        imprimir(ordenados);
        break;
      case 2:
        tituloOrdenados = document.createElement("h2");
        tituloOrdenados.innerHTML = `<h2>Productos ordenados por Precio Descendente: </h2>`;
        document.body.append(tituloOrdenados);
        ordenados.sort((a, b) => b.precio - a.precio);
        imprimir(ordenados);
        break;
      case 3:
        tituloOrdenados = document.createElement("h2");
        tituloOrdenados.innerHTML = `<h2>Productos en orden alfabético: </h2>`;
        document.body.append(tituloOrdenados);
        ordenados.sort((a, b) => {
          if (a.nombre > b.nombre) {
            return 1;
          }
          if (a.nombre < b.nombre) {
            return -1;
          }
          //a = b
          return 0;
        });
        imprimir(ordenados);
        break;
      case 4:
        tituloOrdenados = document.createElement("h2");
        tituloOrdenados.innerHTML = `<h2>Productos de la Z-A: </h2>`;
        document.body.append(tituloOrdenados);
        ordenados.sort((a, b) => {
          if (a.nombre < b.nombre) {
            return 1;
          }
          if (a.nombre > b.nombre) {
            return -1;
          }
          //a = b
          return 0;
        });
        imprimir(ordenados);
        break;
      case 5:
        tituloOrdenados = document.createElement("h2");
        tituloOrdenados.innerHTML = `<h2>Productos ordenados por Cantidad Ascendente: </h2>`;
        ordenados.sort((a, b) => a.cantidad - b.cantidad);
        imprimir(ordenados);
        break;
      case 6:
        tituloOrdenados = document.createElement("h2");
        tituloOrdenados.innerHTML = `<h2>Productos ordenador por Cantidad Descendente: </h2>`;
        ordenados.sort((a, b) => b.cantidad - a.cantidad);
        imprimir(ordenados);
        break;
    }
  }
}


/* const btnSiguiente = document.querySelector("#siguiente"), btnEnviar = document.querySelector("#enviar"), cantidad = document.querySelector("#cantidad"), precio = document.querySelector("#precio"), prod = document.querySelector("#prod");


//clase Producto
class Producto{
    constructor(prod,precio,cantidad){
        this.nombre = prod;
        this.precio = parseFloat(precio);
        this.cantidad = parseInt(cantidad);
    }
    sumarIva(){
        return this.precio*1.21;
    }
    precioSugerido(){
        return this.precio*1.21*1.25;
    }
}


btnEnviar.addEventListener("click", (e)=>{
    e.preventDefault();
    let producto = new Producto (prod,precio,cantidad);
    const arrayProductos = [];
    arrayProductos[0]=producto;
    
    console.log(arrayProductos[0]);
})

let botonEnviar=0;

const arrayProductos = [];
function agregarProducto(produ){
    for(let i=0; botonEnviar==0; i++){
        arrayProductos[i]=produ;
    }
}

btnEnviar.addEventListener("click",(e)=>{
    e.preventDefault();
    botonEnviar++;
    console.log(botonEnviar);
    let producto = new Producto (prod, precio, cantidad);
    agregarProducto(producto);
});


btnSiguiente.addEventListener("click",(e)=>{
    let producto = new Producto (prod, precio, cantidad);
    agregarProducto(producto);
}) */
