exports.success = (res, status, message, data = {}) => {
  return res.status(status).json({
    success: true,
    message,
    data,
  });
};

exports.error = (res, status, message) => {
  return res.status(status).json({
    success: false,
    message,
  });
};
