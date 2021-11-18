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

// registrar usuario
servidor.get('/hola', middlewere.checkJWT, (req, res) => {
    return res.json({ msg: 'Correct' });
})


//middlewere.checkJWT,
servidor.post('/registrarse', middlewere.checkJWT, async (req, res) => {
    console.log("hola");

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
        // do something 
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
                telefono: tel
            })
            return res.status(200).json({ msg: 'Register correct', user });
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
        //console.log(data);
        if (data == "") {
            //agregar(name, user, email, password, dir, tel);
            return res.json({ msg: `Usuario ${us}, no existe` })
        } else {
            //revisar contraseña
            if (data[0].contrasena == psswd) {
                //ingresar
                const firma = process.env.jwt_Firma;
                const info = { id: data[0].id, rol: data[0].rol };
                //console.log(info);
                const token = jwt.sign(info, firma);
                return res.json({ msg: 'Log in correct', info: info, token: token })
            } else {
                return res.json({ msg: `${psswd}, contrase incorrecta` })
            }
        }
    }

});

try {
    // nonExistentFunction();
} catch (error) {
    console.error(error);
    // expected output: ReferenceError: nonExistentFunction is not defined
    // Note - error messages will vary depending on browser
}


// Get de los productos
//middlewere.checkJWT,
servidor.get('/productos', middlewere.checkJWT, async (req, res) => {
    try{
    const dat = await servicio.consutlaGenerica('productos', "");
    res.status(200).json({ dat });
    } catch(error){
        return 'Error 400 in user/payload'
    }
})

servidor.post('/productosTest', middlewere.checkJWT, async (req, res) => {
    //debugger;
    console.log(req.body);
    const datTest = await servicio.consutlaGenerica('productos', { nombre: req.body.nombre });
    res.json({ datTest });
})


//{nombre: criterioFiltro}

// { "nombre": "pepe",
//     "user":"el Mujo",
//     "correo": "asi",
//     "contrasena":" amung us",
//     "dir": "dir dir 11",
//     "tel": "2222222222"
//     }

// ADMINISTRADOR - AGREGAR PRODUCTO
//middlewere.middleWereAdmin, middlewere.checkJWT,
servidor.post('/productos/add', middlewere.middleWereAdmin, middlewere.checkJWT, async (req, res) => {
    debugger;
    const criterio = req.body.nombre;
    //const criterio = { nombre: req.body.nombre };
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
        // do something que indique error
        return res.status(500).json({ msg: '404 - Error en los datos' });
    } else {
        let busqueda = await servicio.consutlaGenerica('productos', criterio);
        // chequear si existe en la base de datos (usuario y correo)
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

//EJEMPLO

// {    "nombre": "Salmon al horno",
// "descripcion":"Comenzamos preparando una cama sobre la que vamos a asar el salmón. Para ello, picamos las patatas en rodajas de medio cm de grosor, el pimiento y la cebolleta en juliana y el tomate en rodajas finas.",
// "precio": "395",
// "imagen": "https://s1.eestatic.com/2015/05/04/cocinillas/Cocinillas_30756925_116172600_1024x735.jpg",
// "admin": "true"
// }
//, middlewere.checkJWT, middlewere.middleWereAdmin

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
        debugger;
        let busqueda = await servicio.consutlaGenerica('productos', nom);
        if (busqueda == "") {
            return res.status(404).json({ msg: 'Producto no existe', busqueda });
        } else {
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
            //console.log(prodActualizado);
            return res.status(200).json({ msg: 'Producto actualizado', busquedaActualizada });
        }
    }

});



//// C A R R I T T O

// Se modifica el listado de carrito, "Agregando a carrito"
// Con el nombre se buscan los datos del producto en Base de Datos y se suman a listado

servidor.put('/productos/addCarrito', middlewere.checkJWT, async (req, res) => {

    debugger;
    //se debe ingresar un imput simulando el "producto" en cuestion
    //el Id se recibe de payload
    const nom = req.body.nombre;
    //const price = req.body.precio;
    let array = [];
    if (nom === undefined || nom === null

    ) {
        // do something 
        return res.status(500).json({ msg: '404 - Error en los datos' });
    } else {
        const productoFiltro = await servicio.consutlaGenerica('productos', nom );
        console.log(productoFiltro);
        //buscar el ID del cliente
        const codigo = req.headers.authorization;
        const firma = process.env.jwt_Firma;
        console.log('datos codigo', codigo, firma)
        const idUsuario = middlewere.getID(codigo, firma);

        console.log(idUsuario)

        const listadoCar = await usuarios.consultarCarrito(idUsuario);
        if (listadoCar[0].carrito != '') {

            JSON.parse(listadoCar[0].carrito).forEach(element => {
                array.push(element);
            });
        }
        console.log('array', array);
        array.push(productoFiltro);
        //console.log();
        let parametroCar = JSON.stringify(array);
        console.log(parametroCar)
        //let idCliente = req.body.idUsuario;

        //const prodActualizado = await usuarios.actualizarPedido(idCliente, parametroCar);
        const prodActualizado = await usuarios.actualizarPedido(idUsuario, parametroCar);
        return res.status(200).json({ msg: 'Carrito actualizado' , nom});
    }
});

