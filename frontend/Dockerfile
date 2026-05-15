# Usamos Node 20 para que sea compatible con las nuevas versiones de Vite
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

# Instalamos dependencias
RUN npm install

COPY . .

EXPOSE 5173

# El host es vital para que Docker deje ver la web
CMD ["npm", "run", "dev", "--", "--host"]