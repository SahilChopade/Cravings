const { verify } = require("jsonwebtoken");
const { UNAUTHORIZED } = require("../constants/httpSatus");

module.exports = (req, res, next) => {
  const token = req.headers.acces_token;
  if (!token) return res.status(UNAUTHORIZED).send();
  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (error) {
    res.status(UNAUTHORIZED).send();
  }
  return next();
};
