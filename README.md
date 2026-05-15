# Mejora Técnica del Sistema de Gestión Hospitalaria - Clinica Bolivia

Este archivo describe la mejora estructural realizada al sistema de la Clinica Bolivia, la cual ha sido migrada a una arquitectura de microservicios mediante Docker para asegurar su portabilidad y estabilidad.

## 1. Arquitectura y Componentes
El sistema se ha desglosado en tres servicios independientes:
* **Motor de Base de Datos:** PostgreSQL 15, configurado para persistencia de datos mediante volúmenes.
* **Backend (Servidor):** API REST construida en Node.js, encargada de la lógica de negocio y seguridad.
* **Frontend (Interfaz):** Aplicación SPA en React (Vite) optimizada para Node.js 20.

## 2. Requisitos Previos para el Despliegue
Para ejecutar el sistema, es indispensable que el equipo evaluador tenga instalado:
* **Docker Desktop** (versión actualizada).
* Motor de Docker en estado "Running".

## 3. Instrucciones para Levantar el Servidor
Siga estos pasos exactos para visualizar el sistema funcionando:

1. Sitúese en el directorio raíz del proyecto mediante una terminal.
2. Ejecute el comando de orquestación:
   ```bash
   docker compose up --build
   Espere a que la terminal muestre el mensaje "Engine Running" o los registros de los tres servicios (db, backend, frontend) sin errores.

4. Acceso y Credenciales de Usuario
Debido a que el entorno de contenedores inicializa la base de datos desde cero para garantizar la limpieza de la evaluación, el acceso requiere un paso previo de registro:

Paso A: Creación de Usuario Administrador
Dado que no existen usuarios previos, el evaluador debe registrar un perfil inicial. Utilice una herramienta de peticiones (como Thunder Client en VS Code o Postman) con los siguientes datos:

URL de Registro: http://localhost:3000/api/auth/registrar

Método: POST

Cuerpo (JSON):

JSON
{
  "nombre": "Administrador Sistema",
  "usuario": "adminjose",
  "password": "031299",
  "rol": "admin"
}
Paso B: Inicio de Sesión
Una vez registrado, acceda a la interfaz web en:

URL: http://localhost:5173

Usuario: adminjose

Contraseña: 031299

5. Guía de Uso y Funcionalidades por Rol
La mejora del sistema permite visualizar diferentes interfaces según el rol asignado durante el registro:

Interfaz de Administrador: Al ingresar con el rol 'admin', el menú lateral habilitará la gestión de personal médico, administración de pacientes y control total de citas médicas.

Interfaz de Médico: Si registra un usuario con el rol 'medico', el sistema restringirá las funciones administrativas, permitiendo únicamente el registro de pacientes nuevos y la consulta de la agenda de citas propia.

6. Mantenimiento y Reseteo del Entorno
Si durante la evaluación se requiere limpiar la base de datos y comenzar de nuevo el proceso de registro, ejecute en la terminal:

Bash
docker compose down -v
Este comando detendrá los servicios y eliminará el volumen de datos persistente, permitiendo una nueva instalación limpia.