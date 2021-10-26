FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY ./ ./
RUN apk add --update nodejs
RUN npm -g install npm@latest
RUN npm i
CMD ["npm", "run", "start"]