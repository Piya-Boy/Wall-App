import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
// import rateLimiter from "./middleware/rateLimiter.js";
import path from "path";
import { fileURLToPath } from "url";

import transactionsRoute from "./routes/transactionsRoute.js";
import job from "./config/cron.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

console.log("DATABASE_URL:", process.env.DATABASE_URL);

const app = express();

if (process.env.NODE_ENV === "production") job.start();

// middleware
// app.use(rateLimiter);
app.use(express.json());

// our custom simple middleware
// app.use((req, res, next) => {
//   console.log("Hey we hit a req, the method is", req.method);
//   next();
// });

const PORT = process.env.PORT || 5001;

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});


app.use("/api/transactions", transactionsRoute);

// Handle 404 for unknown API routes with JSON
app.use("/api/*", (req, res) => {
  res.status(404).json({ message: "Not found" });
});

initDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is up and running on PORT:", PORT);
  });
});
