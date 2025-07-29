const form = document.getElementById('formulario');
const inputNombre = document.getElementById('nombre-categoria');
let listaCategorias = document.getElementById('tarjetas-categorias');

const API_URL = "http://localhost:3000/categories"

let isEditando = null

const iconoLogin = document.getElementById("icono-login")
const menuLogin = document.getElementById("menu-login")

// --- Inicialización al cargar la página (pintar las categorías) ---
document.addEventListener("DOMContentLoaded", pintarCategorias);

// --- Obtener y mostrar categorías desde la API ---
async function pintarCategorias() {
    listaCategorias.innerHTML = ""

    try {
        let response = await fetch(API_URL)
        let data = await response.json()

        for (let category of data) {
            listaCategorias.innerHTML += `
            <div class="tarjeta">
                <h3>${category.nombre}</h3>
                <button class="btn-eliminar-categoria-enabled" data-id="${category.id}">Eliminar</button>
                <button class="btn-editar-categoria" data-id="${category.id}" data-nombre="${category.nombre}">Editar</button>
            </div>
            `
        }
    } catch (error) {
        alert("Error al cargar las categorias")
    }
}

// --- Manejar el submit del formulario para agregar o actualizar una categoría ---
form.addEventListener("submit", async function(event) {
    event.preventDefault();

    const nombre = inputNombre.value.trim() // Estoy declarando el input

    // Actualización de una categoría existente
    if (isEditando) {
        await fetch(`${API_URL}/${isEditando}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre })
        });
        isEditando = null;
        deshabilitarBotones("btn-actualizar-categoria","disabled")
        deshabilitarBotones("btn-agregar-categoria","enabled")
        form.reset()
        pintarCategorias()
    // Agregar nueva categoría
    } else {
        event.target.classList.contains("btn-agregar-categoria")
        agregarCategoria()
    }
});

// --- Manejar clicks en la lista de categorías (eliminar o editar) ---
listaCategorias.addEventListener("click", function(event) {
    event.preventDefault();

    // Eliminar categoría
    if (event.target.classList.contains("btn-eliminar-categoria")) {
        const id = event.target.getAttribute("data-id");
        eliminarCategoria(id);

    // Preparar edición de categoría
    } else if (event.target.classList.contains("btn-editar-categoria")) {
        const id = event.target.getAttribute("data-id"); // Tambien existe esta forma: event.target.dataset.id;
        const nombre = event.target.getAttribute("data-nombre");
        deshabilitarBotones("btn-actualizar-categoria","enabled")
        deshabilitarBotones("btn-agregar-categoria","disabled")
        actualizarCategoria(id,nombre);
    }
})

// --- CRUD de categorías (crear, actualizar, eliminar) ---
async function agregarCategoria() {
    const nombre = inputNombre.value.trim()
    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type":"application/json"},
        body: JSON.stringify({nombre})
    });

    pintarCategorias()
    form.reset()
}

async function actualizarCategoria(id,nombre) {
    inputNombre.value = nombre
    isEditando = id
}

async function eliminarCategoria(id) {
    await fetch (`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { "Content-Type":"application/json"},
        body: JSON.stringify()
    })
    await pintarCategorias()
}

// --- Habilitar/deshabilitar botones según la acción ---
function deshabilitarBotones(boton, tipo) {
    let actualizar = document.getElementById("btn-actualizar")
    let agregar = document.getElementById("btn-agregar")
    let eliminar = document.querySelectorAll(".btn-eliminar-categoria-enabled");

    if (boton === "btn-actualizar-categoria" && tipo === "enabled") {
        actualizar.classList.remove("btn-actualizar-categoria-disabled")
        actualizar.classList.add("btn-actualizar-categoria-enabled")
        
    } else if (boton === "btn-actualizar-categoria" && tipo === "disabled"){
        actualizar.classList.remove("btn-actualizar-categoria-enabled")
        actualizar.classList.add("btn-actualizar-categoria-disabled")
    }

    if (boton === "btn-agregar-categoria" && tipo === "disabled") {
        agregar.classList.remove("btn-agregar-categoria-enabled")
        agregar.classList.add("btn-agregar-categoria-disabled")
        agregar.disabled = true;

    } else {
        agregar.classList.remove("btn-agregar-categoria-disabled")
        agregar.classList.add("btn-agregar-categoria-enabled")
        agregar.disabled = false;

        eliminar.forEach(btn => {
            btn.classList.remove("btn-eliminar-categoria-disabled");
            btn.classList.add("btn-eliminar-categoria-enabled");
            btn.disabled = false;
        });
    }

    if (tipo === "disabled") {
        eliminar.forEach(btn => {
            btn.classList.remove("btn-eliminar-categoria-enabled");
            btn.classList.add("btn-eliminar-categoria-disabled");
            btn.disabled = true;
        });
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