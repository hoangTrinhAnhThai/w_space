exports.successResponse = function (res, mgs) {
    var resData = {
      status: 1,
      message: mgs,
    };
    return res.status(200).json(resData);
  };
  
  exports.successResponseWithData = function (res, mgs, data) {
    var resData = {
      status: 1,
      message: mgs,
      data: data,
    };
    return res.status(200).json(resData);
  };
  
  exports.ErrorResponse = function (res, mgs) {
    var resData = {
      status: 0,
      message: mgs,
    };
    return res.status(500).json(resData);
  };
  
  exports.notFoundResponse = function (res, mgs) {
    var resData = {
      status: 0,
      message: mgs,
    };
    return res.status(404).json(resData);
  };
  
  exports.validationErrorWithData = function (res, mgs, data) {
    var resData = {
      status: 0,
      message: mgs,
      data: data,
    };
    return res.status(400).json(resData);
  };
  
  exports.unauthorizedResponse = function (res, mgs) {
    var data = {
      status: 0,
      message: mgs,
    };
    return res.status(401).json(data);
  };