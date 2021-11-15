const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const firma = process.env.jwt_Firma;
// const firma = process.env.jwt_Firma;
// const info = { nombre: 'Manu', usuarioID: '5' };
// const token = jwt.sign(info, firma);
// const decod = jwt.verify(token, firma);
dotenv.config();

function generarJWT(param) {
    
    //const info = { nombre: 'Manu', usuarioID: '5' };
    const info = param;
    const token = jwt.sign(info, firma);


    return token;
}


function middleWereAdmin(req, res, next) {

    const permitions = req.body.permitions;
    if (adminCheck(permitions) == true) {
        next();
    } else {
        return res.json({ msg: 'Not admin' });
    }
}
function adminCheck(parametro) {
    if (parametro == 'admin') {
        return true;
    } else {
        return false;
    }
}
function genToken() {
    // const token = jwt.sign(info, firma);
    // const info = { nombre: 'Manu', usuarioID: '5' };

}


const checkJWT = (req, res, next) => {
    debugger;
    
    
    try {
        const codigo = req.headers.authorization;
        const token = codigo.slice(7, codigo.length);
       // console.log(token);
        const verifyJWT = jwt.verify(token, firma);
        ///console.log(firma);
        //console.log(verifyJWT);
        next();
    } catch (err) {
        return res.status(400).send('Error 400. Error en el Usuario. token no ok');

    };
}

function getID(codigo, firma) {
    const tok = codigo.slice(7, codigo.length)
    const getIDdeToken = jwt.verify(tok, firma);
    const userID = getIDdeToken.usuarioID;
    console.log(getIDdeToken);


    //console.log(req.user);
    //console.log('hola');
    return userID;
}


module.exports = {
    checkJWT,
    middleWereAdmin,
    getID,
    generarJWT
}