const endpointMovimientos = "http://localhost:3000/movimientos"
const endpointCategorias = "ttp://localhost:3000/categories"
const reportes = document.getElementById("grid-reportes")

document.addEventListener("DOMContentLoaded", function () {
    acumuladoVentas()
    acumuladoCompras()
    categoriaVentas()
})

async function categoriaVentas() {
    const response = await fetch(`${endpointMovimientos}?tipo=venta&_expand=category`)
    const data = await response.json()

    const acumuladosPorCategoria = {}

    data.forEach(rep => {
        const nombreCategoria = rep.category?.nombre || "Sin categoría"
        if (!acumuladosPorCategoria[nombreCategoria]) {
            acumuladosPorCategoria[nombreCategoria] = 0
        }
        acumuladosPorCategoria[nombreCategoria] += rep.importe
    })

    // Convertir a array para ordenarlo
    const ordenado = Object.entries(acumuladosPorCategoria)
        .sort((a, b) => b[1] - a[1]) // Mayor a menor por importe

    // Pintar los resultados
    ordenado.forEach(([categoria, total]) => {
        reportes.innerHTML += `
            <article class="tarjetas-reportes">
                <h2>📦 Ventas: ${categoria}</h2>
                <p>Total: ${total}</p>
            </article>
        `
    })

    console.log("Ventas por categoría:", ordenado)
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