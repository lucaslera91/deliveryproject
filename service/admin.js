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
    }},

    // timestamps: false},

    {freezeTableName: true}

);

async function consultaAdmin(){

    const datos = await Pro.findAll({
        
    });

    return datos;
}


async function agregarPedido(param) {
    debugger;
    const crear = await Pro.create(param);
    debugger;
}
async function modificarEstado(status, usuario) {
          //[{atributo: modificacion}, {condicion: fieldRequired}]
        //let condicion = param[0];   
        //let atributo = param[1];
    
        const modificar = await Pro.update(
            {estado: status}
            , {
                where: {usuario: usuario}
            });
        return modificar
        //return modificar
}

module.exports  = {
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

