const iconoLogin = document.getElementById('icono-login-dashboard');
const menuLogin = document.getElementById('menu-login');

iconoLogin.addEventListener('click', (event) => {
    event.stopPropagation();
    menuLogin.style.display = (menuLogin.style.display === 'block') ? 'none' : 'block';
});

// Ocultar el menú si se hace clic fuera de él
document.addEventListener('click', () => {
    menuLogin.style.display = 'none';
});

document.getElementById('cerrar-sesion-btn').addEventListener('click', () => {

    localStorage.removeItem('currentUser')
    window.location.href = "/"
});
