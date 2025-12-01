const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    database: 'splitpal',
    password: 'sql',
    port: 5432,
    host: 'localhost',
    ssl: false,
    query_timeout: 5000
});

module.exports = {
    pool
};