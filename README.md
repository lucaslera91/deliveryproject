Instrucciones:

Se debe importar la base de datos a phpmyadmin - delilah_proyecto3
Datos a Completar

Ingresar al servidor:

Local host: http://localhost:8080/phpmyadmin/

Completar en archivo .env los siguientes campos: 

    db_host='192.168.64.6'
    db_PORT=3306

Datos a tener en cuenta: 
    db_DIALECT="mysql"

Para ingresar a sus base de datos:

    db_USUARIO='lucas'
    db_CONTRASE=123456

Podes completar o modificar a gusto la firma:

    jwt_Firma='palabraSecreta'

Forma de operar de la API / logica aplicada:

    - Los datos de productos de la aplicacion no tienen errores de typeo o input ya que son todas seleccione y no se escribe nada.

    - Lo unico que se verifica en forma de input es el usuario y contraseña ingresado.

Primero instalar en nmp todos los paquetes: npm install

Para ejecutar: node index

Checklist:

3 - La creacion de pedido se genera al agregar pedidos al carrito, luego desde el carrito se confirma la compra.

4 - El usuario seria el unico que tiene la posibilidad de modificar, este es el formato y las opciones:

5 - El administrador puede hacer CRUD con las siguientes acciones:

    - Create
    - Update
    - Delete

El concepto es que el admin modifique el listado de pedidos.

6 - solo el administrador puede ver el listado de pedidos.

user Admin: lucas
user password: 123456

Esta la importacion de la base de datos

