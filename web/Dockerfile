FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN apk add --update nodejs
RUN npm -g install npm@6.14.11
RUN npm i
CMD ["npm", "run", "start"]