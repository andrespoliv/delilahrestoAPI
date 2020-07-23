const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const server = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

//Middleware
server.use(cors(corsOptions));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended : true}));

//Base de datos
const { database } = require("./config/db.config");
const pool = require("./db_connection/database");

//Ruta de ejemplo
server.get("/", (req, res)=>{
    res.json({message: "Bienvenidos a mi primera aplicación"});
});

//Rutas
var func = require("./libraries/routes/users");
func(server);
var func2 = require("./libraries/routes/products");
func2(server);
var func3 = require("./libraries/routes/authUsers");
func3(server);
var func4 = require("./libraries/routes/pedidos");
func4(server);


//Servidor en puerto
const PORT = process.env.PORT || 8080;
server.listen(PORT, ()=>{
    console.log("Servidor iniciado...");
});