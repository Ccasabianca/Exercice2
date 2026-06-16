Le .env est envoyé sur github pour simplifier les tests !

Les différents microservices sont sur les ports demandés :
bookstore-web-app : 8082
api-gateway : 9001
inventory-service : 3000
order-service : 3001
payment-service : 3002

Il y a une collection par service dans MongoDB, et une seule base pour centraliser le tout.

Le front passe par l'API gateway pour communiquer avec les microservices.

Les healthchecks sont présents dans docker-compose.yml.

Pour lancer le projet : 

docker compose up

Ensuite, les différentes parties de l'app :

Front : http://localhost:8082
API Gateway : http://localhost:9001
Swagger d'un service : http://localhost:3000/explorer (idem 3001, 3002)