export const notFound = (req, res) => {
  res.status(404);
  throw new Error(`Route not found: ${req.originalUrl}`);
};

export const errorHandler = (err, req, res, _next) => {
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    message: err.message || "Something went wrong.",
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
    path: req.originalUrl,
  });
};

