const dotenv = require('dotenv')
dotenv.config()

const {
  PORT,
  HOST,
  HOST_URL,
  TOKEN_SECRET,
  SQL_USER,
  SQL_PASSWORD,
  SQL_SERVER,
  SQL_DATABASE,
  EMAIL_USER,
  EMAIL_PASSWORD,
} = process.env
const sqlEncrypt = process.env.SQL_ENCRYPT === 'true'

module.exports = {
  host: HOST,
  port: PORT,
  hostUrl: HOST_URL,
  jwtToken: TOKEN_SECRET,
  emailSenderUser: EMAIL_USER,
  emailSenderPassword: EMAIL_PASSWORD,
  sqlConfig: {
    user: SQL_USER,
    password: SQL_PASSWORD,
    server: SQL_SERVER,
    database: SQL_DATABASE,
    options: {
      encrypt: sqlEncrypt
      // trustedConnection: true,
      // trustServerCertificate: true,
    }
  }
}
