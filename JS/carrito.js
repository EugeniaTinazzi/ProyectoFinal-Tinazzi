////FUNCTION PARA LOS BOTONES DE LAS CARDS Y AGREGAR A CARRITO

let arrayCarrito = []

arrayCarrito = JSON.parse(localStorage.getItem('carritoCompras'))

arrayCarrito == undefined ? arrayCarrito = [] : arrayCarrito = JSON.parse(localStorage.getItem('carritoCompras'))

console.log(arrayCarrito) // para mostrar lo que hay en localStorage

function agregarCarrito(idBuscado) {
  let productoAgregado = inventario.find((objeto) => objeto.id == idBuscado)
  arrayCarrito.push(productoAgregado)
  localStorage.setItem('carritoCompras', JSON.stringify(arrayCarrito))

  Swal.fire({
    title: 'Producto agregado',
    text: `${productoAgregado.nombre} ha sido agregado`,
    icon: 'success',
    confirmButtonText: "OK",
    confirmButtonColor: "#A197AD",
    timer: 2500,
    imageUrl: `img/${productoAgregado.imagen}`,
    imageHeight: 100
  })

  mostrarCarrito()
  calcularSubtotal()
  listaProductos()
}


//BOTON VACIAR EL CARRITO DE COMPRAS

let botonVaciarCarrito = document.getElementById(`vaciarCarrito`)

function vaciar() {
  //arrayCarrito.splice(0, arrayCarrito.length)
  //localStorage.removeItem('carritoCompras')
  arrayCarrito = []
  localStorage.setItem('carritoCompras', JSON.stringify(arrayCarrito))

}

//DOM DEL CARRITO DE COMPRAS

let domCarrito = document.getElementById('carritoDeCompras')

function mostrarCarrito() {
  domCarrito.innerHTML = ``
  for (let articulos of arrayCarrito) {
    let innerDomCarrito = document.createElement('tr')
    innerDomCarrito.innerHTML = `
        <th scope="row"><img src="img/${articulos.imagen}" class="thumbnail" alt=""></th>
        <td><p>${articulos.nombre}</p></td>
        <td><p><strong>$${articulos.precio}</strong></p></td>
        <td><button class= "btn btnEliminar" onclick="funcionDelete(${articulos.id})"><i class="fas fa-trash-alt"></i></button></td>  
        `
    domCarrito.appendChild(innerDomCarrito)
  }
}

//OFFCANVAS 

let mostrarProductos = document.getElementById('showProduct')

function listaProductos() {
  mostrarProductos.innerHTML = ``
  for (let articulos of arrayCarrito) {
    let innerMostrarProductos = document.createElement('p')
    innerMostrarProductos.className = `listOffCanvas`
    innerMostrarProductos.innerHTML = `
      <i onclick="funcionDelete(${articulos.id})" class="fas fa-trash-alt trashCheckout"></i> ${articulos.nombre} $${articulos.precio}
    `
/*     innerMostrarProductos.innerHTML = `
      <li class="list-group-item listCheckout"><i onclick="funcionDelete(${articulos.id})" class="fas fa-trash-alt trashCheckout"></i> ${articulos.nombre} $${articulos.precio} </li>
    ` */
    mostrarProductos.appendChild(innerMostrarProductos)
  }
}


let DOMSubtotal = document.getElementById(`totalCarrito`)
let subtotal = 0

function mostrarSubtotal() {
  DOMSubtotal.innerHTML = `
        <p><strong>El total de su compra es: </strong> $${subtotal}</p>
    `
}

function calcularSubtotal() {
  subtotal = arrayCarrito.reduce((acumulador, productoCarrito) => acumulador + productoCarrito.precio, 0)
  if (subtotal == 0) {
    DOMSubtotal.innerHTML = ``
  } else {
    mostrarSubtotal()
  }
}


let FinalizarCompra = document.getElementById('FinalizarCompra')
let subtotalOffcanvas = document.getElementById('subtotalOffcanvas')

