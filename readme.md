# Node.js Overview

## Introduction

Node.js is a single-threaded, asynchronous, and event-driven runtime built on Chrome's V8 JavaScript engine. It is widely used for building fast, scalable, and cross-platform applications.

## Features & Advantages

1. **Asynchronous & Non-Blocking**: Node.js handles operations asynchronously, allowing for efficient management of multiple tasks without blocking the execution thread.
2. **Event-Driven Architecture**: Ideal for applications such as chat apps and gaming, where real-time updates are essential.
3. **Powered by V8 Engine**: Node.js uses Google's V8 engine, ensuring high performance and fast execution of JavaScript code.
4. **Scalability**: Easily scales across multiple servers, making it suitable for large-scale applications.
5. **Cross-Platform**: Runs on various operating systems, including Windows, macOS, and Linux.

## Disadvantages

1. **Not Optimal for CPU-Intensive Tasks**: Node.js may struggle with applications that require heavy CPU computation.
2. **Challenges with Multithreading**: While Node.js is single-threaded, it can be complex to handle multithreading in large applications.

## Async-Await vs Promises

- **Promises**: Used for handling asynchronous operations and allow chaining.
- **Async-Await**: Simplifies the syntax of promises, making asynchronous code look more like synchronous code, improving readability and error handling.

## Core Concepts

1. **NPM (Node Package Manager)**: A tool for managing packages and dependencies in Node.js applications.
2. **Package.json**: A file that holds metadata about the project, including dependencies, scripts, and configurations.
3. **Node_modules**: The directory where all project dependencies are stored.
4. **Single/Multi-threading**: Node.js is single-threaded but can handle concurrent operations using its event loop and non-blocking I/O model.
5. **Browser vs Node**: While both run JavaScript, Node.js provides server-side capabilities and doesn't include browser-specific APIs like `window` or `document`.

## Modules

- **Built-in Modules**: Core modules such as `http`, `fs`, `path`, `os` and `events` come bundled with Node.js.
- **Custom Modules**: User-defined modules that encapsulate specific functionality.
- **Third-Party Modules**: External packages, often installed via NPM, that extend Node.js functionality (e.g., Express, Axios).

## Event-Driven Architecture (EDA)

- **Events**: Actions or occurrences that trigger responses.
- **Event Emitters**: Objects that trigger or emit events.
- **Event Queues**: Manage the order of events and their handling.
- **Event Handlers/Listeners**: Functions that respond to specific events.
- **Event Loop**: Continuously checks the event queue and processes events asynchronously.

## Conclusion

Node.js provides a powerful, fast, and scalable platform for building a variety of applications, particularly those requiring real-time interactions. Understanding its core concepts, event-driven nature, and asynchronous handling mechanisms is crucial for developing efficient Node.js applications.

## Topics Covered

### 1. Function vs Event, Express, Node.js vs Express.js

#### Function vs Event

- **Function-based architecture** is synchronous: a function is called, it runs its logic, and then returns a value.
- **Event-based architecture** (such as Node.js) operates asynchronously: events trigger handlers, and the system doesn't need to wait for one event to complete before handling the next.

#### Node.js vs Express.js

- **Node.js** is a JavaScript runtime that allows developers to run JavaScript on the server. It provides low-level APIs like HTTP and file system handling.
- **Express.js** is a lightweight web framework built on top of Node.js that provides an abstraction over Node’s HTTP module, offering features like routing, middleware support, and easier handling of requests and responses.

### 2. Advantages of Express.js

- **Easy to use/Minimal Code**: Express offers a simple API that makes it easy to build web applications with less code compared to raw Node.js.
- **Middleware Support**: Express allows the use of middleware, making it easy to implement features like request parsing, logging, authentication, and more.
- **Flexible Routing System**: Express provides an advanced routing system that can handle multiple HTTP methods and endpoints.
- **Template Engine Integration**: Express can be integrated with various template engines to render dynamic content. Some commonly used template engines include:
  - `ejs`
  - `pug`
  - `handlebars` (mustache)

### 3. Middleware in Express.js

Middleware functions are functions that have access to the request object (`req`), response object (`res`), and the `next` middleware function in the application's request-response cycle. Middleware can perform the following tasks:

- Execute any code.
- Modify the request and response objects.
- End the request-response cycle.
- Call the next middleware in the stack.

#### Middleware Parameters

Middleware functions accept up to four parameters: `err`, `req`, `res`, and `next`.

- `err`: Error object (used in error-handling middleware).
- `req`: Request object.
- `res`: Response object.
- `next`: Callback function to pass control to the next middleware.

### 4. Types of Middleware

1. **Application-Level Middleware**: Used across the entire application using `app.use()`. It is applied globally for every request.

   ```js
   app.use((req, res, next) => {
     console.log("Application-Level Middleware");
     next();
   });
   ```

2. **Router-Level Middleware**: Specific to individual routes. You can apply middleware to a specific route handler, allowing for more granular control.

```js
const router = express.Router();

router.use((req, res, next) => {
  console.log("Router-Level Middleware");
  next();
});

router.get("/specific-route", (req, res) => {
  res.send("Response from specific route");
});

app.use("/api", router);
```

3. **Error-Handling Middleware**: Middleware that handles errors in the application. It uses four parameters `(err, req, res, next)`.

```js
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
```

4. **Built in Middleware**: Express comes with some built-in middleware functions such as express.static to serve static files.

```js
app.use(express.static("public"));
```

5. **Third-Party Middleware**: External middleware libraries can be used for specific purposes. Some popular ones include:

- `helmet`: Adds security headers to requests.
- `body-parser`: Parses incoming request bodies.
- `compression`: Compresses the response to speed up the transfer.
- `morgan`: Logs HTTP requests to the console.

```js
const express = require("express");
const app = express();
const helmet = require("helmet");

// Using third-party middleware
app.use(helmet());

// Using application-level middleware
app.use((req, res, next) => {
  console.log("Request Type:", req.method);
  next();
});

// Using router-level middleware
const router = express.Router();
router.use((req, res, next) => {
  console.log("Router-Level Middleware");
  next();
});
router.get("/user", (req, res) => {
  res.send("User Page");
});
app.use("/api", router);

// Using error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

### If you have 5 middleware in a Node.js application, where do you put your error handling?

You should place your error-handling middleware after all other middleware(last) and route handlers. This ensures that it can catch any errors that occur in the previous middleware or routes.

If an error occurs, the process will skip & jump to the error handled middleware. For example, if there are five middlewares and an error happens in the third one, but the error handling is in the last middleware, it will be catchable. However, if the error handling is in the third middleware and the error occurs in the fourth, it will not be catchable.

## Advantages of Middleware

- **Durability**: Functions are divided into smaller pieces, so if an error occurs in one, it won’t impact the others. Only the affected module needs repair.
- **Reusability**: MV's can be reused across different applications or services.
- **Security**: Middleware can enhance security by managing access and protecting data.
- **Flexible Control Flow**: It can efficiently handle millions of requests, either for all routes or selectively for specific ones.
- **Third-Party Middleware Integration**: You can easily incorporate high-quality third-party middleware solutions as needed.
