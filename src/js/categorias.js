const form = document.getElementById('formulario');
const inputNombre = document.getElementById('nombre-categoria');
let listaCategorias = document.getElementById('tarjetas-categorias');

const API_URL = "http://localhost:3000/categories"

let isEditando = null

const iconoLogin = document.getElementById("icono-login")
const menuLogin = document.getElementById("menu-login")

document.addEventListener("DOMContentLoaded", pintarCategorias);

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

form.addEventListener("submit", async function(event) {
    event.preventDefault();

    const nombre = inputNombre.value.trim() // Estoy declarando el input

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
    } else {
        event.target.classList.contains("btn-agregar-categoria")
        agregarCategoria()
    }
});

listaCategorias.addEventListener("click", function(event) {
    event.preventDefault();

    if (event.target.classList.contains("btn-eliminar-categoria")) {
        const id = event.target.getAttribute("data-id");
        eliminarCategoria(id);

    } else if (event.target.classList.contains("btn-editar-categoria")) {
        const id = event.target.getAttribute("data-id"); // Tambien existe esta forma: event.target.dataset.id;
        const nombre = event.target.getAttribute("data-nombre");
        deshabilitarBotones("btn-actualizar-categoria","enabled")
        deshabilitarBotones("btn-agregar-categoria","disabled")
        actualizarCategoria(id,nombre);
    }
})

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
    // Esto es para que el boton de actualizar en el form se de cuenta
}

async function eliminarCategoria(id) {
    await fetch (`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { "Content-Type":"application/json"},
        body: JSON.stringify()
    })
    await pintarCategorias()
}

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
    // Aquí haces tu lógica de logout (por ejemplo, limpiar localStorage o redirigir)
    localStorage.clear()
    window.location.href = "./../../index.html"
})