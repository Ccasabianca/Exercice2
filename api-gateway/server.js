const gateway = require("fast-gateway");

const port = 9001;

const server = gateway({
  routes: [
    { prefix: "/inventory", target: "http://localhost:3000/" },
    { prefix: "/orders",    target: "http://localhost:3001/" },
    { prefix: "/payments",  target: "http://localhost:3002/" },
  ],
});

server.start(port).then(() => {
  console.log("API Gateway en écoute sur le port " + port);
});