const endpointCategories = "http://localhost:3000/categories"
const endpointMovimientos = "http://localhost:3000/movimientos"

const form = document.getElementById("formulario-movimientos")
const tbody = document.getElementById("tbody-movimientos")
const filtros = document.getElementById("filtros")

let selectCategoria = document.getElementById("categoria-movimiento")
let tipoMovimiento = document.getElementById("tipo-movimiento")
let isEditando = null

const inputTipo = document.getElementById("tipo-movimiento")
const inputDescripcion = document.getElementById("descripcion-movimiento")
const inputImporte = document.getElementById("importe-movimiento")
const inputFecha = document.getElementById("fecha-movimiento")
const inputCategoria = document.getElementById("categoria-movimiento")

const filtroTipo = document.getElementById("filtro-tipo-movimiento")
const filtroCategoria = document.getElementById("filtro-categoria-movimiento")
const filtroDesde = document.getElementById("filtro-fecha-inicio")
const filtroFin = document.getElementById("filtro-fecha-fin")

const iconoLogin = document.getElementById("icono-login")
const menuLogin = document.getElementById("menu-login")


// --- Inicialización al cargar la página ---
document.addEventListener("DOMContentLoaded", function () {
    pintarCategorias()
    pintarMovimientos()
})

// --- CRUD Movimientos (Crear, Editar, Eliminar) ---
form.addEventListener("submit", async function(event) {
    event.preventDefault()

    // Variable que contiene toda la informacion del movimiento
    let nuevoMovimiento = {
        tipo: inputTipo.value,
        descripcion: inputDescripcion.value,
        importe: parseFloat(inputImporte.value),
        fecha: inputFecha.value,
        categoryId: inputCategoria.value
    }

    // Editar movimiento existente
    if (isEditando) {
        await fetch (`${endpointMovimientos}/${isEditando}`, {
            method: "PUT",
            headers: { "Content-Type":"application/json"},
            body: JSON.stringify(nuevoMovimiento)
        })
        isEditando = null
        form.reset()
        pintarMovimientos()

    } else {
        crearMovimientos(nuevoMovimiento)
    }
        form.reset()
    })

// Delegación de eventos en la tabla (Editar y Eliminar)
tbody.addEventListener("click", async function(event) {
    event.preventDefault()

    // Eliminar movimiento
    if (event.target.classList.contains("btn-eliminar-movimiento")) {
        const id = event.target.getAttribute("data-id");
        await fetch(`${endpointMovimientos}/${id}`, {
            method: "DELETE",
            headers: { "Content-Type":"application/json"},
            body: JSON.stringify()
        })

    // Preparar formulario para editar movimiento
    } else if (event.target.classList.contains("btn-editar-movimiento")) {
        const id = event.target.getAttribute("data-id");
        const nombreTipo = event.target.getAttribute("data-tipo");
        const nombreDescripcion = event.target.getAttribute("data-descripcion");
        const nombreImporte = event.target.getAttribute("data-importe");
        const nombreFecha = event.target.getAttribute("data-fecha");
        const idCategoria = event.target.getAttribute("data-categoria");

        inputTipo.value = nombreTipo
        inputDescripcion.value = nombreDescripcion
        inputImporte.value = nombreImporte
        inputFecha.value = nombreFecha
        inputCategoria.value = idCategoria

        isEditando = id
    }

    pintarMovimientos()
})

// --- Filtros por tipo, categoría y fechas ---
filtroTipo.addEventListener("change", async function () {

    let tipoFiltrado = await fetch (`${endpointMovimientos}?tipo=${filtroTipo.value}&_embed=category`)
    let dataTipo = await tipoFiltrado.json()

    pintarFiltros(dataTipo)

})

filtroCategoria.addEventListener("change", async function () {

    let categ = await fetch(`${endpointMovimientos}?categoryId=${filtroCategoria.value}&_embed=category`)
    let dataCategoria = await categ.json()

    pintarFiltros(dataCategoria)

})

filtroDesde.addEventListener("change", filtrarPorFechas)
filtroFin.addEventListener("change", filtrarPorFechas)

