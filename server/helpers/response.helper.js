const { removeNullDataInResponse } = require("./common.helper");

const successResponse = (req, res, msg, getData = {}, code = 200) => {
  const responseData = removeNullDataInResponse(getData);
  res.status(code).send({
    message: msg,
    data: responseData,
  });
};
const errorResponse = (req, res, msg, getData = {}, code = 422) => {
  res.status(code).send({
    message: msg,
    data: getData,
  });
};
module.exports = {
  successResponse,
  errorResponse,
};
