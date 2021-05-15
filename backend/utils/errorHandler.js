class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message); // pass message to parent Error class
    this.statusCode = statusCode; // pass statusCode to custom errorHandler class

    // creates a .stack property on our object.
    // It'll give us a stack that'll help us find the location of the error
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ErrorHandler;
