FROM node:latest

WORKDIR /usr/app
COPY package.json ./
RUN npm install --production && npm cache clean --force
COPY . .

EXPOSE 3000

CMD ["npm","run","go"]
