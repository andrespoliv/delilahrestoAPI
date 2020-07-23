const mysql = require("mysql");
const { database } = require("../config/db.config");
const { promisify } = require("util");
const pool = mysql.createPool(database);

pool.getConnection((err, connection)=>{
    if(err){
        if(err.code === "PROTOCOL_CONNECTION_LOST"){
            console.error("Se cerró conexión a base de datos");
        }
        if(err.code === "ER_CON_COUNT_ERROR"){
            console.error("La base de datos tiene demasiadas conexiones");
        }
        if(err.code === "ECONNREFUSED"){
            console.error("La conexión fue rechazada");
        }
    }
    if(connection) {
        connection.release();
        console.log("La base de datos está conectada")
    };
    return;
});

pool.query = promisify(pool.query);
module.exports = pool;