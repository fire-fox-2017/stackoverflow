const jwt = require('jsonwebtoken');
const methods = {};

methods.auth = (data) => {
  let token = jwt.sign(data, process.env.SECRET_KEYS);
  return token
}

methods.isLogin = (req, res, next) => {
  jwt.verify(req.headers.token, process.env.SECRET_KEYS, (err, decoded) => {
    if(decoded) {
      if(decoded.role === 'User') {
        next();
      } else {
        res.json({
          message: 'Anda tidak dapat menggunakan fitur ini',
          success: false
        })
      }
    } else {
      res.json({
        msg: 'Anda harus login dulu sebelumnya',
        success: false,
        error: err
      })
    }
  })
}

methods.decode = (token) => {
  try {
    return jwt.verify(token, process.env.SECRET_KEYS)
  } catch(err) {
    return err;
  }
}

module.exports = methods;