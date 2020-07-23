const jwt = require("jsonwebtoken");
const config = require("../../config/auth.config");
const pool = require("../../db_connection/database");
var id;
var estados = ["Nuevo", "Confirmado", "Preparando", "Enviando", "Entregado"];


exports.agregarPedido = async (req, res)=>{
    jwt.verify(req.headers["x-access-token"], config.secret, (err, decoded) => {
        if(err){
            return res.status(401).send({
                message: "No autorizado"
            });
        }
        id = decoded.id;
    });
    const { producto, cantidad, pago } = req.body;
    const prodPedido = await pool.query("SELECT * FROM productos WHERE nombre = ?", [producto]);
    const userPedido = await pool.query("SELECT * FROM usuarios WHERE id = ?", [id]);

    if(!prodPedido[0]){
        res.status(404).send({
            Error:"El producto ingresado no está disponible."
        })
    }
    
    if(!userPedido[0]){
        res.status(404).send({
            Error:"No se puede realizar el pedido, falta usuario."
        })
    }

    if(!(pago == "Efectivo" || pago == "Débito" || pago == "Crédito")){
        res.status(400).send({
            Error: "Método de pago inválido."
        })
    }

    const nuevoPedido = {
        usuario: userPedido[0].usuario,
        estado : estados[0],
        producto: prodPedido[0].nombre,
        cantidad: cantidad,
        pago: pago,
        direccion : userPedido[0].direccion,
        user_id : id,
        prod_id : prodPedido[0].id
    };

    await pool.query("INSERT INTO pedidos set ?", [nuevoPedido]);
    res.json({Exito: "El pedido ha sido registrado con éxito"});
}

exports.misPedidos = async (req, res) =>{
    const { id } = req.params;
    const pedidosUsuario = await pool.query("SELECT * FROM pedidos WHERE user_id = ?", [id]);
    if(pedidosUsuario[0]){
        res.send(pedidosUsuario);
    }else{
        res.status(400).send({
            message: "No hay pedidos registrados por este usuario."
        })
    }
}

exports.todosPedidos = async (req, res) =>{
    const pedidos = await pool.query("SELECT * FROM pedidos");
    if(pedidos[0]){
        res.send(pedidos);
    }
    else{
        res.status(400).send({
            message: "No hay pedidos registrados."
        })
    }
}

exports.editarPedido = async (req, res) =>{
    const { id } = req.params;
    const {producto, cantidad, pago, direccion} = req.body;
    const prodEditado = await pool.query("SELECT * FROM productos WHERE nombre = ?", [producto]);
    if(prodEditado[0]){
        const productoEditado = {
            producto: prodEditado[0].nombre,
            cantidad: cantidad,
            pago: pago,
            direccion : direccion,
            prod_id : prodEditado[0].id
        }
        const editado = await pool.query("UPDATE pedidos set ? WHERE id = ?", [productoEditado, id]);
        if(editado.affectedRows > 0){
            res.send("Producto actualizado con éxito");
        }
        else{
            res.json({Error: `No hay resultados con el id ${id}`});
        }
    }else{
        res.status(400).send({
            message: "Producto no encontrado."
        })
    }
}

exports.eliminarPedido = async(req, res)=>{
    const { id } = req.params;
    await pool.query("DELETE FROM pedidos WHERE id = ?", [id]);
    res.send(`El pedido ha sido eliminado con éxito`);
}

exports.cambiarEstado = async(req, res)=>{
    const { id } = req.params;
    const pedidoStatus = await pool.query("SELECT * FROM pedidos WHERE id = ?", [id]);
    if(pedidoStatus[0]){
        if(pedidoStatus[0].estado === "Nuevo"){
            await pool.query("UPDATE pedidos set ? WHERE id = ?", [{estado : estados[1]}, id]);
        }else if(pedidoStatus[0].estado === "Confirmado"){
            await pool.query("UPDATE pedidos set ? WHERE id = ?", [{estado : estados[2]}, id]);
        }else if(pedidoStatus[0].estado === "Preparando"){
            await pool.query("UPDATE pedidos set ? WHERE id = ?", [{estado : estados[3]}, id]);
        }else if(pedidoStatus[0].estado === "Enviando"){
            await pool.query("UPDATE pedidos set ? WHERE id = ?", [{estado : estados[4]}, id]);
        }
        res.json({message : `El estado actual del pedido ${id} es ${pedidoStatus[0].estado}`});
    } else{
        res.status(404).send({
            message : "Error, número de pedido inválido."
        })
    }
}
