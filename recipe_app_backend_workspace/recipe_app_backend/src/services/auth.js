const jwt = require('jsonwebtoken');

// PUBLIC_INTERFACE
function generateToken(user) {
  /** Generate a JWT for a user (id + username). */
  return jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET || 'secretKey',
    { expiresIn: '1d' }
  );
}

// PUBLIC_INTERFACE
function verifyToken(token) {
  /** Verify a JWT. Returns payload if valid, throws if not. */
  return jwt.verify(token, process.env.JWT_SECRET || 'secretKey');
}

module.exports = { generateToken, verifyToken };