function mostrarSubtotalPago() {
  let IVA = Math.ceil(subtotal * .21)
  let subtotalSinIVA = subtotal - IVA
  subtotalOffcanvas.innerHTML = `
    <div class="d-flex align-items-center justify-content-between mb-2">
      <p>Subtotal</p>
      <p><span class="fas fa-dollar-sign"></span>${subtotalSinIVA}</p>
    </div>
    <div class="d-flex align-items-center justify-content-between mb-2">
      <p>IVA<span>(21%)</span></p>
      <p><span class="fas fa-dollar-sign"></span>${IVA}</p>
    </div>
    <div class="d-flex align-items-center justify-content-between mb-2">
      <p class="fw-bold">Total con IVA</p>
      <p class="fw-bold"><span class="fas fa-dollar-sign"></span>${subtotal}</p>
    </div>
    <div onclick="pagar()" class="btn btn-primary mt-2">PAGAR<span class="fas fa-dollar-sign px-1"></span>${subtotal}</div>
`
}

FinalizarCompra.addEventListener('click',mostrarSubtotalPago)

botonVaciarCarrito.addEventListener('click', vaciar)
botonVaciarCarrito.addEventListener('click', mostrarCarrito)
botonVaciarCarrito.addEventListener('click', calcularSubtotal)
botonVaciarCarrito.addEventListener('click', mostrarSubtotal)
botonVaciarCarrito.addEventListener('click', listaProductos)

function funcionDelete(IDProd) {
  let indice = arrayCarrito.findIndex(producto => producto.id === IDProd);
  arrayCarrito.splice(indice, 1)
  localStorage.setItem('carritoCompras', JSON.stringify(arrayCarrito)) // cargar carrito [] al storage
  mostrarCarrito()
  calcularSubtotal()
  mostrarSubtotal()
  listaProductos()
}

function pagar() {

  //VALIDAR EMAIL Y TARJETA

  //validacion de mail de https://www.coderbox.net/blog/validar-email-usando-javascript-y-expresiones-regulares/

               
	let emailField = document.getElementById('emailField');
	let validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
  let tarjetaCredito = document.getElementById('tarjetaCredito')
  let caducidadTarjeta = document.getElementById('caducidadTarjeta')
  let CVV = document.getElementById('CVV')
  let formPago = document.getElementById('formPago')
  
  if (tarjetaCredito.value.length != 16 || isNaN(parseInt(tarjetaCredito.value))){
    Swal.fire({
      title: 'El número de la tarjeta no es válido',
      icon: 'error',
      confirmButtonText: "OK",
      confirmButtonColor: "light purple",
      timer: 2500,
    })
  
  } else if (caducidadTarjeta.value.length != 4 || isNaN(parseInt(caducidadTarjeta.value))){
    Swal.fire({
      title: 'La fecha de caducidad no es válida',
      icon: 'error',
      confirmButtonText: "OK",
      confirmButtonColor: "light purple",
      timer: 2500,
    })
  } else if (CVV.value.length != 3 || isNaN(parseInt(CVV.value))){
    Swal.fire({
      title: 'El código de seguridad de la tarjeta no es válido',
      icon: 'error',
      confirmButtonText: "OK",
      confirmButtonColor: "light purple",
      timer: 2500,
    })
    
  }else if( validEmail.test(emailField.value) ){

  //si el email es valido, chequea si hay productos en carrito

    console.log(arrayCarrito)
    if(arrayCarrito.length == 0){
      Swal.fire({
        title: 'No hay nada en el carrito',
        icon: 'error',
        confirmButtonText: "OK",
        confirmButtonColor: "light purple",
        timer: 2500,
      })
    }else{
      vaciar()
      subtotalOffcanvas.innerHTML=''
      Swal.fire({
        title: 'Usted ha pagado!',
        text: `Gracias por su compra`,
        icon: 'success',
        confirmButtonText: "OK",
        confirmButtonColor: "light purple",
        timer: 2500,
      })
      mostrarCarrito()
      calcularSubtotal()
      mostrarSubtotal()
      listaProductos()
      formPago.reset()
    }
		return true;
	}else{
    Swal.fire({
      title: 'El email no es correcto',
      icon: 'error',
      confirmButtonText: "OK",
      confirmButtonColor: "light purple",
      timer: 2500,
    })
		return false;
	}
}


mostrarCarrito()
calcularSubtotal()
mostrarSubtotal()
listaProductos()
