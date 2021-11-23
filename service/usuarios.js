
const productos = require('./productos');

const { Sequelize, DataTypes, Op } = require('sequelize');

const dotenv = require('dotenv');
dotenv.config();

// Creamos base de datos

const sequelize = new Sequelize(process.env.db_name, process.env.db_USUARIO, process.env.db_CONTRASE,
    {
        host: process.env.db_host,
        dialect: process.env.db_DIALECT,
        port: process.env.db_PORT,
        // dialectOptions: {
        //     useUTC: false,
        // },
        timezone: process.env.db_TIMEZONE,

        define: {
            timestamps: false
        }
    });

    // Creamos una tabla usuarios

const Pro = sequelize.define('usuarios', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nombre_apellido: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    usuario: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    correo: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    contrasena: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    direccion: {
        type: DataTypes.STRING(400),
        allowNull: false,
    },
    telefono: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    rol: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    favoritos: {
        type: DataTypes.STRING(400),
        allowNull: false,
    },
    carrito: {
        type: DataTypes.STRING(3000),
        allowNull: false,
    },
    timestamps: false

});

// Este es un array con todos los atributos de los usuarios para la tabla usuarios

let arrayAttributosUsuarios = [
    'id',
    'nombre_apellido',
    'usuario',
    'correo',
    'contrasena',
    'direccion',
    'telefono',
    'rol',
    'favoritos',
    'carrito'];


// Consultamos los usuarios en funcion a los parametros

async function consutltaUsuarios(criterioFiltro) {
    //console.log("hola2");
    //console.log('hola');
    
        if (criterioFiltro == "") {
            const datos = await Pro.findAll({
                attributes: arrayAttributosUsuarios
            })
            //console.log(datos);

            return datos;
        } else {
            const datos = await Pro.findAll({
                where: {
                    [Op.or]: [{ usuario: criterioFiltro },
                    { id: criterioFiltro }]
                },
                attributes: arrayAttributosUsuarios
            });
            return datos;
        }
    } 


// where: {
//     [Op.or]: [{authorId: 12}, {authorId: 13}]
//   }
// let a =  consutltaUsuarios({usuario: `Anto`});



// Agregamos usuario con dichos parametros

async function agregarUsuarios(param) {
    const crear = await Pro.create(param);
}

// Modificamos usuarios segun parametros

async function modificarUsuarios(param) {
    //[{atributo: modificacion}, {condicion: fieldRequired}]
    let atributo = param[0];
    let condicion = param[1];

    const modificar = await Pro.update(
        atributo
        , {
            where: condicion
        });
    return modificar
}

// consultamos si son Favoritos

async function consultarFav(identification) {
    const listaFav = await Pro.findAll({
        where: { id: identification },
        attributes: ['favoritos']
    });
    return listaFav
}

// Agregamos a la lista de favoritos, cliente y parametros

async function agregarFav(idCliente, parametro) {
    //let atributo = param[0];
    //let condicion = param[1];

    const modificar = await Pro.update(
        { favoritos: parametro }
        , {
            where: { id: idCliente }
        });
    return modificar
}



//// C A R R I T O 

// Consutlamos al carrito en funcion del ID de usuario

async function consultarCarrito(identification) {
    const listaFav = await Pro.findAll({
        where: { id: identification },
        attributes: ['carrito']
    });
    return listaFav
}

// actualizamos el pedido en funcion del Id del cliente y 
//parametros del pedido (se actualizan parametros completos)


async function actualizarPedido(idCliente, parametro) {
    //let atributo = param[0];
    //let condicion = param[1];
    const modificar = await Pro.update(
        { carrito: parametro }
        , {
            where: { id: idCliente }
        });
    return modificar
}

module.exports = {
    actualizarPedido,
    consultarCarrito,
    consutltaUsuarios,
    agregarUsuarios,
    modificarUsuarios,
    consultarFav,
    agregarFav
}