//DOM PARA CARD DE PRODUCTOS
let cardProductos = document.getElementById('mostrarProductos')

//CARDS PRODUCTOS
function display(array) {
  cardProductos.innerHTML = "";
  for (let articulo of array) {
    let nuevoArticuloDiv = document.createElement("div")
    nuevoArticuloDiv.className = "col-12 col-md-6 col-lg-4 my-3"
    nuevoArticuloDiv.innerHTML = `
        <div id="${articulo.id}" class="cardProductos" >
            <img id="imgCard" src="img/${articulo.imagen}" class="card-img-top" alt="${articulo.nombre}">
            <div class="card-body">
                <h5 class="card-title">${articulo.nombre}</h5>
                <p class="card-text">Marca: ${articulo.marca}</p>
                <p class="card-text">Categoria: ${articulo.categoria}</p>
                <p class="card-descripcion">${articulo.detalle}</p>
                <p class="card-precio"> <strong>Precio: $${articulo.precio}</strong></p>
                <button id="addToCart${articulo.id}" class="btnAgregarCarrito btn  agregarCarrito">Agregar al carrito</button>
            </div>
        </div>
        `
    cardProductos.appendChild(nuevoArticuloDiv)

    let addToCart = document.getElementById(`addToCart${articulo.id}`)
    addToCart.onclick = () => {
      agregarCarrito(articulo.id)
    }
  }
}

setTimeout(() => {
  display(inventario)
}, 1000)


//FILTRO POR CATEGORIAS 

//SUSTRATOS
let inventarioSustratos = []

let verSustratos = document.getElementById("verSustratos")
function filtrarSust() {
  inventarioSustratos = inventario.filter((filtroSustratos) => filtroSustratos.categoria == "Sustratos")
  display(inventarioSustratos)
}
verSustratos.addEventListener('click', filtrarSust)


//FERTILIZANTES
let inventarioFertilizantes = []

let verFertilizantes = document.getElementById("verFertilizantes")
function filtrarFert() {
  inventarioFertilizantes = inventario.filter((filtroFertilizantes) => filtroFertilizantes.categoria == "Fertilizantes")
  display(inventarioFertilizantes)
}
verFertilizantes.addEventListener('click', filtrarFert)

//CUIDADO DE LAS PLANTAS
let inventarioCuidadoPlantas = []

let verCuidado = document.getElementById("verCuidado")
function filtrarCuidado() {
  inventarioCuidadoPlantas = inventario.filter((filtroCuidadoPlantas) => filtroCuidadoPlantas.categoria == "Cuidado de las Plantas")
  display(inventarioCuidadoPlantas)
}
verCuidado.addEventListener('click', filtrarCuidado)

//ACCESORIOS
let inventarioAccesorios = []

let verAccesorios = document.getElementById("verAccesorios")
function filtrarAcces() {
  inventarioAccesorios = inventario.filter((filtroAccesorios) => filtroAccesorios.categoria == "Accesorios")
  display(inventarioAccesorios)
}
verAccesorios.addEventListener('click', filtrarAcces)

//VER TODOS LOS PRODUCTOS
let verTodos = document.getElementById("verTodos")
function mostrarTodos() {
  display(inventario)
}
verTodos.addEventListener('click', mostrarTodos)



