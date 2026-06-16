const gateway = require("fast-gateway");

const port = process.env.PORT || 9001;

const server = gateway({
  routes: [
    { prefix: "/inventory", target: process.env.INVENTORY_URL || "http://localhost:3000/" },
    { prefix: "/orders",    target: process.env.ORDER_URL     || "http://localhost:3001/" },
    { prefix: "/payments",  target: process.env.PAYMENT_URL   || "http://localhost:3002/" },
  ],
});

server.start(port).then(() => {
  console.log("API Gateway en écoute sur le port " + port);
});