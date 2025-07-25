const form = document.getElementById('formulario');
const inputNombre = document.getElementById('nombre-categoria');
let listaCategorias = document.getElementById('tarjetas-categorias');

const API_URL = "http://localhost:3000/categories"

let isEditando = null

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
                <button class="btn-eliminar-categoria" data-id="${category.id}">Eliminar</button>
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

    if(event.target.classList.contains("btn-agregar-categoria")) {
        agregarCategoria()

    } else if (isEditando) {
        await fetch(`${API_URL}/${isEditando}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre })
        });
        isEditando = null;
        form.reset()
        pintarCategorias()
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
    isEditando = id // Esto es para que el boton de actualizar en el form se de cuenta
}

async function eliminarCategoria(id) {
    await fetch (`${API_URL}/${id}`, {
        method: "DELETE",
    })
    await pintarCategorias()
}