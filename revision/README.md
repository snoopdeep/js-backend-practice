# Book Store REST API (`revision`) 📚

A production-style Express.js & MongoDB backend demonstrating the Model-View-Controller (MVC) architecture, database pagination, custom middleware, and authentication.

## Architecture

* **`models/bookModel.js`**: Mongoose schema with fields: `title`, `author`, `genre`, `publishedYear`, `price`.
* **`controllers/bookController.js`**:
  * `createABook`: Adds a single book document to MongoDB.
  * `createManyBook`: High-throughput batch insert using `Book.insertMany()`.
  * `getBook`: Paginated, filtered, and sorted query handler:
    * Query parameters: `?title=...&genre=...&sortBy=title&order=asc&page=1&pageSize=10`
    * Calculation: `skip = (page - 1) * limit`
* **`middleware/authMiddleware.js`**: Checks JWT token present in `req.cookies.access_token` and verifies against `JWT_PRIVATE_KEY`.
* **`utils/appError.js`**: Custom error class extending JavaScript's native `Error` for structured error handling.
* **`app.js`**: Entry point featuring a custom 10 req/min in-memory rate limiter.

## Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

| Variable | Description | Default |
| :--- | :--- | :--- |
| `PORT` | Port for the Express server | `3000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/book_store` |
| `JWT_PRIVATE_KEY` | Secret key for signing and verifying JWTs | - |

## Running the Server

```bash
npm install
npm start
```
