
//const { Sequelize, DataTypes } = require('sequelize');
const usuarioJS = require('../service/usuarios');
const { Sequelize, DataTypes } = require('sequelize');
const productosJS = require('../service/productos');
const adminJS = require('./admin');



// consulta generica

async function consutlaGenerica(tabla, filtro) {
    debugger;
    let resultado;
    let a = 'a';
    switch (tabla) {
        case 'usuarios': resultado = await usuarioJS.consutltaUsuarios(filtro); break;
        case 'productos': resultado = await productosJS.consutltaProducto(filtro); break;
        case 'administrador': resultado = await adminJS.consultaAdmin(filtro); break;
        //default: () => { }; break;
        default: () => { a = 'b' }; break;
    }
 
    return resultado;
}

// Agregar generico

async function agregarGenerico(tabla, parametros) {
    let resultado;
    switch (tabla) {
        case 'usuarios': resultado = await usuarioJS.agregarUsuarios(parametros); break;
        case 'productos': resultado = await productosJS.agregarProducto(parametros); break;
        case 'admin': resultado = await adminJS.agregarPedido(parametros); break;
        default: () => { }; break;
    }
    debugger;
    return resultado;
}
//modificar generico

async function modificacionProductoGenerico(tabla, parametros) {
    
    let resultado;
    switch (tabla) {
        case 'usuarios': resultado = await usuarioJS.modificarUsuarios(parametros); break;
        case 'productos': resultado = await productosJS.modificarProductos(parametros); break;
        case 'administrador': () => { }; break;
        default: () => { }; break;
    }
    //console.log(resultado);
    return resultado;
}

// Elimino generico

async function eliminarGenerico(tabla, parametros) {
    let resultado;
    switch (tabla) {
        //case 'usuarios': resultado = await usuarioJS.Usuarios(parametros); break;
        case 'productos': resultado = await productosJS.eliminarProducto(parametros); break;
        case 'usuarios': resultado = await usuarioJS.eliminarUsuarios(parametros); break;
        default: () => { }; break;
    }
    //console.log(resultado);
    debugger;
    return resultado;
}



module.exports = {
    //modificarUsuarios,
    //agregarUsuarios,
    consutlaGenerica,
    //consutltaAdmin,
    agregarGenerico,
    modificacionProductoGenerico,
    eliminarGenerico
}