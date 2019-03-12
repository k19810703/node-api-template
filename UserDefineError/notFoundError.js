class NotFoundError {
  constructor(req) {
    Error.call(this);
    Error.captureStackTrace(this);
    this.message = '请求的资源不存在';
    this.type = '業務エラー';
    this.code = 404;
    this.operational = true;
    this.errordata = {
      method: req.method,
      url: req.originalUrl,
      data: req.body || null,
    };
  }
}

module.exports.NotFoundError = NotFoundError;
