const endpointMovimientos = "http://localhost:3000/movimientos"
const endpointCategorias = "http://localhost:3000/categories"
const reportes = document.getElementById("grid-reportes")
const categMasVendida = document.getElementById("categoria-mas-vendida")
const categMasComprado = document.getElementById("categoria-mas-compras")
const prodMasVendido = document.getElementById("producto-mas-vendido")
const prodMasComprado = document.getElementById("producto-mas-comprado")
const mesVentas = document.getElementById("mes-ventas")
const mesCompras = document.getElementById("mes-compras")
const totalMes = document.getElementById("tabla-mes")
const totalCategoria = document.getElementById("tabla-categorias")

const iconoLogin = document.getElementById("icono-login")
const menuLogin = document.getElementById("menu-login")

// --- Inicialización al cargar la página --
document.addEventListener("DOMContentLoaded", function () {
    categoriaVentas()
    categoriaCompras()
    productoVentas()
    productoCompras()
    mesVenta()
    mesCompra()
    totalMesAgrupado()
    totalCategoriaAgrupado()
})

// --- Cálculo y visualización de reportes por categoría y producto ---
async function categoriaVentas() {
    const response = await fetch(`${endpointMovimientos}?tipo=venta&_embed=category`)
    const data = await response.json()

    const conteoCategoriaVentas = {}

    // Suma los importes por cada categoría de ventas
    data.forEach(rep => {
        if (conteoCategoriaVentas[rep.category.nombre]) {
            conteoCategoriaVentas[rep.category.nombre] += 1
        } else {
            conteoCategoriaVentas[rep.category.nombre] = 1
        }
    })

    // Encuentra la categoría con mayor importe de ventas
    let categoriaMayorVenta = ""
    let mayorVenta = 0

    for (let categoria in conteoCategoriaVentas) {
        if (conteoCategoriaVentas[categoria] > mayorVenta) {
            mayorVenta = conteoCategoriaVentas[categoria]
            categoriaMayorVenta = categoria
        }
    }

    pintarReportes(categMasVendida,categoriaMayorVenta)
}

async function categoriaCompras() {
    const response = await fetch(`${endpointMovimientos}?tipo=compra&_embed=category`)
    const data = await response.json()

    const conteoCategoriaCompra = {}

    // Suma los importes por cada categoría de compras
    data.forEach(rep => {
        if (conteoCategoriaCompra[rep.category.nombre]) {
            conteoCategoriaCompra[rep.category.nombre] += 1
        } else {
            conteoCategoriaCompra[rep.category.nombre] = 1
        }
    })

    // Encuentra la categoría con mayor importe de compras
    let categoriaMayorCompra = ""
    let mayorCompra = 0

    for (let categoria in conteoCategoriaCompra) {
        if (conteoCategoriaCompra[categoria] > mayorCompra) {
            mayorCompra = conteoCategoriaCompra[categoria]
            categoriaMayorCompra = categoria
        }
    }

    pintarReportes(categMasComprado,categoriaMayorCompra)
}


async function productoVentas() {
    const response = await fetch(`${endpointMovimientos}?tipo=venta&_embed=category`)
    const data = await response.json()

    const conteoProductoVentas = {}

    // Suma los importes por cada producto vendido (descripción)
    data.forEach(rep => {
        if (conteoProductoVentas[rep.descripcion]) {
            conteoProductoVentas[rep.descripcion] += 1
        } else {
            conteoProductoVentas[rep.descripcion] = 1
        }
    })

    // Encuentra el producto más vendido
    let productoMayorVenta = ""
    let mayorVenta = 0

    for (let producto in conteoProductoVentas) {
        if (conteoProductoVentas[producto] > mayorVenta) {
            mayorVenta = conteoProductoVentas[producto]
            productoMayorVenta = producto
        }
    }

    pintarReportes(prodMasVendido,productoMayorVenta)
}

