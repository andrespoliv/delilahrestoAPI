const pool = require("../../db_connection/database");

duplicadoUsuarioEmail = async (req, res, next)=>{
    const b1Usuario = await pool.query("SELECT * FROM usuarios WHERE usuario = ?", req.body.usuario);
    if(b1Usuario[0]){
        res.status(400).send({
            message: "Ya existe usuario"
        });
        return;
    }

    const b2Usuario = await pool.query("SELECT * FROM usuarios WHERE email = ?", req.body.email);
    if(b2Usuario[0]){
        res.status(400).send({
            message: "Email ya utilizado"
        });
        return;
    }
    next();
}

const verifySignUp = {
    duplicadoUsuarioEmail: duplicadoUsuarioEmail
}

module.exports = verifySignUp;