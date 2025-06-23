const { verifyToken } = require('../services/auth');

/**
 * Express middleware to check Bearer token in Authorization header.
 */
// PUBLIC_INTERFACE
function authenticate(req, res, next) {
  /** Authenticate JWT from 'Authorization' header. Sets req.user. */
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const user = verifyToken(token);
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

module.exports = authenticate;
