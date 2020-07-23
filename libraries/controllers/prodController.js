const pool = require("../../db_connection/database");


exports.agregarProducto = async (req, res)=>{
    const { nombre, precio, descripcion } = req.body;
    const nuevoProducto = {
        nombre,
        precio,
        descripcion
    };
    await pool.query("INSERT INTO productos set ?", [nuevoProducto]);
    res.json({Exito: "El producto ha sido registrado con éxito"});
}

exports.listaProductos = async (req, res)=>{
    const listaProducto = await pool.query("SELECT * FROM productos");
    if(listaProducto[0]){
        res.send(listaProducto);
    }else{
        res.status(400).send(
            {message: "No hay productos en la lista."}
        )
    }
}

exports.obtenerProducto = async (req, res)=>{
    const { id } = req.params;
    const bProducto = await pool.query("SELECT * FROM productos WHERE id = ?", [id]);
    if(bProducto[0]){
        res.send(bProducto[0]);
    }else{
        res.status(400).send({
            Error : "Producto no encontrado"
        })
    }
}

exports.eliminarProducto = async(req, res)=>{
    const { id } = req.params;
    await pool.query("DELETE FROM productos WHERE id = ?", [id]);
    res.send(`El producto ha sido eliminado con éxito`);
}

exports.editarProducto = async (req, res) =>{
    const { id } = req.params;
    const {nombre, precio, descripcion} = req.body;
    const productoEditado = {
        nombre,
        precio,
        descripcion
    }
    const producto = await pool.query("UPDATE productos set ? WHERE id = ?", [productoEditado, id]);
    if(producto.affectedRows > 0){
        res.send("Producto actualizado con éxito");
    }
    else{
        res.json({Error: `No hay resultados con el id ${id}`});
    }
}


