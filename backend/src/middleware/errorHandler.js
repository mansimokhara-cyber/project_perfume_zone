/**
 * Centralised error handler – must be registered last in Express.
 * Sends a JSON error response so the API never leaks HTML error pages.
 */
// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${req.method} ${req.path}`, err.message);

  const status = err.status || err.statusCode || 500;
  const message =
    process.env.NODE_ENV === "production" && status === 500
      ? "An unexpected error occurred."
      : err.message || "Internal Server Error";

  res.status(status).json({ success: false, message });
};

