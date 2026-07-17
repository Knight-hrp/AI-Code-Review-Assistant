const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

// Idle clients can be closed by Neon/cloud Postgres; handle so Node doesn't crash
pool.on("error", (err) => {
  console.error("Unexpected PostgreSQL pool error:", err.message);
});

pool
  .query("SELECT 1")
  .then(() => console.log("✅ PostgreSQL Connected"))
  .catch((err) => console.error("❌ Database Connection Error:", err.message));

module.exports = pool;
