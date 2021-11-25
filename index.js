const express = require('express');
const servidor = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 3000;
const servicio = require('./service/conection');
const usuarios = require('./service/usuarios');
const admin = require('./service/admin');
const TIMESTAMP = require('sequelize-mysql-timestamp');
const moment = require('moment');
//const admin = require('./service/adimin');
servidor.use(bodyParser.json());
servidor.use(cors());
const middlewere = require('./service/middlewere');
const jwt = require('jsonwebtoken');


// servidor.all('*', (req, res, next) => {
//     next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
//   });


try {
    // nonExistentFunction();
} catch (error) {
    console.error(error);
    // expected output: ReferenceError: nonExistentFunction is not defined
    // Note - error messages will vary depending on browser
}




// Registrar Usuario
// 
servidor.post('/registrarse', async (req, res) => {

    const user = req.body.user;
    const name = req.body.nombre;
    const email = req.body.correo;
    const tel = req.body.tel;
    const dir = req.body.dir;
    const password = req.body.contrasena;

    if (user === undefined || user === null ||
        name === undefined || name === null ||
        email === undefined || email === null ||
        tel === undefined || tel === null ||
        dir === undefined || dir === null ||
        password === undefined || password === null
    ) {
        return res.status(500).json({ msg: '404 - Error en los datos' });
    } else {

        // chequear si existe en la base de datos (usuario y correo)

        let busqueda = await servicio.consutlaGenerica('usuarios', user);

        if (busqueda == "") {
            const dato = await servicio.agregarGenerico('usuarios', {
                nombre_apellido: name,
                usuario: user,
                correo: email,
                contrasena: password,
                direccion: dir,
                telefono: tel,
                carrito: "",
                favoritos: "",
                rol: ""
            })
            return res.status(200).json({ msg: 'Register correct', dato });
        } else {
            res.status
            return res.status(404).json({ msg: '404 - Register ya existe', busqueda });
        }
    }
}
);

// login - JWT + payload

// envio token con info (admin + id)

//se debe sumar la info de JWT - se manda en Headers

// 


servidor.post('/login', async (req, res) => {

    const us = req.body.usuario;
    const psswd = req.body.contrasena;


    if (us === undefined || us === null ||
        psswd === undefined || psswd === null
    ) {
        // do something when error
        return res.status(500).json({ msg: `'404 - Error en los datos'` });
    } else {

        //encontrar info de este "usuario"
        //{ usuario: 'AntoNuevo' }
        const data = await servicio.consutlaGenerica('usuarios', us);

        if (data == "") {
            //agregar(name, user, email, password, dir, tel);
            return res.json({ msg: `Usuario ${us}, no existe` })
        } else {
            //revisar contraseña
            if (data[0].contrasena == psswd) {
                //ingresar
                const firma = process.env.jwt_Firma;
                // se arma la info para generar el token con info
                const info = { id: data[0].id, rol: data[0].rol };
                const token = jwt.sign(info, firma);
                //devolucion de token. se guardara en local storage
                return res.json({ msg: 'Log in correct', info: info, token: token })
            } else {
                //return res.json({ msg: `${psswd}, contrase incorrecta` })
                return res.json({ msg: `Usuario o contraseña incorrecta` })
            }
        }
    }

});


// Get de los productos

servidor.get('/productos', middlewere.checkJWT, async (req, res) => {
    try {
        const dat = await servicio.consutlaGenerica('productos', "");
        res.status(200).json({ dat });
    } catch (error) {
        return 'Error 400 in user/payload'
    }
})

//  {nombre: criterioFiltro}
//  formato de los usuarios
//   { "nombre": "pepe",
//     "user":"el Mujo",
//     "correo": "asi",
//     "contrasena":" amung us",
//     "dir": "dir dir 11",
//     "tel": "2222222222"
//     }

// ADMINISTRADOR - AGREGAR PRODUCTO

servidor.post('/productos/add', middlewere.middleWereAdmin, middlewere.checkJWT, async (req, res) => {
    debugger;
    const criterio = req.body.nombre;
    const nom = req.body.nombre;
    const desc = req.body.descripcion;
    const pre = req.body.precio;
    const im = req.body.imagen;

    if (criterio === undefined || criterio === null ||
        //nom === undefined || nom === null ||
        desc === undefined || desc === null ||
        pre === undefined || pre === null ||
        //dir === undefined || dir === null ||
        im === undefined || im === null
    ) {
        return res.status(500).json({ msg: '404 - Error en los datos' });
    } else {
        let busqueda = await servicio.consutlaGenerica('productos', criterio);
        // chequear si existe en la base de datos (usuario y correo)
        // pasamos los parametros de la busqueda
        if (busqueda == "") {
            const dato = await servicio.agregarGenerico('productos', {
                nombre: nom,
                descripcion: desc,
                precio: pre,
                imagen: im,
            })
            return res.status(200).json({ msg: ' creado con exito', dato });
        } else {
            return res.status(404).json({ msg: 'Producto ya existe', busqueda });
        }
    }
});

