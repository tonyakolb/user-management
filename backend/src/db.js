// important: PostgreSQL connection pool
// nota bene: email uniqueness is guaranteed by DB index, not code
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'user_management',
  password: 'londondon', 
  port: 5432,
});

module.exports = pool;
