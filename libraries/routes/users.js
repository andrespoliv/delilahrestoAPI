const userController = require("../controllers/userController");
const authJWT = require("../middleware/authJWT");

module.exports = function(server){
    server.post("/usuarios/editar/:id", [authJWT.verifyToken, authJWT.isAdmin],  userController.editarUsuario);

    server.delete("/usuarios/eliminar/:id", [authJWT.verifyToken, authJWT.isAdmin], userController.eliminarUsuario);

    server.get("/usuarios/lista", [authJWT.verifyToken, authJWT.isAdmin], userController.listaUsuarios);
}