# microblog

A simple blog app designed to learn microservices

## Learning outcomes

- How to build an app using micro services, rather than a monolithic approach

- How services can use an event bus to communicate with one another, by sending and listening for relevant events

- How to build docker images

- How to build and configure a kubernetes cluster from scratch including

  - How to configure a deployment yaml file
  - How to configure a service yaml file
  - How to use ingress-nginx to create and configure an external endpoint for our the application

- How to use skaffold to automate the tedious task of updating pods:
  - Update code
  - Build a new docker image
  - Push to docker hub
  - Redeploy deployment
