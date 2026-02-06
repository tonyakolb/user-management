const router = require('express').Router();
const pool = require('../db');
const auth = require('../middleware/auth');

router.use(auth);

// GET USERS (sorted)
router.get('/', async (req, res) => {
  const result = await pool.query(
    'SELECT id, name, email, status, last_login FROM users ORDER BY last_login DESC'
  );
  res.json(result.rows);
});

// BLOCK
router.post('/block', async (req, res) => {
  await pool.query(
    "UPDATE users SET status = 'blocked' WHERE id = ANY($1)",
    [req.body.ids]
  );
  res.sendStatus(200);
});

// UNBLOCK
router.post('/unblock', async (req, res) => {
  await pool.query(
    "UPDATE users SET status = 'active' WHERE id = ANY($1)",
    [req.body.ids]
  );
  res.sendStatus(200);
});

// DELETE
router.post('/delete', async (req, res) => {
  await pool.query(
    'DELETE FROM users WHERE id = ANY($1)',
    [req.body.ids]
  );
  res.sendStatus(200);
});

// DELETE UNVERIFIED
// router.post('/delete-unverified', async (req, res) => {
//   await pool.query(
//     "DELETE FROM users WHERE status = 'unverified'"
//   );
//   res.sendStatus(200);
// });
router.post('/delete-unverified', async (req, res) => {
  console.log('DELETE UNVERIFIED CALLED');

  const result = await pool.query(
    "DELETE FROM users WHERE status = 'unverified'"
  );

  console.log('DELETED ROWS:', result.rowCount);
  res.sendStatus(200);
});


module.exports = router;
