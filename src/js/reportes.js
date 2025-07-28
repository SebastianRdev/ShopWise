const endpointMovimientos = "http://localhost:3000/movimientos"
const endpointCategorias = "ttp://localhost:3000/categories"
const reportes = document.getElementById("grid-reportes")

document.addEventListener("DOMContentLoaded", function () {
    acumuladoVentas()
    acumuladoCompras()
    categoriaVentas()
})

async function categoriaVentas() {
    const response = await fetch(`${endpointMovimientos}?tipo=venta&_embed=category`)
    const data = await response.json()

    const acumuladosPorCategoria = {}

    data.forEach(rep => {
        
    })

    
}


async function acumuladoVentas() {
    let response = await fetch(`${endpointMovimientos}?tipo=venta`)
    let data = await response.json()

    let acumulado = 0

    for (let reporte of data) {
        acumulado += reporte.importe
    }

    pintarReportes("💹 Acumulado de ventas",acumulado)
}

async function acumuladoCompras() {
    let response = await fetch(`${endpointMovimientos}?tipo=compra`)
    let data = await response.json()

    let acumulado = 0
    for (let reporte of data) {
        acumulado += reporte.importe
    }

    pintarReportes("🧾 Acumulado de compras",acumulado)
}

async function pintarReportes(texto,acumulado) {
    // reportes.innerHTML = ""

    let response = await fetch(`${endpointMovimientos}?_embed=category`)
    let data = await response.json()

    reportes.innerHTML += `
        <article class="tarjetas-reportes" id="acumulado-${texto}">
            <h2>${texto}</h2>
            <p>${acumulado}</p>
        </article>
    `
    
}