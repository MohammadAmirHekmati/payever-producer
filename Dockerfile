FROM node:22-alpine
WORKDIR /usr/src/app

RUN apk add --no-cache openssl python3 make g++

COPY package*.json ./
COPY . .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000
CMD ["node", "dist/main.js"]
