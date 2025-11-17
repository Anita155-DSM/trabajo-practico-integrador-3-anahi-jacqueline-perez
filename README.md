//VOY A UTILIZAR ESTE README DE GUÍA NOMÁS
# Tlp App

## Descripción
Aplicación web completa para gestión de tareas con autenticación de usuarios, desarrollada con React y Node.js, un backend y un front completos.

## Instalación para poder 
```bash
# Clonar repositorio
git clone <url-mi repositorio(perez-anahi-jacqueline)>
cd tlp-app

# Instalar backend
cd server
npm install

# Instalar frontend  
cd trabajo-practico-integrador-III/src
npm install
```

Backend (/server/.env.example reemplazar por .env)
```bash
#env dado por el profe
DB_NAME=tp_integrador
DB_USER=root
DB_PASSWORD=
DB_HOST=localhost
DB_DIALECT=mysql
DB_PORT=3307
JWT_SECRET=jwt_secret
PORT=3000
```

Ejecución

```bash
# Backend (puerto 3000)
cd server
npm run dev

# Frontend (puerto 5173)  
cd client
npm run dev
```