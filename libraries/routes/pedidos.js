const authJWT = require("../middleware/authJWT");
const pedController = require("../controllers/pedController");

module.exports = function(server){

    server.post("/pedidos/nuevo", pedController.agregarPedido);

    server.get("/pedidos/usuario/:id", authJWT.verifyToken, pedController.misPedidos);

    server.get("/pedidos/todos", [authJWT.verifyToken, authJWT.isAdmin], pedController.todosPedidos);

    server.post("/pedidos/usuarios/editar/:id", authJWT.verifyToken, pedController.editarPedido);

    server.delete("/pedidos/usuarios/eliminar/:id", [authJWT.verifyToken, authJWT.isAdmin], pedController.eliminarPedido);

    server.get("/pedidos/estado/:id", [authJWT.verifyToken, authJWT.isAdmin], pedController.cambiarEstado);
}