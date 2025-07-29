# 💸 ShopWise – Gestión de Finanzas

Este es un proyecto web para gestionar y analizar movimientos financieros, desarrollado con **HTML**, **CSS** y **JavaScript**, usando **json-server** como API REST simulada.  
Permite crear, listar, editar y eliminar movimientos y categorías, además de visualizar reportes de ventas y compras de forma amigable.

---


## ✅ Funcionalidades

- Crear, listar, editar y eliminar movimientos (compras y ventas)
- Crear, listar, editar y eliminar categorías
- Filtrar movimientos por tipo, categoría y fecha
- Visualizar reportes automáticos (categoría/producto/mes con más ventas y compras)
- Tabla de totales por mes y por categoría
- Sistema de login/logout básico

---


## 🚀 Requisitos Previos

Antes de empezar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [`json-server`](https://github.com/typicode/json-server) (puede ser global o local)

Verifica versiones con:

```bash
node -v
npm -v
```

---


## 📦 Instalación

1. **Instala las dependencias del frontend**

```bash
npm install
```

2. **Instala json-server**

Opción global (más práctico):

```bash
npm install -g json-server
```

O bien como dependencia local:

```bash
npm install json-server --save-dev
```

---

## 🛠️ Cómo Ejecutar el Proyecto

### 1. Inicia el backend (json-server)

```bash
npx json-server --watch public/databases/db.json --port 3000
```

Esto levantará la API REST en:
👉 `http://localhost:3000/users` 
👉 `http://localhost:3000/movimientos`  
👉 `http://localhost:3000/categories`

### 2. Abre la app en el navegador

- Abre el archivo `index.html` desde la carpeta raíz (puedes hacer doble clic o abrirlo localmente en tu navegador).

---


## 🗂️ Estructura del Proyecto

- **public/**
  - **databases/db.json** – Base de datos para json-server
  - **icons/**, **images/** – Recursos multimedia

- **src/CSS/style.css** – Estilos generales del sistema

- **src/js/**
  - `categorias.js` – Gestión de categorías
  - `dashboard.js` – Lógica del dashboard
  - `guardian.js` – Protección y validaciones
  - `login.js` – Autenticación
  - `movimientos.js` – Alta, edición, borrado y filtros de movimientos
  - `reportes.js` – Generación y visualización de reportes

- **views/**
  - `categorias.html`
  - `dashboard.html`
  - `login.html`
  - `movimientos.html`
  - `reportes.html`

- **index.html** – Página de bienvenida

- **package.json / package-lock.json** – Configuración de dependencias para npm

- **README.md** – Este archivo

---


## ℹ️ Notas importantes

- El menú de usuario y la función de logout funcionan limpiando el `localStorage` y redirigiendo al inicio.
- No es necesario instalar ni revisar carpetas relacionadas a Vite, sólo usa el comando de arriba para json-server.

---