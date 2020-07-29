# delilahrestoAPI

## Tabla de contenidos:
### Requerimientos
### Directorio de archivos
### Uso
### Licencia
#
### Requerimientos
delilahrestoAPI requiere las siguintes tecnologías para funcionar: Node.js 0.10+, y los siguientes módulos provistos a través de npm (el cuál viene instalado normalmente en el node.js y puede accederse fácilmente desde la terminal): 
    
    "bcryptjs": "^2.4.3", Permite hacer la encriptación de la contraseña al momento de ingresarla al servidor y la verificación al momento de iniciar sesión dentro de la API
    "body-parser": "^1.19.0", Permite el envío de información en formato JSON a partir del cuerpo del request proveniente del cliente
    "cors": "^2.8.5", Permite manejar el acceso de información de origen cruzado
    "express": "^4.17.1", Permite levantar el servidor de la aplicación
    "jsonwebtoken": "^8.5.1", Permite autenticar y validar acceso a recursos dentro de la API
    "mysql": "^2.18.1", Permite generar una conexión entre la API y una base de datos asociada a MySQL
    "util": "^0.12.3" Permite manejar callbacks como promesas

#
### Directorio de archivos
delilahrestoAPI tiene el siguiente directorio de archivos:

    ./config
      Contiene archivos sensibles. Se debe sustituir la información por la propia del usuario tanto para auth.config.js como para db.config.js
    ./db
      Contiene archivo db.sql de tipo SQL que indica todo el código para la estructura de datos necesaria para utilizar esta API
    ./db_connection
      Contiene archivo database.js que ejecuta y verifica la conexión entre la API y la base de datos
    .Helpers
      Contiene archivo helpers.js donde se define la encriptación, y posterior validación, de la contraseña
    ./libraries
      Contiene todos los microservicios/archivos necesarios para la ejecución exitosa de las rutas
      ./libraries/controllers
        Contiene todos los callbacks necesarios para la ejecución de cada uno de los endpoints. Son en total 4: Autenticación y autorización en crear cuenta e inicio de sesión           (authController.js); Callbacks para el CRUD de pedidos (pedController.js); Callbacks para el CRUD de productos (prodController.js); Callbacks para la edición, obtención          y eliminación de usuarios (userController.js)
        
        NOTA: para la creación de usuarios tipo Admin debe modificarse el correo electrónico especificado en la función signup del authController con el correo, o correos,               habilitados para dichas funciones
        
      ./libraries/middleware
        Contiene los middlewares necesarios para ejecutar correctamente los endpoints. Son en total 2: Autenticación mediante el JSON Web Token y verificación de rol de                 administrador (authJWT.js) y verificación de duplicidad de email o nombre de usuario al momento de registro de usuario (verifySignUp.js)
      ./libraries/routes
        Las rutas de esta API permiten hacer una conexión entre las tablas creadas en la base de datos de modo que mediante un CRUD de productos (products.js), de lectura para           el usuario y modificación para el administrador, el usuario (users.js), cuyo registro lo realiza el cliente (authUsers.js) y cuya modificación se realiza mediante el             administrador, puede realizar pedidos (pedidos.js), los cuales son combinaciones de cantidades de productos disponibles en la tabla productos con una fecha de                    entrada especificada, una cantidad y un método de pago (de entre los disponibles: Efectivo, Débito y Crédito) los cuales están asociados a un usuario determinado y             pueden poseer múltiples productos.
    ./server.js
      Código que contiene todos los parámetros y recursos para la inicialización del servidor
    ./package.json
      Código que contiene las dependencias utilizadas en el proyecto
    ./package-lock.json
      Código que contiene detalles sobre el proyecto y las dependencias
    ./OpenAPI_doc.yaml
      Código que contiene un modelo Open API en formato YAML de la API

#
### Uso
Para utilizar delilahrestoAPI debe contarse con una aplicación de simulación de cliente como Postman o Eclipse, un servidor virtual como XAMPP y una aplicación del tipo MySQL como PHPmyAdmin


Item	Cumple
1 - Poder registrar un nuevo usuario.	Si
2 - Un usuario debe poder listar todos los productos disponibles.	No se puede testear
3 - Un usuario debe poder generar un nuevo pedido al Restaurante con un listado de platos que desea.	No se puede testear
4 - El usuario con roles de administrador debe poder actualizar el estado del pedido.	No se puede testear
5 - Un usuario con rol de administrador debe poder realizar las acciones de creación, edición y eliminación de recursos de productos (CRUD de productos).	No se puede testear
6 - Un usuario sin roles de administrador no debe poder crear, editar o eliminar un producto, ni editar o eliminar un pedido. Tampoco debe poder acceder a informaciones de otros usuarios.	No se puede testear

Una vez se cuenta con esos recursos adicionales es posible iniciar la API:
  
  a) Ejecutar node server.js desde la terminal y verificar que en la consola se imprima el mensaje del servidor y de la conexión con la base de datos
  
  b) Abrir POSTMAN para ejecutar cualquiera de los endpoints declarados en la documentación OpenAPI_doc.yaml
  
  c) Crear usuario mediante el endpoint POST "/signup" llenando el body JSON del POSTMAN con los siguientes datos:
       { usuario,
        nombre,
        apellido,
        email,
        telefono,
        direccion,
        contraseña}
  
  d) Iniciar sesión mediante el endpoint POST "/signin llevando el body JSON del POSTMAN con los siguientes datos (una vez hecho el paso anterior):
      { usuario,
        contraseña}
  
  #NOTA: Una vez iniciada la sesión, el proceso de autorización se hará mediante el uso de la introducción del JSON Web Token dentro del header llamado "x-access-token". Todo acción ejecutada dentro de la API requerirá el token, por lo que de no incluir tal header con el JWT proveniente de la respuesta tras el inicio de sesión, no se podrá continuar
  
  e) Registrar productos dentro de la base de datos (ver endpoint POST "/nuevoproducto", se debe ser admin y estar iniciado para hacer esto). Para ello llenar el body JSON del POSTMAN con los siguientes datos:
       { nombre,
        precio,
        descripcion}
  
  f) Para listar todos los productos del menú, basta con hacer un llamada mediante el endpoint GET "/menu", no se necesita ser administrador para ejecutar tal tarea
  
  g) Si se es usuario sin privilegios (o admin), se puede observar el listado de productos mediante el endpoint GET /menu
  
  h) Para realizar el pedido se debe ingresar en el body JSON del POSTMAN los siguientes datos a partir del endpoint POST "/pedidos/nuevo":
      {producto, 
      cantidad, 
      pago}
  
  i) Para actualizar el estado del pedido sólo debe hacerse uso del endpoint "/pedidos/estado/:id" con el id del pedido a modificar
  
  j) Para propiedades adicionales del CRUD de productos, usar respectivamente los siguientes endpoints para editar y eliminar
  
  
  POST "/editar/:id": con los siguientes datos en el body
  
  {
        nombre,
        precio,
        descripcion
  }
  
  DELETE "/eliminarproducto/:id" con el id del producto a eliminar
  
  
  
  k) Para funcionalidad especial de tipo admin ver los endpoints definidos en el archivo YAML
  
  ###### NOTA: se debe tener la base de datos iniciada previamente en caso de usar XAMPP (esto se logra haciendo clic en start APACHE y luego START mySQL)
  
#
### Licencia
Esta API no posee ninguna licencia actualmente por lo que su uso, modificación y remoción es totalmente legal por los momentos.
