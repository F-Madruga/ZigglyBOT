FROM node:18.12.1-alpine

WORKDIR /usr

COPY package.json ./
COPY tsconfig.json ./
COPY .env.example ./

COPY src ./src

RUN npm install
RUN npm run build

CMD ["npm","run","start"]
