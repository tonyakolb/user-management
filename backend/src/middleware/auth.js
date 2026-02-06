const jwt = require('jsonwebtoken');
const pool = require('../db');

module.exports = async function auth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: 'No token' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const result = await pool.query(
      'SELECT id, status FROM users WHERE id = $1',
      [decoded.id]
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // 🔥 ВОТ ЭТО ОБЯЗАТЕЛЬНО
    if (user.status === 'blocked') {
      return res.status(403).json({ message: 'User is blocked' });
    }

    req.user = user;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
