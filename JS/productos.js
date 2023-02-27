class Productos {
  constructor(id, nombre, marca, categoria, detalle, precio, imagen) {
    this.id = id,
    this.nombre = nombre,
    this.marca = marca,
    this.categoria = categoria,
    this.detalle = detalle
    this.precio = precio,
    this.imagen = imagen
  }
}

// DEFINIR Y CARGAR ARRAY INVENTARIO (CATALOGO DE PRODUCTOS)

let inventario = []
const cargarInventario = async () => {
  const respuesta = await fetch("productos.json")
  const data = await respuesta.json()
  for (let articulo of data) {
    let articuloNuevo = new Productos(articulo.id, articulo.nombre, articulo.marca, articulo.categoria, articulo.detalle, articulo.precio, articulo.imagen)
    inventario.push(articuloNuevo)
  }
  console.log(inventario)
  localStorage.setItem('inventario', JSON.stringify(inventario))

}

if (localStorage.getItem("inventario")) {
  for (let articulo of JSON.parse(localStorage.getItem("inventario"))) {
    let articuloStorage = new Productos(articulo.id, articulo.nombre, articulo.marca, articulo.categoria, articulo.detalle, articulo.precio, articulo.imagen)
    inventario.push(articuloStorage)

  }
  console.log(inventario)
} else {
  cargarInventario()
}



