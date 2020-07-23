const { duplicadoUsuarioEmail } = require("../middleware/verifySignUp");
const authController = require("../controllers/authController");

module.exports = function(server){
    server.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    server.post("/signup", duplicadoUsuarioEmail, authController.signup);

    server.post("/signin", authController.signin);
}