# Estágio de construção (build)
FROM node:20.13.1 

WORKDIR /app

# Copiando o package.json e o package-lock.json
COPY package*.json ./

# Instalando as dependências
RUN npm install

COPY . .

RUN npm i

EXPOSE 3000

CMD npm start