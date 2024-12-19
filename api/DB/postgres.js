const sessionPool = require('pg').Pool


const pool = new sessionPool({
    user: 'postgres',
    password: 't8kE36ZR^mPKLCaC',
    host: 'appmsn.cvofrq8gjce2.us-east-2.rds.amazonaws.com',
    port: '5432',
    database: 'postgres'
})
module.exports = pool
