FROM node:14-alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm run install
CMD ["npm", "run", "start"]