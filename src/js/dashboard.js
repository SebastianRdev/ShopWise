const iconoLogin = document.getElementById('icono-login-dashboard');
const menuLogin = document.getElementById('menu-login');

// --- Menú de usuario/Login y cierre de sesión ---
iconoLogin.addEventListener('click', (event) => {
    event.stopPropagation();
    menuLogin.style.display = (menuLogin.style.display === 'block') ? 'none' : 'block';
});

// Cerrar el menú si haces clic fuera
document.addEventListener('click', () => {
    menuLogin.style.display = 'none';
});

// Acción del botón cerrar sesión
document.getElementById('cerrar-sesion-btn').addEventListener('click', () => {
    localStorage.removeItem('currentUser')
    window.location.href = "/"
});
