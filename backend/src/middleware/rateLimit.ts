import rateLimit from "express-rate-limit";

export const weatherRateLimit = rateLimit({
  windowMs: 60_000,
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.ip ?? "unknown",
  handler: (_req, res) => {
    res.setHeader("Retry-After", "60");
    res.status(429).json({
      status: "error",
      code: "rate_limited",
      message: "Too many requests. Please wait and try again.",
      retryAfterSeconds: 60,
    });
  },
});
