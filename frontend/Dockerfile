# Etapa de construcción
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Exponemos el puerto de Vite (usualmente 5173)
EXPOSE 5173

# Comando para iniciar en modo desarrollo para revisores
CMD ["npm", "run", "dev", "--", "--host"]