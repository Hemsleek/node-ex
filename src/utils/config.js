require('dotenv').config()

module.exports = {
    port: process.env.PORT || 3030,
    DbUrl : process.env.DB_URL || ''
}