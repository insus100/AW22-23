const { mysqlConfig } = require("../config");
const { DAOAvisos } = require("./DAOAvisos");
const { DAOUsers } = require("./DAOUsers");
const mysql = require("mysql");
const pool = mysql.createPool(mysqlConfig);
// Crear una instancia de DAO
const daoA = new DAOAvisos(pool);
const daoU = new DAOUsers(pool);

module.exports = {
    daoA,
    daoU
}