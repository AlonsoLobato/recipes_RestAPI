const jwt = require("jsonwebtoken");

const verifiedRoute = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    res
      .status(401)
      .json({
        status: "FAILED",
        data: {
          error: 'User not authorized'
        }
      });
  }
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res
      .status(error?.status || 400)
      .json({ 
        status: "FAILED", 
        data: { error: error?.message || error } 
      });
  }
}

module.exports = {
  verifiedRoute,
}
