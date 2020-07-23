const pool = require("../../db_connection/database");

exports.editarUsuario = async (req, res)=>{
    const { id } = req.params;
    const { nombre, apellido, email, telefono, direccion } = req.body;
    const usuarioEditado = {
        nombre,
        apellido,
        email,
        telefono,
        direccion
    };
    const uEditado = await pool.query("UPDATE usuarios set ? WHERE id = ?", [usuarioEditado, id]);
    if(uEditado.affectedRows > 0){
        res.json({Exito: "El usuario ha sido editado con éxito"});
    }else{
        res.status(404).send(
            {message: "Hubo un error"}
        );
    }
    
}

exports.eliminarUsuario = async (req, res)=>{
    const { id } = req.params;
    await pool.query("DELETE FROM usuarios WHERE id = ?", [id]);
    res.send(`El usuario ha sido eliminado con éxito`);
}

exports.listaUsuarios = async (req, res)=>{
    const listaUsuario = await pool.query("SELECT * FROM usuarios");
    if(listaUsuario[0]){
        res.send(listaUsuario);
    }else{
        res.status(404).send(
            {message: "No hay usuarios registrados."}
        )
    }
}



