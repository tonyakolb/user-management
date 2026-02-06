// important: this middleware checks user before EACH request
// nota bene: except login and registration
const jwt = require('jsonwebtoken');
const pool = require('../db');

module.exports = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.sendStatus(401);

  try {
    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, 'SECRET');

    const result = await pool.query(
      'SELECT * FROM users WHERE id = $1',
      [decoded.id]
    );

    const user = result.rows[0];

    if (!user || user.status === 'blocked') {
      return res.sendStatus(401);
    }

    req.user = user;
    next();
  } catch (e) {
    res.sendStatus(401);
  }
};