async function productoCompras() {
    const response = await fetch(`${endpointMovimientos}?tipo=compra&_embed=category`)
    const data = await response.json()

    const conteoProductoCompra = {}

    // Suma los importes por cada producto comprado (descripción)
    data.forEach(rep => {
        if (conteoProductoCompra[rep.descripcion]) {
            conteoProductoCompra[rep.descripcion] += 1
        } else {
            conteoProductoCompra[rep.descripcion] = 1
        }
    })

    // Encuentra el producto más comprado
    let productoMayorCompra = ""
    let mayorCompra = 0

    for (let producto in conteoProductoCompra) {
        if (conteoProductoCompra[producto] > mayorCompra) {
            mayorCompra = conteoProductoCompra[producto]
            productoMayorCompra = producto
        }
    }

    pintarReportes(prodMasComprado,productoMayorCompra)
}

async function mesVenta() {
    const response = await fetch(`${endpointMovimientos}?tipo=venta`)
    const data = await response.json()

    const conteoPorMes = {}

    data.forEach(rep => {
        const mes = rep.fecha.slice(0, 7) // Extrae "YYYY-MM"
        conteoPorMes[mes] = (conteoPorMes[mes] || 0) + 1
    })

    let mesMayor = ""
    let maxVentas = 0

    for (let mes in conteoPorMes) {
        if (conteoPorMes[mes] > maxVentas) {
            maxVentas = conteoPorMes[mes]
            mesMayor = mes
        }
    }

    pintarMesVentas(`${mesMayor} (${maxVentas} ventas)`)
}

async function mesCompra() {
    const response = await fetch(`${endpointMovimientos}?tipo=compra`)
    const data = await response.json()

    const conteoPorMes = {}

    data.forEach(rep => {
        const mes = rep.fecha.slice(0, 7) // "YYYY-MM"
        conteoPorMes[mes] = (conteoPorMes[mes] || 0) + 1
    })

    let mesMayor = ""
    let maxCompras = 0

    for (let mes in conteoPorMes) {
        if (conteoPorMes[mes] > maxCompras) {
            maxCompras = conteoPorMes[mes]
            mesMayor = mes
        }
    }

    pintarMesCompras(`${mesMayor} (${maxCompras} compras)`)
}

async function totalMesAgrupado() {
    const response = await fetch(`${endpointMovimientos}?_embed=category`);
    const data = await response.json();

    const totales = {};

    data.forEach(mov => {
        const mes = mov.fecha.slice(0, 7);
        const tipo = mov.tipo;
        if (!totales[mes]) {
            totales[mes] = { ventas: 0, compras: 0 };
        }
        if (tipo === "venta") {
            totales[mes].ventas += mov.importe;
        } else if (tipo === "compra") {
            totales[mes].compras += mov.importe;
        }
    });

    const tbody = document.getElementById("tabla-mes");
    tbody.innerHTML = "";
    Object.entries(totales).forEach(([mes, valores]) => {
        tbody.innerHTML += `
            <tr>
                <td>${mes}</td>
                <td>$${valores.compras.toLocaleString()}</td>
                <td>$${valores.ventas.toLocaleString()}</td>
            </tr>
        `;
    });
}

async function totalCategoriaAgrupado() {
    const response = await fetch(`${endpointMovimientos}?_embed=category`);
    const data = await response.json();

    const totales = {};

    data.forEach(mov => {
        const categoria = mov.category?.nombre || "Sin categoría";
        const tipo = mov.tipo;
        if (!totales[categoria]) {
            totales[categoria] = { ventas: 0, compras: 0 };
        }
        if (tipo === "venta") {
            totales[categoria].ventas += mov.importe;
        } else if (tipo === "compra") {
            totales[categoria].compras += mov.importe;
        }
    });

    const tbody = document.getElementById("tabla-categorias");
    tbody.innerHTML = "";
    Object.entries(totales).forEach(([categoria, valores]) => {
        tbody.innerHTML += `
            <tr>
                <td>${categoria}</td>
                <td>$${valores.compras.toLocaleString()}</td>
                <td>$${valores.ventas.toLocaleString()}</td>
            </tr>
        `;
    });
}


async function pintarReportes(padre,info) {
    padre.innerHTML = ""

    padre.innerHTML += `
        <p>${info}</p>
    `
}

// --- Renderizado de resultados en el DOM ---
async function pintarMesVentas(tipo) {
    mesVentas.innerHTML = ""

    mesVentas.innerHTML += `
        <p>${tipo}</p>
    `
}

async function pintarMesCompras(tipo) {
    mesCompras.innerHTML = ""

    mesCompras.innerHTML += `
        <p>${tipo}</p>
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