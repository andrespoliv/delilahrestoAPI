const jwt = require("jsonwebtoken");
const config = require("../../config/auth.config");
const pool = require("../../db_connection/database");
var id;

verifyToken = (req, res, next)=>{
    let token = req.headers["x-access-token"];
    if(!token){
        return res.status(403).send({
            message : "No hay token"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if(err){
            return res.status(401).send({
                message: "No autorizado"
            });
        }
        id = decoded.id;
        next();
    })
};

isAdmin = async (req, res, next)=>{
    const bUsuario = await pool.query("SELECT * FROM usuarios WHERE id = ?", id);
    if(bUsuario[0].is_admin == 1){
        next();
    }else{
        res.status(403).send({
            message: "No está autorizado para ver esta sección"
        });
    }
}

const authJWT = {
    verifyToken: verifyToken,
    isAdmin: isAdmin
};

module.exports = authJWT;
