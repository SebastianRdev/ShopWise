# ShopWise - Sistema de Gestión de Finanzas

**ShopWise** es una aplicación web para la gestión de finanzas de compras y ventas. Permite administrar movimientos, categorías y generar reportes detallados para ayudar a tomar mejores decisiones sobre el dinero.

## Estructura del Proyecto

- `login.html` - Página de inicio de sesión.
- `dashboard.html` - Pantalla principal con acceso a módulos.
- `movimientos.html` - Gestión de movimientos (compras/ventas).
- `categorias.html` - Gestión de categorías de movimientos.
- `reportes.html` - Visualización de reportes de categorías y productos.
- `src/CSS/style.css` - Estilos generales del sistema.
- `js/login.js` - Lógica de autenticación.
- `js/dashboard.js` - Interacción del dashboard.
- `js/movimientos.js` - Toda la lógica para movimientos (alta, edición, filtros, etc).
- `js/categorias.js` - Lógica para manejo de categorías.
- `js/reportes.js` - Generación y visualización de reportes.

## Descripción de los principales módulos JS

### movimientos.js

- **CRUD de movimientos**: permite crear, editar y eliminar movimientos (compras y ventas).
- **Filtros**: por tipo, categoría y fechas.
- **Tabla dinámica**: muestra los movimientos actuales y se actualiza tras cada operación.
- **Categorías dinámicas**: carga las opciones de categoría desde la base de datos.
- **Menú de usuario**: apertura/cierre de menú y cierre de sesión.

### reportes.js

- **Reportes automáticos**: calcula la categoría/producto más vendido y más comprado.
- **Renderizado**: muestra los resultados en el HTML.
- **Menú de usuario**: gestión del menú y logout.

## Instalación y uso

1. Clona este repositorio.
2. Asegúrate de tener un backend REST corriendo en `localhost:3000` con rutas `/movimientos` y `/categories`.
   - Puedes usar [json-server](https://github.com/typicode/json-server) para pruebas:
     ```
     npm install -g json-server
     json-server --watch db.json --port 3000
     ```
3. Abre `login.html` en tu navegador.
4. Navega por el dashboard y los diferentes módulos.

## Notas importantes

- Corrige la variable `endpointCategorias` en `reportes.js` (`ttp://...` debe ser `http://...`).
- El menú de usuario y logout funciona limpiando el `localStorage` y redirigiendo al inicio.
- El sistema está pensado para pruebas locales y educativas.

---

**¡Contribuciones y sugerencias son bienvenidas!**