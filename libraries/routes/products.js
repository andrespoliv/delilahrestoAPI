const authJWT = require("../middleware/authJWT");
const controller = require("../controllers/prodController");


module.exports = function(server){
    server.post("/nuevoproducto", [authJWT.verifyToken, authJWT.isAdmin], controller.agregarProducto);

    server.get("/menu", authJWT.verifyToken, controller.listaProductos);

    server.get("/menu/:id", authJWT.verifyToken, controller.obtenerProducto);

    server.delete("/eliminarproducto/:id", [authJWT.verifyToken, authJWT.isAdmin], controller.eliminarProducto);

    server.post("/editar/:id", [authJWT.verifyToken, authJWT.isAdmin], controller.editarProducto);
}
