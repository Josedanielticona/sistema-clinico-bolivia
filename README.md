# Mejora del Sistema Hospitalario - Clinica Bolivia

Este proyecto ha sido optimizado y contenedorizado mediante Docker para garantizar un despliegue rápido y sin errores de configuración en cualquier entorno.

## Requisitos previos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado y en ejecución.
- Git (opcional, si se descarga mediante repositorio).

---

## Instrucciones de Despliegue (Docker)

Siga estos pasos para levantar todo el sistema por primera vez:

### 1. Preparar el proyecto
* **Opción 1:** Clonar el repositorio mediante Git.
* **Opción 2:** Descomprimir la carpeta del proyecto enviada y situarse en la raíz (donde se encuentra el archivo `docker-compose.yml`).

### 2. Levantar todo el sistema
Dentro de la carpeta principal, abra una terminal (CMD, PowerShell o Git Bash) y ejecute el siguiente comando:

```bash
docker-compose up --build
3. Esperar la construcción y abrir el sistema
La primera vez puede tardar unos minutos mientras Docker descarga las imágenes de Node.js y PostgreSQL, e instala las dependencias de React. Una vez finalizado, podrá acceder a los servicios en:

Interfaz Web (Frontend): http://localhost:5173

Servidor de Datos (API): http://localhost:3000

Guía de Configuración Inicial (Obligatorio)
Como el sistema inicia con una base de datos limpia dentro del contenedor, debe crear su usuario de acceso siguiendo estos pasos:

1. Registro del Administrador
Utilice una herramienta como Thunder Client (en VS Code) o Postman para enviar una petición de registro:

Método: POST

URL: http://localhost:3000/api/auth/registrar

Cuerpo (JSON):

JSON
{
  "nombre": "Jose Daniel",
  "usuario": "admin",
  "password": "123",
  "rol": "admin"
}
2. Inicio de Sesión
Vaya a http://localhost:5173 e ingrese con las credenciales creadas:

Usuario: admin

Contraseña: 123

Notas Técnicas de la Mejora
Persistencia: Los datos se almacenan en volúmenes de Docker. Si desea resetear la base de datos por completo, ejecute docker-compose down -v.

Compatibilidad: El sistema utiliza Node.js v20 para asegurar el funcionamiento correcto de Vite y React.

Roles: El sistema adapta la interfaz automáticamente. El rol admin visualiza toda la gestión, mientras que el rol medico solo visualiza su agenda y registro de pacientes.