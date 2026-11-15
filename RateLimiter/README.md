# Rate Limiter Exploration ⏳

This module explores backend rate limiting strategies in Node.js and Express to prevent brute force attacks, denial of service (DoS), and API abuse.

## Algorithms Explored

### 1. Sliding Window Counter
* **Concept**: Tracks the number of requests made by a specific client (identified by IP) within a defined time frame (`WINDOW_SIZE_IN_SEC = 60s`).
* **Implementation Details**:
  * An in-memory hash map (`requestCount[userIP]`) stores `{ count, windowStart }`.
  * If the client issues requests within the window:
    * If `count < RATE_LIMIT`, increment and proceed.
    * If `count >= RATE_LIMIT`, return HTTP `429 Too Many Requests`.
  * If the window expires, reset the counter and start a new window.

### 2. Token Bucket Algorithm
* Refills tokens at a steady rate over time up to a maximum bucket capacity.
* Handles request bursts smoothly as long as tokens are available in the bucket.

### 3. Production npm Package (`express-rate-limit`)
* Built-in standard headers (`draft-7`), legacy headers, and custom rejection messages.

## Running the Server

```bash
npm install
npm start
```
Server runs at `http://localhost:3000`.
