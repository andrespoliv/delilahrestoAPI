CREATE DATABASE delilah_resto;

USE delilah_resto;

--PRODUCTOS TABLE
CREATE TABLE productos(
    id INT(11) NOT NULL,
    nombre VARCHAR(30) NOT NULL,
    precio INT(20) NOT NULL,
    descripcion TEXT(150) NOT NULL
);

ALTER TABLE productos
    ADD PRIMARY KEY (id);

ALTER TABLE productos
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT;


--USUARIOS TABLE

CREATE TABLE usuarios(
    id INT(11) NOT NULL,
    usuario VARCHAR(30) NOT NULL,
    nombre VARCHAR(30) NOT NULL,
    apellido VARCHAR(30) NOT NULL,
    email VARCHAR(70) NOT NULL,
    telefono VARCHAR(15) NOT NULL,
    direccion TEXT(250) NOT NULL,
    contraseña VARCHAR(60) NOT NULL,
    is_admin INT() NOT NULL
)

ALTER TABLE usuarios
    ADD PRIMARY KEY (id);

ALTER TABLE usuarios
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT;

-- PEDIDOS TABLE

CREATE TABLE pedidos(
    id INT(11) NOT NULL,
    estado VARCHAR(50) NOT NULL,
    hora timestamp NOT NULL DEFAULT current_timestamp,
    producto VARCHAR(200) NOT NULL,
    cantidad INT(5) NOT NULL,
    pago VARCHAR(50) NOT NULL,
    usuario VARCHAR(30) NOT NULL,
    direccion TEXT(250) NOT NULL,
    user_id INT(11) NOT NULL,
    prod_id INT(11) NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES usuarios(id),
    CONSTRAINT fk_prod FOREIGN KEY (prod_id) REFERENCES productos(id)
)

ALTER TABLE pedidos
    ADD PRIMARY KEY (id);

ALTER TABLE pedidos
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT;
