// Define a string de conexão com o banco de dados
module.exports = {
    development: {
        database: {
            host: "localhost",
            port: "3306",
            name: "DB_USUARIO",
            dialect: "mysql",
            user: "root",
            password: "password"
        }
    },
    production: {
        database: {
            host: process.env.DB_HOST,
            host: process.env.DB_PORT
        }
    }
}
