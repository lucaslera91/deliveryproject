Instrucciones:

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
1 - este es el formato utilizado para tomar los valores de input:

2 -


3 - La creacion de pedido se genera al agregar pedidos al carrito, luego desde el carrito se confirma la compra.

        - Este seria el formato para agregar al carrito:
        
        - Este seria el formato para agregar confirmar la compra:
4 - El usuario seria el unico que tiene la posibilidad de modificar, este es el formato y las opciones:

5 - El administrador puede hacer CRUD con las siguientes acciones:

    - Create
    - Update
    - Delete

    Tienen distintos end points porque seria mas facil a nivel practico (entiendo que eso no es un problmea). El concepto es que el admin modifique el listado.

6 - En mi logica el display de la pagina no existiria si el usuario no tuviese el campo de "Admin"
    - de cualquier modo hay un middlewere para ese escenario.


ojala este lo mas claro posible!

saludos y muchas gracias!

