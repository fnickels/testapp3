import express from "express";
import { locationRouter } from "./api/routes/locationRoutes.js";
import { weatherRouter } from "./api/routes/weatherRoutes.js";
import { weatherRateLimit } from "./middleware/rateLimit.js";

const app = express();

const localOriginPattern = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && localOriginPattern.test(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Vary", "Origin");
    res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
  }

  if (req.method === "OPTIONS") {
    res.sendStatus(204);
    return;
  }

  next();
});

app.use(express.json());
app.use("/api/v1", weatherRateLimit);
app.use("/api/v1/locations", locationRouter);
app.use("/api/v1/weather", weatherRouter);

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

export { app };
