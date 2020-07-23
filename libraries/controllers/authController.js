const pool = require("../../db_connection/database");
const config = require("../../config/auth.config");
var jwt = require("jsonwebtoken");
var {encryptPassword, matchPassword} = require("../../Helpers/helpers");

exports.signup = async (req, res)=>{
    const { usuario, nombre, apellido, email, telefono, direccion, contraseña } = req.body;
    const hPassword = encryptPassword(contraseña);
    var isAdmin;
        if(email === "andrespoliv@gmail.com"){
            isAdmin = 1;
        }else{
            isAdmin = 0;
        }
    const nuevoUsuario = {
        usuario,
        nombre,
        apellido,
        email,
        telefono,
        direccion,
        contraseña: hPassword,
        is_admin:isAdmin
    }
    await pool.query("INSERT INTO usuarios set ?", [nuevoUsuario]);
    res.json({Exito: "El usuario ha sido registrado con éxito"});
}

exports.signin = async (req, res)=>{
    const {usuario, contraseña} = req.body;
    const bUsuario = await pool.query("SELECT * FROM usuarios WHERE usuario = ?", [usuario]);
    if(bUsuario[0]){
            var verPassword = matchPassword(
                contraseña,
                bUsuario[0].contraseña
            )
        if(verPassword){
            var token = jwt.sign({id: bUsuario[0].id}, config.secret, {
                expiresIn: 86400 //24 horas
            });
            var rol = [];
            if(bUsuario[0].is_admin){
                rol.push("Administrador");
                res.status(200).send({
                    usuario: bUsuario[0].usuario,
                    email: bUsuario[0].email,
                    is_admin: rol[0],
                    accessToken: token
                })
            }else{
                rol.push("Usuario");
                res.status(200).send({
                    usuario: bUsuario[0].usuario,
                    email: bUsuario[0].email,
                    is_admin: rol[0],
                    accessToken: token
                })
            }  
        }else{
            res.status(401).send({
                accessToken: null,
                message: "Contraseña inválida"
            });
        }
    }else{
        res.status(404).send({
            message: "Usuario no encontrado"
        })
    }
}
