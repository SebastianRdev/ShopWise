const endpointCategories = "http://localhost:3000/categories"
const endpointMovimientos = "http://localhost:3000/movimientos"

const form = document.getElementById("formulario-movimientos")
const tbody = document.getElementById("tbody-movimientos")

document.addEventListener("DOMContentLoaded", function () {
    pintarCategorias()
    pintarMovimientos()
})

form.addEventListener("submit", function(event) {
    event.preventDefault()

    let nuevoMovimiento = {
        tipo: form.tipo.value,
        descripcion: form.descripcion.value,
        importe: form.importe,value,
        fecha: form.fecha.value,
        categoria: form.categoria.value
    }

    crearMovimientos(nuevoMovimiento)
})

async function pintarCategorias() {
    
}

async function pintarMovimientos() {
    tbody.innerHTML = ""

    let response = await fetch(endpointMovimientos)
    let data = await response.json()

    for (let movimiento of data) {
        tbody.innerHTML += `
            <tr>
                <td>${movimiento.tipo}</td>
                <td>${movimiento.descripcion}</td>
                <td>${movimiento.importe}</td>
                <td>${movimiento.fecha}</td>
                <td>${movimiento.category.nombre}</td>
                <td>
                    <button class="btn-editar" data-id="${movimiento.id}">Editar</button>
                    <button class="btn-eliminar" data-id="${movimiento.id}">Eliminar</button>
                </td>
            </tr>
        `
    }
}

async function crearMovimientos(nuevoMovimiento) {
    await fetch(endpointMovimientos, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoMovimiento)
    })

}