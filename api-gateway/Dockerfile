FROM node:24-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Port du gateway
ENV PORT=9001
EXPOSE 9001

CMD ["node", "server.js"]
