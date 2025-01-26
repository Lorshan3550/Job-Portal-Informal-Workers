class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  console.error("Error Message From Middleware : ", err.stack); // Logs the error stack for debugging

  // Default values for error message and status code
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  // Specific error handling
  if (err.name === "CastError") {
    err.message = `Resource not found. Invalid ${err.path}`;
    err.statusCode = 400;
  }

  if (err.code === 11000) {
    err.message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err.statusCode = 400;
  }

  if (err.name === "JsonWebTokenError") {
    err.message = `Json Web Token is invalid, Try again!`;
    err.statusCode = 400;
  }

  if (err.name === "TokenExpiredError") {
    err.message = `Json Web Token is expired, Try again!`;
    err.statusCode = 400;
  }

  // Send error response
  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};


export default ErrorHandler;
