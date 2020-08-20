FROM node:latest

WORKDIR /usr/app
COPY package.json ./
RUN npm install --production && npm cache clean --force
COPY . .
ENV KEY_WEATHER 611ad7b47e3d9c595bc9a7713dfd20be

EXPOSE 3000

CMD ["npm","run","go"]
