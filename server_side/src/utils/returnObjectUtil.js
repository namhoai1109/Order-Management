exports.createReturnObject = (result, error, message, statusCode) => {
  return {
    result,
    meta: {
      error,
      message,
      statusCode
    }
  }
}
