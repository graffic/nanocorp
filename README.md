# FullStack assessment for Nanos.ai.
[![Build Status](https://travis-ci.org/graffic/nanocorp.svg?branch=master)](https://travis-ci.org/graffic/nanocorp) [![Coverage Status](https://coveralls.io/repos/github/graffic/nanocorp/badge.svg?branch=master)](https://coveralls.io/github/graffic/nanocorp?branch=master)

You can access the application here: https://nanos-assessment.com


## Introduction

This application answers the [nanos.ai](http://nanos.ai) [fullstack assesment project](https://github.com/nanosapp/fullstack-dev-assesment) using JavaScript (NodeJS and browser). At the same time it shows most of the points I consider important in an application: not only code and tests but also continuous integration and deployment using travis and google cloud.

Given that I was going to give this technical assessment some time, I decided to learn also something new. I will point out during this document which parts were new and my take on them.

Let's continue explaining each one of these sections: frontend, backend, db, end to end tests, and deployment. 

### Requirements

* NodeJS `10.9.0` and yarn are required to run the application in development mode.
* Docker and docker-compose to run backend service tests and end to end tests.

## Frontend

It is a single page application built on top of react and using mobx for state management. It is ocated in the `frontend` directory. 

Quick start (from `frontend`):

* Install dependencies: `yarn`
* Run tests: `yarn test:all_coverage`
* Run app in development mode (this needs the backend in development mode): `yarn start`

### Rationale

The frontend was built to consume data from the backend API. Usually in dashboards and applications managing data I tend to prefer SPAs over server side rendered. Files are structured by page plus the root `src` folder having some utilities.

[React](https://reactjs.org) was chosen due to it's versatility. I paid a bit the price of being able to choose react companion libraries instead of using `create-react-app`, but I learned more about how `webpack` and the `babel` pipeline.

Besides React, [mobx](https://mobx.js.org) was added for state management using stores like in a [flux architecture](https://facebook.github.io/flux/) but with the benefits of observables instead of actions and dispatchers. I haven't used mobx before, and I like how it eliminates the need of `setState` and groups the access to specific domain entities.

For style I went with [styled components](https://www.styled-components.com). It treats css as code and isolates styles into css classes for the specific component. It is a bit weird to have the css with the code, but it feels like the first time using JSX and having HTML tags along the code. I didn't use any widget library (bootstrap, material-ui). I started using `material-ui` but it was too much to learn. I ended up adding some manual styles here and there.

Packing it together with [webpack 4](https://webpack.js.org) from scratch instead of [create-react-app](https://github.com/facebook/create-react-app). I wanted to revisit webpack after two years using cli tools that obscure what is going on. Also [babel](https://babeljs.io) helped to make writing JavaScript a breeze while making the js code compatible with more browsers (check the output of `yarn browserslist`).

#### Tests

Components in this case were very simple, so I've added a few units for the stores and shallow snapshot for some content components. The end to end tests were the ones keeping the app together. I will describe them in their own section.

The idea was to show something, but keep the entire app working. So tests do not care much about what exactly is being rendered but renders something and keep the app work (e2e tests). It is true that more unit tests could have been added.

#### Other

**Code style** is enforced using the [standardjs](https://standardjs.com) style guide. I had to choose one, and lately I like that one a lot.

**Backend communication** is done using [graphql-request](https://github.com/prisma/graphql-request). I'll explain why GraphQL in the backend section.

Last but not least:

* Icons: [Google](https://www.flaticon.com/free-icon/search_281764), [Social media](https://www.flaticon.com/packs/social-media-2), [Question mark](https://www.flaticon.com/free-icon/question-mark-button_69464#term=unknown&page=1&position=3)
* [Table css ideas](https://colorlib.com/wp/css3-table-templates/)



