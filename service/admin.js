const { Sequelize, DataTypes, Op } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

// Conect to data base

const sequelize = new Sequelize(process.env.db_name, process.env.db_USUARIO, process.env.db_CONTRASE,
    {
        host: process.env.db_host,
        dialect: process.env.db_DIALECT,
        port: process.env.db_PORT,
        timezone: process.env.db_TIMEZONE,
        define: {
            timestamps: false
        }
    });


    // Create admin table - this is used to manage "pedidos"

const Pro = sequelize.define('admin', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        timestamps: false
    },
    estado: {
        type: DataTypes.STRING(50),
        allowNull: false,
        timestamps: false
    },
    hora: {
        type: DataTypes.DATE(50),
        allowNull: false,
        timestamps: true,
        timezone: '+08:00',

        defaultValue: sequelize.literal('CURRENT_TIMESTAMP()')
        // get() {
        //     return moment(this.getDataValue('hora')).format('DD/MM/YYYY h:mm:ss');
        // }
    },
    //     createdAt: {
    //         type: DataType.DATE,
    // //note here this is the guy that you are looking for                   
    //       get() {
    //             return moment(this.getDataValue('createdAt')).format('DD/MM/YYYY h:mm:ss');
    //         }
    //     },
    descripcion: {
        type: DataTypes.INTEGER(50),
        allowNull: false,
        timestamps: false
    },
    pago: {
        type: DataTypes.STRING(400),
        allowNull: false,
        timestamps: false
    },
    monto: {
        type: DataTypes.INTEGER(400),
        allowNull: false,
        timestamps: false
    },
    usuario: {
        type: DataTypes.STRING(400),
        allowNull: false,
        timestamps: false
    },
    direccion: {
        type: DataTypes.STRING(400),
        allowNull: false,
        timestamps: false
    }
},
    // timestamps: false},
    { freezeTableName: true }
);


// consultas tabla admin

async function consultaAdmin(criterioFiltro) {
    console.log(criterioFiltro)
    //console.log(Pro.id)
    if (criterioFiltro == "" || null ) {
        const datos = await Pro.findAll({
            //attributes: arrayAttributosProductos
        })
        //console.log(datos);
        return datos;
    } else {
        const datos = await Pro.findAll({
            //where: {nombre: criterioFiltro},
            where: {id: criterioFiltro},
        });
        console.log(datos)
        return datos;
    }
}

//--------



//--------


// agregar un pedido en Admin
async function agregarPedido(param) {
    debugger;
    const crear = await Pro.create(param);
    debugger;
}

// modificar el estado de un pedido de tabla Admin

async function modificarEstado(status, id) {
    //[{atributo: modificacion}, {condicion: fieldRequired}]
    //let condicion = param[0];   
    //let atributo = param[1];

    const modificar = await Pro.update(
        { estado: status }
        , {
            where: { id: id }
        });
    return modificar
    //return modificar
}

module.exports = {
    //actualizarPedido,
    // consultarCarrito,
    //consutltaUsuarios,
    agregarPedido,
    modificarEstado,
    consultaAdmin
    // modificarUsuarios,
    // consultarFav,
    //agregarFav
}

