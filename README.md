# FullStack assessment for Nanos.ai.
[![Build Status](https://travis-ci.org/graffic/nanocorp.svg?branch=master)](https://travis-ci.org/graffic/nanocorp) [![Coverage Status](https://coveralls.io/repos/github/graffic/nanocorp/badge.svg?branch=master)](https://coveralls.io/github/graffic/nanocorp?branch=master)

Deployment on GC K8S disabled. You used to be able to access the app here: https://nanos-assessment.com

## Introduction

This application answers the [nanos.ai](http://nanos.ai) [fullstack assessment project](https://github.com/nanosapp/fullstack-dev-assesment) using JavaScript (NodeJS and browser), MongoDB and Google Cloud. At the same time, it shows most of the points I consider important in an application: not only code and tests but also continuous integration and deployment.

Given that I was going to spend some time on this assessment, I decided to also learn something new. I will point out during this document which parts were new and my take on them.

Let's continue explaining each one of these sections: frontend, backend, db, end to end tests, and deployment. 

### Requirements

* NodeJS `10.9.0` and yarn are required to run the application in development mode.
* Docker and docker-compose to run backend service tests and end to end tests.

### Quick start

* Build and Run with docker compose:
  * From the root directory `docker-compose up --build`
  * Direct a broswer to [http://localhost:8080](http://localhost:8080)
* Run in development mode:
  * In the `db` directory, run: `make build run`
  * In the `backend` directory, run: `yarn && yarn start`
  * In the `frontend` directory, run: `yarn && yarn start`
* Deploy to kubernetes (you need a confitured `kubectl`):
  * In the `deploy` directory, run: `kubectl apply -f config.yml`

## Frontend

It is a single page application built on top of react and using mobx for state management. It is located in the `frontend` directory. 

Quick start (from `frontend`):

* Install dependencies: `yarn`
* Run tests: `yarn test:all_coverage`
* Run app in development mode (this needs the backend in development mode): `yarn start`

### Rationale

The frontend was built to consume data from the backend API. Usually in dashboards and applications managing data I tend to prefer SPAs over server side rendered. Although in this case the amount of data was small. [React](https://reactjs.org) was chosen due to it's versatility. I paid a bit the price of being able to choose react companion libraries instead of using `create-react-app`, but I learned more about how `webpack` and the `babel` pipeline.

Files are structured by page plus the root `src` folder having some utilities. I like to organize code by business functionality and then in the last directory (leave) get into more technical naming like: container, stores and differente components.

Besides React, [mobx](https://mobx.js.org) was added for state management using stores like in a [flux architecture](https://facebook.github.io/flux/) but with the benefits of observables instead of actions and dispatchers. I haven't used mobx before, and I like how it eliminates the need of `setState` and groups the access to specific domain entities.

**Error handling** Is implemented only in the `platform` page using the mobx store to notify of ajax errors. Besides that, [react error boundaries](https://reactjs.org/docs/error-boundaries.html) are not implemented.

For style I went with [styled components](https://www.styled-components.com). It treats css as code and isolates styles into css classes for the specific component. It is a bit weird to have the css with the code, but it feels like the first time using JSX and having HTML tags along the code. I didn't use any widget library (bootstrap, material-ui). I started using `material-ui` but it was too much to learn. I ended up adding some manual styles here and there.

Packing it together with [webpack 4](https://webpack.js.org) from scratch instead of [create-react-app](https://github.com/facebook/create-react-app). I wanted to revisit webpack after two years using cli tools that obscure what is going on. Also [babel](https://babeljs.io) helped to make writing JavaScript a breeze while making the js code compatible with more browsers (check the output of `yarn browserslist`).

#### Tests

Components in this case were very simple, so I've added a few units for the stores and shallow snapshot for some content components. The end to end tests were the ones keeping the app together. I will describe them in their own section.

The idea was to show something, but keep the entire app working. So tests do not care much about what exactly is being rendered but renders something and keep the app work (e2e tests). It is true that more unit tests could have been added.

#### Other

**Code style** is enforced using the [standardjs](https://standardjs.com) style guide. I had to choose one, and lately I like that one a lot. This is also enforced in the backend.

**Backend communication** is done using [graphql-request](https://github.com/prisma/graphql-request). I'll explain why GraphQL in the backend section.

Last but not least:

* Icons: [Google](https://www.flaticon.com/free-icon/search_281764), [Social media](https://www.flaticon.com/packs/social-media-2), [Question mark](https://www.flaticon.com/free-icon/question-mark-button_69464#term=unknown&page=1&position=3)
* [Table css ideas](https://colorlib.com/wp/css3-table-templates/)

## Backend

The backend is a [Koa](https://koajs.com) http service with 3 main responsibilities:

* Serving campaign data via a graphql API.
* Serving the frontend in production and e2e tests.
* Serving creatives.

Those functionalities could have been splitted in different services, but for the sake of not having to many moving pieces they were left in the backend.

The project is located in the `backend` directory.  Quick start (from `backend`):

* Install dependencies: `yarn`
* Run tests: `yarn test:all_coverage`
* Run app in development mode (this needs a mongodb database): `yarn start` For the database go to the `db` folder and type `make build run`.

### The GraphQL API

Instead of REST I went with [GraphQL](http://graphql.github.io) using the [Apollo server](https://www.apollographql.com). I haven't used it before and since at work we build the similar dashboards with ad campaigns I wanted to compare a bit. It seems it gives more flexibility to the end-point. In this example there are only two queries, but from the start it forces you to write a schema and to ask for specific data.

Documenting the endpoint is as easy as writting the schema. The Apollo graphql server provides a UI to explore the schema in development mode here: `http://localhost:4000/graphql`. Instead of using  [API blueprint](https://apiblueprint.org) or similar, the query tool allows you to play with queries.

There is an option to project query fields onto mongodb queries, so we only bring the data requested from the database. In the assessment I didn't follow that path and the backend filters by campaign id only.

The endpoint serves almost the same json as the one given. Here are some differences:

* Platforms are given as a list with a type attribute.
* We allow to query one platform using the platform attribute.
* The headers in creatives are given in an array of strings.

### Frontend serving

Frontend static files should go somewhere. Usually an nginx or a public cloud bucket can do the trick. In the end a CDN is put in front of those files so they are requested a few times.

In the assessment the backend answers to any request not in `/graphql` or `/cdn` with the frontend files. It also falls back to `index.html` when a url is not found, so react router urls work when reloading the page. [CloudFlare](https://www.cloudflare.com) is in front of the backend to cache frontend and creative files.

### Serving creatives

The assessment asked specifically for a solution to: serving campaign creatives. I believe those creatives shouldn't be served full size unless requested. Usually a service like [Thumbor](http://thumbor.org) will take care of resizing, caching, and with the help of a CDN publishers will be happy serving those assets.

In this case I've resized the assets and the backend serves them from the `/cdn/` path. Although the frontend can be configured to grab them from somewhere else.

### The web framework: Koa

The good thing of koa is its simplicity. It also comes with a price: many modules doing almost the same and not being sure which one to use. The backend is using modules for graphql, serving static files, etags, conditional gets, path routing.

For mongodb connections, the module I was using it wasn't very good at creating lazy connections and allowing you to close them all (useful when running the server in test mode). So I had to implement my `mongo.js` koa middleware.

### Tests

Most of the tests are service tests ([subcutaneous tests](https://martinfowler.com/bliki/SubcutaneousTest.html) using Martin Fowler terminology). They test the service via HTTP requests. But for some modules with specific conditions I use unit tests.

## The database

I was a bit lazy in this one. I literally dumped the json given into a mongo db and indexed it by `id`. **With mongo** It was easy to import the data, it gives back the data in a format suitable for the API.

You can run the database from the `db` directory. Type `make build run` and it will build an standalone container and run it listening on port `27017`

## End to end tests

Instead of going with Selenium/Webdriver. This time I'm giving Cypress a try. I've found their development ui very helpful writting UI selectors. 

To run the tests, it uses a compose file with the frontend, backend, and database. Steps
1. In the project root directory run: `docker-compose up --build`
2. In another terminal (unless you use `-d` in docker compose), go to the `e2e` directory
3. Install dependencies with `yarn`
4. Run tests: `yarn cypress:run`

## Automation and Deployment

Tests and deployment are automated via [travis-ci](https://travis-ci.org/graffic/nanocorp). It runs: frontend tests, backend tests and end to end thanks to travis ability to launch other containers. With frontend and backend tests, code coverage is generated. **IMPORTANT NOTE** the coverage percentage is for the code files that has been tested. So a file that wasn't included in tests won't event show up.

After running tests, it builds two docker images: one for the backend and frontend called **app** and another one for the database called **db**. They are published on [docker hub](https://hub.docker.com/r/graffic/nanocorp/tags/)

The last step is deployment (Check the `deploy` directory). This application is deployed in Google Cloud using [Google Kubernetes Engine](https://cloud.google.com/kubernetes-engine/) with two pods (each pod with app and db containers) and a load balancer. After deploying the new images, the process empties Cloudflare's cache.

### Why kubernetes?

Containers are very easy to deploy and google was giving $300 USD in credits for Google Cloud. It was a no-brainer to get a cluster with 2 nodes an one external IP.

On one side the containers used in e2e tests are the same Docker files that run in production. It helps a lot being able to reproduce the environment. The other side was that it was a it difficult to automate the `gcloud`/`kubectl` process.

### Infrastructure summary

* Github for code.
* Travis CI for automation.
* Coveralls for coverage.
* Docker hub as a container registry.
* Google Cloud for GKE (Kubernetes).
* Cloudflare for CDN and SSL.
* GoDaddy for a cheap $1 USD domain name.
