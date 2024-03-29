const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

const authJwt = (req, res, next) => {
  let token = req.headers.authorization;
  
  if (!token || !token.startsWith("Bearer ")) {
    return res.status(403).send({
      message: "Unauthorized, No token provided!"
    });
  }

  token = token.slice(7); 

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

module.exports = authJwt;
