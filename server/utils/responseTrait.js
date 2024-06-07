const responseWithStatusMessageData = (
  req,
  res,
  code,
  model,
  successed,
  failed = "",
  token = "",
  result
) => {
  return res.status(code).json({
    status: model ? true : false,
    mes: model ? successed : failed,
    token,
    result,
  });
};

const responseWithStatusMessage = (
  req,
  res,
  code,
  model,
  successed,
  failed
) => {
  return res.status(code).json({
    status: model ? true : false,
    mes: model ? successed : failed,
  });
};

module.exports = {
  responseWithStatusMessage,
  responseWithStatusMessageData,
};
