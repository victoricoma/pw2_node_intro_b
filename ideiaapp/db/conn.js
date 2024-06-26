const { Sequelize } = require('sequelize')
const fs = require('fs')
require('dotenv').config()

const sequelize = new Sequelize("ideias_db",
process.env.AZURE_USER_MYSQL,
process.env.AZURE_SENHA_MYSQL, {
    host: process.env.AZURE_URL_MYSQL,
    dialect: 'mysql',
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        // caminho para o certificado CA
          ca: fs.readFileSync(__dirname + '/DigiCertGlobalRootCA.crt')
        }
      }
})

try{
    sequelize.authenticate()
    console.log('Conectado com Deploy Azure Server MySQL Flex')
}catch(error){
    console.error(`Deu erro na conexão com Azure: ${error}`)
}

module.exports = sequelize