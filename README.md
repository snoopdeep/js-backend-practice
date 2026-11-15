# JavaScript & Node.js Backend Practice 🚀

A structured collection of hands-on Node.js, Express.js, MongoDB, and System Design implementations covering API rate limiting algorithms, production-style REST APIs, authentication, and backend patterns.

---

## 📂 Repository Structure

```plaintext
JS/
├── RateLimiter/                 # System Design: API Rate Limiter Implementations
│   ├── app.js                   # Express server with custom sliding window counter
│   ├── package.json
│   └── README.md
│
├── revision/                    # Production-style Express + MongoDB REST API
│   ├── controllers/             # Request handlers (bookController.js)
│   ├── middleware/              # Auth & custom middleware (authMiddleware.js)
│   ├── models/                  # Mongoose schemas (bookModel.js)
│   ├── routes/                  # Express route definitions (bookRoutes.js)
│   ├── utils/                   # Utilities & custom error handling (appError.js)
│   ├── .env.example             # Template for required environment variables
│   ├── app.js                   # Application entry point with custom rate limiter
│   ├── package.json
│   └── README.md
│
├── Intro_To_Node/               # Node.js fundamentals & package ecosystem
│   ├── index.js
│   └── package.json
│
├── index.html                   # Browser-based JavaScript playground
├── script.js
└── .gitignore                   # Excludes node_modules, .env secrets, and OS files
```

---

## 🛠️ Project Modules

### 1. `RateLimiter/` — API Rate Limiting Algorithms
Explores methods to throttle incoming HTTP requests and protect APIs from abuse and denial-of-service (DoS).
* **Sliding Window Counter**: Implemented from scratch using client IP mapping, tracking timestamps and request counts per time window.
* **Token Bucket Algorithm**: Explores token replenishment intervals and burst allowance.
* **Production Middleware**: Comparison against the battle-tested `express-rate-limit` package.

### 2. `revision/` — Book Store REST API (Express & Mongoose)
A modular RESTful backend organized using the **MVC (Model-View-Controller)** pattern:
* **Mongoose Schema & Models**: `Book` entity with `title`, `author`, `genre`, `publishedYear`, and `price`.
* **Advanced Querying & Pagination**: 
  * Query-based filtering by `title` and `genre`.
  * Dynamic sorting order (`asc` / `desc`) by field.
  * Server-side pagination using `skip` and `limit`.
* **Batch Operations**: Bulk insert (`POST /book/createMany`) and individual creation (`POST /book`).
* **Authentication Middleware**: JWT token validation extracted from incoming cookies.
* **Centralized Error Handling**: Custom `AppError` class for operational error classification.
* **IP-based In-memory Rate Limiting**: Built-in 10 requests/minute guardrail on the server entry point.
* **Environment Configuration**: Secrets isolated using `dotenv` and `.env.example`.

### 3. `Intro_To_Node/` — Node.js Fundamentals
* Demonstrates CommonJS module system (`require` / `module.exports`).
* Managing external package dependencies via NPM.

---

## 🧠 What We Learned Together

1. **System Design & Rate Limiting**
   * How sliding window counters work: calculating `timeElapsed = currentTime - windowStart` per IP.
   * Proper HTTP status codes: returning **429 Too Many Requests** when thresholds are exceeded.
   * Trade-offs between custom in-memory rate limiting and production distributed stores (e.g. Redis).

2. **Clean REST API Architecture (MVC)**
   * Separation of concerns: Keeping routes lean while moving business logic to controllers and data modeling to Mongoose schemas.
   * Middleware chaining with `next()`, enabling reusable auth checks, error handling, and request throttling.

3. **Database Performance & Pagination**
   * Implementing safe pagination (`(page - 1) * pageSize`) to prevent querying entire database collections at once.
   * Combining filters, dynamic sorting, and limits cleanly in Mongoose queries.

4. **Security & Secrets Management**
   * **Rule #1 of Backend Security**: Never commit database connection strings or JWT secrets to Git.
   * Configuring `.env` with a public `.env.example` template for collaborators.
   * Excluding `node_modules/` and `.env` files via a comprehensive `.gitignore`.

---

## ⚡ Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (v16+ recommended)
* [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas cluster)

### Installation & Running

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd JS
   ```

2. **Run the Rate Limiter project:**
   ```bash
   cd RateLimiter
   npm install
   npm start
   ```

3. **Run the Book Store REST API (`revision`):**
   ```bash
   cd revision
   npm install

   # Set up your environment variables
   cp .env.example .env
   # Edit .env to add your MongoDB connection string and JWT secret

   npm start
   ```

---

## 📄 License
ISC