// Quitar producto de carrit, se busca por nombre de producto

servidor.put('/productos/removeCarrito', middlewere.checkJWT, async (req, res) => {
    //se debe ingresar un imput simulando el "producto" en cuestion
    //el Id se recibe de payload
    const codigo = req.headers.authorization;
    const firma = process.env.jwt_Firma;

    const idUsuario = middlewere.getID(codigo, firma);
    debugger;
    const nom = req.body.nombre;
    if (nom === undefined || nom === null
    ) {
        // do something 
        return res.status(500).json({ msg: '404 - Error en los datos' });
    } else {
        //buscar el ID del cliente
        const listadoCar = await usuarios.consultarCarrito(idUsuario);
        let array = [];
        console.log(listadoCar[0].carrito)

        JSON.parse(listadoCar[0].carrito).forEach(element => {
            array.push(element);

        });

        console.log(array);

        const found = array.findIndex(element => element.nombre == nom);
        console.log(found);
        array.splice(found, 1);
        //array.push({ nombre: nom });
        console.log(array);
        let parametroCar = JSON.stringify(array);
        let idCliente = idUsuario;
        const prodActualizado = await usuarios.actualizarPedido(idCliente, parametroCar);
        return res.status(200).json({ msg: 'Item removed', prodActualizado });
    }
});



/// L I S T A D O   C A R R I T O 

// Ver listado de carrito, se valida usuario (donde se saca el dato)

servidor.post('/carrito', middlewere.checkJWT, async (req, res) => {
    debugger;
    const codigo = req.headers.authorization;
    const firma = process.env.jwt_Firma;

    const idUsuario = middlewere.getID(codigo, firma);

    const formaDePago = req.body.pago;
    //Hacer algo con la respuesta que indique ademas si es admin el id
    //suponemos idCliente = lo ingresamos manualmente
    //console.log(req.body.id);
    const dat2 = await usuarios.consultarCarrito(idUsuario);
    let busquedaDir = await servicio.consutlaGenerica('usuarios', idUsuario);
    console.log(busquedaDir[0].dataValues.direccion);
    console.log(dat2[0].carrito);

    if (dat2 == "") {
        res.status(200).json({ msg: 'Agrega tu primer item!', dat2 });
    } else {
        let test = JSON.parse(dat2[0].carrito);
        let dire = busquedaDir[0].dataValues.direccion;
        //devolver lo que necesitas
        res.status(200).json({ test, dire, pago: formaDePago });
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
    const codigo = req.headers.authorization;
    const firma = process.env.jwt_Firma;
    const userID = middlewere.getID(codigo, firma);
    //const userID = req.body.idUsuario;
    const status = 'Creado';
    const tipoPago = req.body.pago;
    let monto = 0;
    //const timestamp = req.body.hora;
    //let time = new Date();
    //time = moment().format("DD/MM/YYYY h:mm:ss", );
    //console.log(time);
    // chequear si existe en la base de datos (usuario y correo)
    // Buscar / Guardar el pedido
    const pedido = await usuarios.consultarCarrito(userID);
    const listadoAux = JSON.parse(pedido[0].carrito);
    const listadoPedido = [];
    listadoAux.forEach(element => {
        listadoPedido.push(element[0].nombre);
        monto += element[0].precio;
    });

    // Buscar la direccion

    const data = await servicio.consutlaGenerica('usuarios', userID);
    //console.log(data);
    const dir = data[0].direccion;
    // Buscar Usuario
    const user = data[0].usuario;

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
        usuario: user
    })
    // eliminar pedido de BD
    if (dato = ! null) {
        borrarPedido = await usuarios.actualizarPedido(userID, '');
    }

    //console.log(dato);
    return res.status(200).json({ msg: 'Pedido creado' });

});

//DELETE FROM `admin` WHERE `estado` like 'creado'

// ADMINISTRADOR MIRA LISTA DE PEDIDOS COMPLETA 

servidor.get('/pedido', middlewere.checkJWT, middlewere.middleWereAdmin, async (req, res) => {
    //debugger;
    
    const data = await servicio.consutlaGenerica('administrador');
    return res.json({ msg: 'ok', data });
});



//middlewere.checkJWT, middlewere.middleWereAdmin,
// administrador debe poder cambiar el estado del pedido

servidor.post('/pedido/estado', middlewere.checkJWT, middlewere.middleWereAdmin, async (req, res) => {
    const codigo = req.headers.authorization;
    const firma = process.env.jwt_Firma;

    const id = middlewere.getID(codigo, firma);
    //const id = req.body.idUsuario;
    const status = req.body.estado;
    if (codigo === undefined || codigo === null ||
        name === undefined || name === null ||
        firma === undefined || firma === null ||
        id === undefined || id === null ||
        status === undefined || status === null
    ) {
        // do something que indique error
        return res.status(500).json({ msg: '404 - Error en los datos' });
    } else {
        const data = await servicio.consutlaGenerica('usuarios', id);
        // Buscar Usuario
        const user = data[0].usuario;
        console.log(user);
        console.log(status);

        let estadoActualizado = await admin.modificarEstado(status, user);
        return res.status(200).json({ msg: 'Pedido Actualizado' });
    }
});



servidor.listen(PORT, () => { console.log(PORT) })





