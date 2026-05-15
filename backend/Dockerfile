# Usamos una imagen ligera de Node.js
FROM node:18-alpine

# Directorio de trabajo
WORKDIR /app

# Copiamos los archivos de dependencias
COPY package*.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos el resto del código
COPY . .

# Exponemos el puerto que usa tu API
EXPOSE 3000

# Comando para iniciar el servidor
CMD ["node", "src/index.js"]