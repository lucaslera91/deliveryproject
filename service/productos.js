const { Sequelize, DataTypes, Op } = require('sequelize');

const dotenv = require('dotenv');
dotenv.config();


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
  
const Pro = sequelize.define('productos', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    precio: {
        type: DataTypes.INTEGER(50),
        allowNull: false,
    },
    imagen: {
        type: DataTypes.STRING(400),
        allowNull: false,
    },

    timestamps: false

});

let arrayAttributosProductos = [
    'id',
    'nombre',
    'descripcion',
    'precio',
    'imagen'
];



async function consutltaProducto(criterioFiltro) {
    //console.log('hola');
    if (criterioFiltro == "") {
        const datos = await Pro.findAll({
            attributes: arrayAttributosProductos
        })
        //console.log(datos);

        return datos;
    } else {
        const datos = await Pro.findAll({
            //where: {nombre: criterioFiltro},
            where:
                criterioFiltro
            ,
            attributes: arrayAttributosProductos
        });
        //console.log(datos);

        return datos;
    }
}

// where: {
//     [Op.or]: [
//         {nombre: "Ensalada"},
//         {nombre: "Sushi"}
//     ]
// },


async function agregarProducto(param) {
    debugger;
    const crear = await Pro.create(param);
    return { msg: `${crear}, fue creado` }
}

async function eliminarProducto(param) {
    debugger;
    const eliminar = await Pro.destroy({
        where: { nombre: param }
    });
    debugger;
}

async function modificarProductos(param) {
    //[{atributo: modificacion}, {condicion: fieldRequired}]
    let condicion = param[0].nombre;
    let atributo = param[1];
    console.log(condicion);

    const modificar = await Pro.update(
        atributo
        , {
            where: {nombre: condicion}
        });
    
    return modificar
}

module.exports = {
    consutltaProducto,
    agregarProducto,
    modificarProductos,
    eliminarProducto
}