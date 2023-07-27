# Url-Shortner (Version 1.0.0)

## Description

The URL Shortener Service with Payment Integration is a web application built using Node.js, Express.js, TypeScript, and PostgreSQL. This application allows users to shorten long URLs, making them more manageable and shareable. Additionally, it incorporates a payment gateway integration, utilizing Stripe, to enable users to make secure online payments.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [Dev Dependencies](#dev-dependencies)
- [License](#license)

## Installation

To run this project, you need to have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your system. After cloning this repository, navigate to the project's root directory and run the following command to install the required dependencies:

```bash
npm install
```

## Usage

To start the application, run the following command:

```bash
npm start
```

The application will be accessible at [http://localhost:3000](http://localhost:3000).

(Note: The `start` script uses `tsnd` to run the TypeScript files with auto-restart.)

## Dependencies

The project uses the following dependencies:

- cors: ^2.8.5
- dotenv: ^16.3.1
- express: ^4.18.2
- express-validator: ^7.0.1
- helmet: ^7.0.0
- jsonwebtoken: ^9.0.1
- npm: ^9.8.1
- pg: ^8.11.1
- sequelize: ^6.32.1
- shortid: ^2.2.16
- stripe: ^12.14.0

To install all the dependencies, run:

```bash
npm install
```

## Dev Dependencies

The project uses the following dev dependencies:

- @types/cors: ^2.8.13
- @types/express: ^4.17.17
- @types/jsonwebtoken: ^9.0.2
- @types/shortid: ^0.0.29
- ts-node-dev: ^2.0.0

These dev dependencies are used for development purposes. They are not required for the production build of the application.

To install all the dev dependencies, run:

```bash
npm install --only=dev
```

## License

This project is licensed under the [ISC License](LICENSE).

---

Replace the placeholder text with the appropriate information about your project. Feel free to modify or expand the sections as needed. Once you've created the README.md file, save it in the root directory of your GitLab repository. Commit and push the file to make it accessible in your GitLab project.
