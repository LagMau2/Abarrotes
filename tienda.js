const fs = require('fs')

function traerProductos(archivo) {
  const contenido = fs.readFileSync(archivo, 'utf-8')
  const lineas = contenido.trim().split('\n')
  const encabezados = lineas.shift().split(',')
  const productos = []
  for (const linea of lineas) {
    const valores = linea.split(',')
    const producto = {}
    for (let i = 0; i < encabezados.length; i++) {
      producto[encabezados[i]] = valores[i]
    }
    productos.push(producto)
  }
  return productos
}

const listaDeInventario = traerProductos('productos.csv');

// generar reportes

const punto1 = listaDeInventario.filter(p => p.existencia > 20);
const num1 = punto1.length;

console.log(`El numero de productos con mas de 20 en existencia es: ${num1}`);
console.log("");

const punto2 = listaDeInventario.filter(p => p.existencia < 15);
const num2 = punto2.length;

console.log(`El numero de productos con menos de 15 en existencia es: ${num2}`);
console.log("");

const clasificaciones = [...new Set(listaDeInventario.map((p) => p.clasificacion))];
clasificaciones.forEach((clasificacion) => {
    const productosClasificados = listaDeInventario.filter((p) => p.clasificacion === clasificacion && p.precio > 15.50);
    console.log(`Productos clasificados como ${clasificacion} y con precio mayor a 15.50:`);
    console.log(productosClasificados);
  });
console.log("");

const punto4 = listaDeInventario.filter(p => p.precio > 20.30 && p.precio < 45.00);
console.log("Productos con precio mayor a 20.30 y menor a 45.00:");
punto4.forEach(p => console.log(p.descripcion));
console.log("");


const punto5 = listaDeInventario.reduce((cont, actual) => {
    if (cont[actual.clasificacion]) {
      cont[actual.clasificacion]++;
    } else {
      cont[actual.clasificacion] = 1;
    }
    return cont;
  }, {});
  
console.log("Número de productos agrupados por su clasificación:");
console.log(punto5);
