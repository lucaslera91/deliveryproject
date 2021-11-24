const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const firma = process.env.jwt_Firma;
dotenv.config();

// genero Token de seguridad JWT

function generarJWT(param) {
    //formato de info: const info = { nombre: 'Manu', usuarioID: '5' };
    const info = param;
    const token = jwt.sign(info, firma);
    return token;
}

// Revision de MiddleWere para Admin

function middleWereAdmin(req, res, next) {
    //
    const codigo = req.headers.authorization;
    const firma = process.env.jwt_Firma;
    const userRol = getRol(codigo, firma);
    //
    const permitions = req.body.permitions  || userRol;
    if (adminCheck(permitions)) {
        next();
    } else {
        return res.json({ msg: 'Not admin' });
    }
}

// funcion revision de Administrador

function adminCheck(parametro) {
    try{
    if (parametro == 'admin') {
        return true;
    } else {
        return false;
    } 
    } catch (err) {
        return res.status(400).send('Error 400. Error en el Usuario. token no ok');
    };
}
//function genToken() {
    // const token = jwt.sign(info, firma);
    // const info = { nombre: 'Manu', usuarioID: '5' };

//}

// Checkeo de JWT

const checkJWT = (req, res, next) => {
    try {
        const codigo = req.headers.authorization;
        const token = codigo.slice(7, codigo.length);
        const verifyJWT = jwt.verify(token, firma);
        next();
    } catch (err) {
        return res.status(400).send('Error 400. Error en el Usuario. token no ok');
    };
}

// Get ID para el payload

function getID(codigo, firma) {
    try{

    const tok = codigo.slice(7, codigo.length)
    const getIDdeToken = jwt.verify(tok, firma);

    const userID = getIDdeToken.id;
    console.log(getIDdeToken);
    return userID;

    }catch (err) {
        return res.status(400).send('Error 400. Error en el Usuario. token no ok');
    };
}
// Get Rol

function getRol(codigo, firma) {
    const tok = codigo.slice(7, codigo.length)
    const getIDdeToken = jwt.verify(tok, firma);

    const userRol = getIDdeToken.rol;
    console.log(userRol);
    return userRol;
}


module.exports = {
    checkJWT,
    middleWereAdmin,
    getID,
    generarJWT,
    getRol
}