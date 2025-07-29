const endpointMovimientos = "http://localhost:3000/movimientos"
const endpointCategorias = "ttp://localhost:3000/categories"
const reportes = document.getElementById("grid-reportes")
const categMasVendida = document.getElementById("categoria-mas-vendida")
const categMasComprado = document.getElementById("categoria-mas-compras")
const prodMasVendido = document.getElementById("producto-mas-vendido")
const prodMasComprado = document.getElementById("producto-mas-comprado")

const iconoLogin = document.getElementById("icono-login")
const menuLogin = document.getElementById("menu-login")

// --- Inicialización al cargar la página --
document.addEventListener("DOMContentLoaded", function () {
    categoriaVentas()
    categoriaCompras()
    productoVentas()
    productoCompras()
})

// --- Cálculo y visualización de reportes por categoría y producto ---
async function categoriaVentas() {
    const response = await fetch(`${endpointMovimientos}?tipo=venta&_embed=category`)
    const data = await response.json()

    const acumuladosPorCategoriaVentas = {}

    // Suma los importes por cada categoría de ventas
    data.forEach(rep => {
        if (acumuladosPorCategoriaVentas[rep.category.nombre]) {
            acumuladosPorCategoriaVentas[rep.category.nombre] += rep.importe
        } else {
            acumuladosPorCategoriaVentas[rep.category.nombre] = rep.importe
        }
    })

    // Encuentra la categoría con mayor importe de ventas
    let categoriaMayorVenta = ""
    let mayorImporteVenta = 0

    for (let categoria in acumuladosPorCategoriaVentas) {
        if (acumuladosPorCategoriaVentas[categoria] > mayorImporteVenta) {
            mayorImporteVenta = acumuladosPorCategoriaVentas[categoria]
            categoriaMayorVenta = categoria
        }
    }

    pintarCategoriaVenta(categoriaMayorVenta,mayorImporteVenta)
}

async function categoriaCompras() {
    const response = await fetch(`${endpointMovimientos}?tipo=compra&_embed=category`)
    const data = await response.json()

    const acumuladosPorCategoriaCompra = {}

    // Suma los importes por cada categoría de compras
    data.forEach(rep => {
        if (acumuladosPorCategoriaCompra[rep.category.nombre]) {
            acumuladosPorCategoriaCompra[rep.category.nombre] += rep.importe
        } else {
            acumuladosPorCategoriaCompra[rep.category.nombre] = rep.importe
        }
    })

    // Encuentra la categoría con mayor importe de compras
    let categoriaMayorCompra = ""
    let mayorImporteCompra = 0

    for (let categoria in acumuladosPorCategoriaCompra) {
        if (acumuladosPorCategoriaCompra[categoria] > mayorImporteCompra) {
            mayorImporteCompra = acumuladosPorCategoriaCompra[categoria]
            categoriaMayorCompra = categoria
        }
    }

    pintarCategoriaCompra(categoriaMayorCompra,mayorImporteCompra)
}


async function productoVentas() {
    const response = await fetch(`${endpointMovimientos}?tipo=venta&_embed=category`)
    const data = await response.json()

    const acumuladosPorProductoVentas = {}

    // Suma los importes por cada producto vendido (descripción)
    data.forEach(rep => {
        if (acumuladosPorProductoVentas[rep.descripcion]) {
            acumuladosPorProductoVentas[rep.descripcion] += rep.importe
        } else {
            acumuladosPorProductoVentas[rep.descripcion] = rep.importe
        }
    })

    // Encuentra el producto más vendido
    let productoMayorVenta = ""
    let mayorImporteVenta = 0

    for (let producto in acumuladosPorProductoVentas) {
        if (acumuladosPorProductoVentas[producto] > mayorImporteVenta) {
            mayorImporteVenta = acumuladosPorProductoVentas[producto]
            productoMayorVenta = producto
        }
    }

    pintarProductoVenta(productoMayorVenta,mayorImporteVenta)
}

async function productoCompras() {
    const response = await fetch(`${endpointMovimientos}?tipo=compra&_embed=category`)
    const data = await response.json()

    const acumuladosPorProductoCompra = {}

    // Suma los importes por cada producto comprado (descripción)
    data.forEach(rep => {
        if (acumuladosPorProductoCompra[rep.descripcion]) {
            acumuladosPorProductoCompra[rep.descripcion] += rep.importe
        } else {
            acumuladosPorProductoCompra[rep.descripcion] = rep.importe
        }
    })

    // Encuentra el producto más comprado
    let productoMayorCompra = ""
    let mayorImporteCompra = 0

    for (let producto in acumuladosPorProductoCompra) {
        if (acumuladosPorProductoCompra[producto] > mayorImporteCompra) {
            mayorImporteCompra = acumuladosPorProductoCompra[producto]
            productoMayorCompra = producto
        }
    }

    pintarProductoCompra(productoMayorCompra,mayorImporteCompra)
}

// --- Renderizado de resultados en el DOM ---
async function pintarCategoriaVenta(tipo,dato) {
    categMasVendida.innerHTML = ""

    categMasVendida.innerHTML += `
        <p>${tipo}: $${dato}</p>
    `
}

async function pintarCategoriaCompra(tipo,dato) {
    categMasComprado.innerHTML = ""

    categMasComprado.innerHTML += `
        <p>${tipo}: $${dato}</p>
    `
}

async function pintarProductoVenta(tipo,dato) {
    prodMasVendido.innerHTML = ""

    prodMasVendido.innerHTML += `
        <p>${tipo}: $${dato}</p>
    `
}

async function pintarProductoCompra(tipo,dato) {
    prodMasComprado.innerHTML = ""

    prodMasComprado.innerHTML += `
        <p>${tipo}: $${dato}</p>
    `
}

// --- Menú de usuario/Login y cierre de sesión ---
iconoLogin.addEventListener("click", () => {
    menuLogin.style.display = menuLogin.style.display === "block" ? "none" : "block"
})

// Cerrar el menú si haces clic fuera
document.addEventListener("click", (e) => {
    if (!iconoLogin.contains(e.target) && !menuLogin.contains(e.target)) {
        menuLogin.style.display = "none"
    }
})

// Acción del botón cerrar sesión
document.getElementById("cerrar-sesion-btn").addEventListener("click", () => {
    localStorage.clear()
    window.location.href = "./../../index.html"
})