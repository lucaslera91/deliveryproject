let user = document.querySelector('#user');
let contrasena = document.querySelector('#password')
let submitLogin = document.querySelector('#submitLogin')
let formSpace = document.querySelector('#loginForm')
//let productos = document.querySelector('#productScreen')
let middleJWTtest = document.querySelector('#jwtTesting')
let registerButton = document.querySelector('#registerSubmit')
let registerPage = document.querySelector('#register')

// botones de registro

let registerUser = document.querySelector('#userRegister')
let registerPassword = document.querySelector('#passwordRegister')
let registerNombre = document.querySelector('#nombreRegister')
let registerCorreo = document.querySelector('#correoRegister')
let registerDireccion = document.querySelector('#direccionRegister')
let registerTelefono = document.querySelector('#telefonoRegister')

// Validamos los datos en el registro (que esten completos al menos)


function validarContenido(slot, validar){
    let ok = true
    if (validar == ""){
        return alert("Debe completar el campo " + slot)
    }
    return ok 
}

function validarLogIn(){
    if(validarContenido('User', user.value) &&
    validarContenido('Password', contrasena.value))
    {
        return true
    } else {
        return false
    }

}

function validarRegistro(){
    if(validarContenido('User', registerUser.value) &&
    validarContenido('Password', registerPassword.value) &&
    validarContenido('Nombre', registerNombre.value) && 
    validarContenido('Corre', registerCorreo.value) && 
    validarContenido('Direccion', registerDireccion.value ) && 
    validarContenido('Telefono', registerTelefono.value)
    ){
        return true
    }else{
        return false
    }
}

// Evento para el log in. Guarda token en local storage.

submitLogin.addEventListener('click', async (e) => {

    if(validarLogIn()){
        e.preventDefault()
    let lookUp = { usuario: user.value, contrasena: contrasena.value }
    fetch(`http://localhost:3000/login`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            //Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTEsInJvbCI6ImFkbWluIiwiaWF0IjoxNjM3MTc1NTIxfQ.zs23gE2zCmPxGBuzqa1PSwfd7zd4_0wFl3XpJ-trWFQ",
        },
        body: JSON.stringify(lookUp)
    }).then(function (rawResponse) {
        const data = rawResponse.json();
        return data
    }).then(function (data) {
        localStorage.setItem('token', (data.token || data.msg))
        if (data.token) {
            window.location.href = "../homePage.html"
        } else {
            alert(data.msg)
        }
    })
        .catch(error => {
            console.error(error)
            alert('Sin conexion a servidores')
        })
    }

    
});

// Evento para registrarse. 

registerButton.addEventListener('click', async (e) => {

    if (validarRegistro()){
        e.preventDefault()
        let registerInfo = {
        user: registerUser.value,
        nombre: registerNombre.value,
        tel: registerTelefono.value,
        dir: registerDireccion.value,
        contrasena: registerPassword.value,
        correo: registerCorreo.value
    }
    fetch(`http://localhost:3000/registrarse`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            //Otro usuarui:  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTEsInJvbCI6ImFkbWluIiwiaWF0IjoxNjM3NzAxMDk4fQ.fLAY5wppuK_ErtFGn2cd_7oogdtK9wfAWq3f2kLaw4w
            //Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTEsInJvbCI6ImFkbWluIiwiaWF0IjoxNjM3MTc1NTIxfQ.zs23gE2zCmPxGBuzqa1PSwfd7zd4_0wFl3XpJ-trWFQ",
        },
        body: JSON.stringify(registerInfo)
    }).then(function (rawResponse) {
        const data = rawResponse.json();
        return data
    }).then(function (data) {
        if (data.msg === 'Register correct') {
            window.location.href = "../index.html"
        }
    });
    }
    
});

