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

## How to use this app (if you so choose)

There are some requirements before this app can be tested locally

- Docker Desktop must be installed
- Kubernetes must be installed (can be enabled inside of docker desktop)
- Skaffold must be installed ('brew install skaffold' on mac)
- ingress-nginx must be installed into your cluster. See [getting started](https://kubernetes.github.io/ingress-nginx/deploy/)

Once these requirements are met:

- Clone the repository
- Navigate to the root directory
- skaffold dev (this should set up a kubernetes cluster)
- modify /etc/hosts to include the following mapping
  - 127.0.0.1 microblog.com

The hosts configuration is required because the cluster is running locally - if it were deployed to the cloud, there wouldn't be a need to change the url - you would simply change the url in the ingress yaml file

- Navigate in your browser to 'microblog.com' and you should be greeted with the Application

## Limitations

- Currently, I don't have data persisting, so each time any of the services reloads, the data is lost.
  - I will probably add a simple file storage, as this is a learning project, so added complexity of a full database per service would be overkill

## Challenges encountered during the project

I was following a Udemy tutorial, but I tried to get as much done as possible from the diagrams before continuing the videos.

I had a few challenges when setting up my kubernetes cluster, which turned out to be caused by my docker daemon having stopped unexpectedly. I discovered this when I saw an error message about tainted pods, which led me down a google rabbit hole where I found the "kubectl get nodes" command, which showed my docker-desktop had some problem.

Restarting docker-desktop resolved the issue