// --- Botón para limpiar filtros ---
filtros.addEventListener("click", async function(event) {
    event.preventDefault()

    if (event.target.classList.contains("btn-limpiar")) {
        filtroTipo.value = ""
        filtroCategoria.value = ""
        filtroDesde.value = ""
        filtroFin.value = ""
        pintarMovimientos()
    }
})

// --- Funciones de ayuda para pintar y filtrar datos ---
async function crearMovimientos(nuevoMovimiento) {
    await fetch(endpointMovimientos, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoMovimiento)
    })
    pintarMovimientos()
}

// Mostrar categorias
async function pintarCategorias() {

    let categ = await fetch(endpointCategories)
    let data = await categ.json()

    if (data.length === 0) {
        selectCategoria.innerHTML += `
            <option disabled>Sin Categorias, por favor registre almenos una</option>
        `
        filtroCategoria.innerHTML += `
            <option disabled>Sin Categorias, por favor registre almenos una</option>
        `
    }

    for (let categoria of data) {
        selectCategoria.innerHTML += `
            <option value="${categoria.id}">${categoria.nombre}</option>
        `
        filtroCategoria.innerHTML += `
            <option value="${categoria.id}">${categoria.nombre}</option>
        `
    }
}

// Mostrar movimientos
async function pintarMovimientos() {
    tbody.innerHTML = ""

    let response = await fetch(`${endpointMovimientos}?_embed=category`)
    let data = await response.json()

    if (data.length === 0) {
        tbody.innerHTML += `
            <option disabled>Sin Categorias, por favor registre almenos una</option>
        `
    }

    for (let movimiento of data) {
        tbody.innerHTML += `
            <tr>
                <td>${movimiento.id}</td>
                <td data-label="Tipo">${movimiento.tipo}</td>
                <td data-label="Descripción">${movimiento.descripcion}</td>
                <td data-label="Importe">${movimiento.importe}</td>
                <td data-label="Fecha">${movimiento.fecha}</td>
                <td data-label="Categoría">${movimiento.category === undefined ? "La categoria fue eliminada" : movimiento.category.nombre}</td>
                <td data-label="Acciones">
                    <button class="btn-editar-movimiento" 
                        data-id="${movimiento.id}" 
                        data-tipo="${movimiento.tipo}" 
                        data-descripcion="${movimiento.descripcion}" 
                        data-importe="${movimiento.importe}" 
                        data-fecha="${movimiento.fecha}" 
                        data-categoria="${movimiento.category.id}">Editar</button>
                    <button class="btn-eliminar-movimiento" data-id="${movimiento.id}">Eliminar</button>
                </td>
            </tr>
        `

    }
}

// Filtro de las fechas
async function filtrarPorFechas() {
    let response = await fetch(`${endpointMovimientos}?_embed=category`)
    let data = await response.json()
    let desde = filtroDesde.value
    let hasta = filtroFin.value

    let dataFiltrada = data.filter(mov => {

        if (desde && hasta) {
            return mov.fecha >= desde && mov.fecha <= hasta
        }

        if (desde) {
            return mov.fecha >= desde
        }

        if (hasta) {
            return mov.fecha <= hasta
        }

        return true
    })

    pintarFiltros(dataFiltrada)
}

// Mostrar filtros
async function pintarFiltros(dataFiltro) {
    tbody.innerHTML = ""

    for (let movimiento of dataFiltro) {
        tbody.innerHTML += `
            <tr>
                <td>${movimiento.id}</td>
                <td data-label="Tipo">${movimiento.tipo}</td>
                <td data-label="Descripción">${movimiento.descripcion}</td>
                <td data-label="Importe">${movimiento.importe}</td>
                <td data-label="Fecha">${movimiento.fecha}</td>
                <td data-label="Categoría">${movimiento.category.nombre}</td>
                <td data-label="Acciones">
                    <button class="btn-editar-movimiento" 
                        data-id="${movimiento.id}" 
                        data-tipo="${movimiento.tipo}" 
                        data-descripcion="${movimiento.descripcion}" 
                        data-importe="${movimiento.importe}" 
                        data-fecha="${movimiento.fecha}" 
                        data-categoria="${movimiento.category.id}">Editar</button>
                    <button class="btn-eliminar-movimiento" data-id="${movimiento.id}">Eliminar</button>
                </td>
            </tr>
        `
    }
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