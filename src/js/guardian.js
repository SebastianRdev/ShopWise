function checkSession() {

    let checkUser = localStorage.getItem(currentUser)

    if (checkUser === null) {
        window.location.href="/" //creo || se pone el script en los html en el head(menos en el login claro): se sigue el html si se inicio sesion, sino te regresa a la ruta especificada
    }

}

checkSession()