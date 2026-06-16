FROM node:24-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Port du front
ENV PORT=8082
EXPOSE 8082

CMD ["npm", "start"]