//Ejemplo de Producto

// {"nombre": "Salmon al horno",
// "descripcion":"Comenzamos preparando una cama sobre la que vamos a asar el salmón. Para ello, picamos las patatas en rodajas de medio cm de grosor, el pimiento y la cebolleta en juliana y el tomate en rodajas finas.",
// "precio": "395",
// "imagen": "https://s1.eestatic.com/2015/05/04/cocinillas/Cocinillas_30756925_116172600_1024x735.jpg",


servidor.delete('/productos/remove', middlewere.checkJWT, middlewere.middleWereAdmin, async (req, res) => {
    debugger;
    const nomb = req.body.nombre;
    if (nomb === undefined || nomb === null
    ) {
        // do something que indique error
        return res.status(500).json({ msg: '404 - Error en los datos' });
    } else {
        let busqueda = await servicio.consutlaGenerica('productos', nomb);
        if (busqueda == "") {
            return res.status(404).json({ msg: 'Este producto no existe: ', busqueda });
        } else {
            debugger;
            let quitar = await servicio.eliminarGenerico('productos', nomb);
            return res.status(200).json({ msg: 'Producto eliminado: ', busqueda });
        }
    }
});


servidor.put('/productos', middlewere.checkJWT, middlewere.middleWereAdmin, async (req, res) => {
    const nom = req.body.nombre;
    const desc = req.body.descripcion;
    const pre = req.body.precio;
    const im = req.body.imagen;
    //const firma = 'Pwd';
    //const isID = middlewere.getID(req.headers.authorization, firma);
    if (nom === undefined || nom === null ||
        desc === undefined || desc === null ||
        pre === undefined || pre === null ||
        im === undefined || im === null
    ) {
        // do something que indique error
        return res.status(500).json({ msg: '404 - Error en los datos' });
    } else {
        // buscamos genericamente el producto de ese nombre.
        //(deberia existir si o si. pero por las dudas se revisa)
        let busqueda = await servicio.consutlaGenerica('productos', nom);
        if (busqueda == "") {
            return res.status(404).json({ msg: 'Producto no existe', busqueda });
        } else {
            //se actualiza cno estos parametros
            const prodActualizado = await servicio.modificacionProductoGenerico('productos', [
                nom,
                {
                    nombre: nom,
                    descripcion: desc,
                    precio: pre,
                    imagen: im
                }
            ]);
            let busquedaActualizada = await servicio.consutlaGenerica('productos', nom);
            return res.status(200).json({ msg: 'Producto actualizado', busquedaActualizada });
        }
    }
});

//// C A R R I T T O

// Se modifica el listado de carrito, "Agregando a carrito"
// Con el nombre se buscan los datos del producto en Base de Datos y se suman a listado

servidor.put('/productos/addCarrito', middlewere.checkJWT, async (req, res) => {

    //El nombre se recibe del body
    const nom = req.body.nombre;
    //vamos a crear un array y vamos a guardar los pedidos adentro.
    let array = [];
    if (nom === undefined || nom === null) {
        return res.status(500).json({ msg: `404 - Error en los datos ${req.body.nombre}` });
    } else {

        //se busca el producto por nombre
        const productoFiltro = await servicio.consutlaGenerica('productos', nom);
        // confirmamos el id del usuario
        const codigo = req.headers.authorization;
        const firma = process.env.jwt_Firma;
        const idUsuario = middlewere.getID(codigo, firma);
        console.log(idUsuario)
        //obtenemos el id y consultamos que hay en el carrito con ese ID de usuario
        const listadoCar = await usuarios.consultarCarrito(idUsuario);
        if (listadoCar[0].carrito != '') {
            JSON.parse(listadoCar[0].carrito).forEach(element => {
                array.push(element);
            });
        }
        //sumamos los productos al array
        array.push(productoFiltro);
        let parametroCar = JSON.stringify(array);
        console.log(parametroCar)
        const prodActualizado = await usuarios.actualizarPedido(idUsuario, parametroCar);
        return res.status(200).json({ msg: 'Carrito actualizado', nom });
    }
});

// Quitar producto de carrit, se busca por nombre de producto

servidor.put('/productos/removeCarrito', middlewere.checkJWT, async (req, res) => {

    // sacamos ID de token y el producto a sacar del front.
    const codigo = req.headers.authorization;
    const firma = process.env.jwt_Firma;

    const idUsuario = middlewere.getID(codigo, firma);
    debugger;
    const nom = req.body.nombre;
    if (nom === undefined || nom === null
    ) {
        return res.status(500).json({ msg: '404 - Error en los datos' });
    } else {
        //buscar el ID del cliente
        const listadoCar = await usuarios.consultarCarrito(idUsuario);
        let array = [];

        JSON.parse(listadoCar[0].carrito).forEach(element => {
            array.push(element);
        });
        //buscamos el item entre los productos del carrito.
        const found = (element) => element.nombre == nom;
        // los eliminamos
        array.splice(found, 1);

        let parametroCar = JSON.stringify(array);
        let idCliente = idUsuario;
        //volvemos a cargar el listado correcto
        const prodActualizado = await usuarios.actualizarPedido(idCliente, parametroCar);
        return res.status(200).json({ msg: 'Item removed', prodActualizado });
    }
});

