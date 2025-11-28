//VOY A UTILIZAR ESTE README DE GUÍA NOMÁS
# Tlp App

## Descripción
Aplicación web completa para gestión de tareas con autenticación de usuarios, desarrollada con React y Node.js, un backend y un front completos.

## Instalación para poder 
```bash
# Clonar repositorio
git clone <url-mi repositorio(perez-anahi-jacqueline)>
cd tlp-app

````markdown
# TLP App - Gestión de Tareas

Proyecto de práctica integradora: frontend en React que consume un backend ya implementado y expone autenticación y CRUD de tareas.

Descripción breve
------------------
Aplicación sencilla para registrar/entrar con usuario, ver perfil y gestionar tareas (crear, editar, eliminar, marcar como completadas). El frontend fue desarrollado con React (Vite).

Instalación (frontend)
-----------------------
1. Clona el repositorio y entra en la carpeta del proyecto:

```bash
git clone <URL_DEL_REPOSITORIO>
cd trabajo-practico-integrador-3-anahi-jacqueline-perez
```

2. Instala dependencias del frontend:

```powershell
npm install
```

3. Ejecuta la aplicación (por defecto Vite en 5173):

```powershell
npm run dev
```

Backend
-------
El backend ya fue provisto por la cátedra (ver carpeta `servidor/`). Para levantarlo sigue las instrucciones del backend (archivo `servidor/README` o `servidor/.env.example`). Asegúrate de copiar `.env.example` a `.env` y completar los datos.

Puntos importantes
------------------
- Todas las peticiones al backend usan `credentials: 'include'` para trabajar con cookies de sesión.
- Si tienes problemas con CORS o cookies, verifica la configuración del backend y que el puerto del frontend (Vite) esté permitido.

Variables de entorno
--------------------
Si necesitas añadir variables locales, crea un archivo `.env.local` en la raíz y agrégalo (está ignorado por git).

Contacto
--------
Alumno: Anahí Jacqueline Pérez

````