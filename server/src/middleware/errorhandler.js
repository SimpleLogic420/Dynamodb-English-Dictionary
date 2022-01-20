module.exports = errorHandler = (error, request, response, next) => {
  console.error(error.name);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  if (error.name === "SequelizeValidationError") {
    return response.status(400).send(error.message);
  }

  if (error.name === "SequelizeUniqueConstraintError") {
    return response.status(400).send(error.message);
  }
  next(error);
};