/// L I S T A D O   C A R R I T O 

// Ver listado de carrito, se valida usuario (donde se saca el dato)

servidor.post('/carrito', middlewere.checkJWT, async (req, res) => {
    debugger;
    try {
        const codigo = req.headers.authorization;
        const firma = process.env.jwt_Firma;

        const idUsuario = middlewere.getID(codigo, firma);

        const formaDePago = 'Efectivo';
        const dat2 = await usuarios.consultarCarrito(idUsuario);
        let busquedaDir = await servicio.consutlaGenerica('usuarios', idUsuario);
        if (dat2[0].carrito == "" || null) {
            res.status(200).json({ msg: 'Agrega un pedido nuevo!', dat2 });
        } else {
            let carrito = JSON.parse(dat2[0].carrito);
            let dire = busquedaDir[0].dataValues.direccion;
            //devolver lo que necesitas
            res.status(200).json({ msg: true, carrito, dire, pago: formaDePago });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: 'Error en emision de lista - resvisar datos y servidores' })
    }
})
//// t e s t

// servidor.post('/test:test', (req, res)=>{
// })

servidor.get('/time', (req, res) => {
    let time = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
    return res.json({ msg: 'test', time });
})


// P E D I D O S 

// Confirmo el pedido

servidor.post('/carrito/pedido', middlewere.checkJWT, async (req, res) => {

    //Extraemos ID de usuario
    const codigo = req.headers.authorization;
    const firma = process.env.jwt_Firma;
    const userID = middlewere.getID(codigo, firma);

    const status = 'Creado';
    const tipoPago = req.body.pago;
    let monto = 0;

    const pedido = await usuarios.consultarCarrito(userID);
    const listadoAux = JSON.parse(pedido[0].carrito);
    const listadoPedido = [];

    listadoAux.forEach(element => {
        listadoPedido.push(element[0].nombre);
        monto += element[0].precio;
    });
    console.log(monto)
    console.log(listadoAux)
    // Buscar la direccion

    const data = await servicio.consutlaGenerica('usuarios', userID);
    const dir = data[0].direccion;
    // Buscar Usuario

    // Agregaro la orden
    debugger;
    let dato = await servicio.agregarGenerico('admin', {
        //id: userID,
        estado: status,
        //hora: time,
        // busqueda
        descripcion: listadoPedido,
        pago: tipoPago,
        monto: monto,
        direccion: dir,
        usuarioID: userID
    })
    // eliminar pedido de BD
    if (dato = ! null) {
        borrarPedido = await usuarios.actualizarPedido(userID, '');
    }
    return res.status(200).json({ msg: 'Pedido creado' });

});

// Ver los pedidos hechos

servidor.get('/pedido/confirmado', middlewere.checkJWT, async (req, res) => {
    const codigo = req.headers.authorization;
    const firma = process.env.jwt_Firma;
    let pedidoDeUsuario = middlewere.getID(codigo, firma)
    const data = await servicio.consutlaGenerica('administrador', pedidoDeUsuario);

    return res.json({ msg: 'ok', data });
});

//DELETE FROM `admin` WHERE `estado` like 'creado'

// ADMINISTRADOR MIRA LISTA DE PEDIDOS COMPLETA 

servidor.get('/pedido', middlewere.checkJWT, middlewere.middleWereAdmin, async (req, res) => {
    
    try {
        const data = await servicio.consutlaGenerica('administrador', "");
        return res.json({ msg: 'Ok', data });
    } catch (error) {
        console.error(error);
        return { msg: 'Not admin' }
    }
});



//middlewere.checkJWT, middlewere.middleWereAdmin,
// administrador debe poder cambiar el estado del pedido

servidor.post('/pedido/estado', middlewere.checkJWT, middlewere.middleWereAdmin, async (req, res) => {
    const codigo = req.headers.authorization;
    const firma = process.env.jwt_Firma;
    const id = middlewere.getID(codigo, firma);
    const status = req.body.estado;
    const idPedido = req.body.idPed;

    if (firma === undefined || firma === null ||
        id === undefined || id === null ||
        status === undefined || status === null
    ) {
        return res.status(500).json({ msg: '404 - Error en los datos' });
    } else {
        const data = await servicio.consutlaGenerica('administrador', idPedido);
        // Buscar Usuario
        let estadoActualizado = await admin.modificarEstado(status, idPedido);
        if (estadoActualizado[0] == 0) {
            return res.status(200).json({ msg: 'No se realizaron cambios' });
        } else {
            console.log(estadoActualizado)
            return res.status(200).json({ msg: 'Pedido Actualizado' });
        }
    }
});



servidor.listen(PORT, () => { console.log(PORT) })





