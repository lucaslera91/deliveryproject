let user = document.querySelector('#user');
let contrasena = document.querySelector('#password')
let submitLogin = document.querySelector('#submitLogin')
let formSpace = document.querySelector('#loginForm')
let testeo = document.querySelector('#testeo')
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

//
// registerUser.value = 'fer'
// registerPassword.value = 123452345
// registerNombre.value = 'Fer'
// registerCorreo.value = 'fer@gmail.com'
// registerDireccion.value = 'dire fer 4563'
// registerTelefono.value = 975245761

///



///

middleJWTtest.addEventListener('click', async (e) => {
    e.preventDefault()
    // alert('ehy1')
    fetch(`http://localhost:3000/productos`, {
        method: "GET",
        headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTEsInJvbCI6ImFkbWluIiwiaWF0IjoxNjM3MTc1NTIxfQ.zs23gE2zCmPxGBuzqa1PSwfd7zd4_0wFl3XpJ-trWFQ",
            //Content-Type: "application/json",
        }
    }).then(function (rawResponse) {
        //alert('ehy2')
        console.log(rawResponse)
        const data = rawResponse.json();
        console.log(data)
        return data
    }).then(function (data) {
        //alert(Object.keys(data.msg[2]));
        data.dat.forEach(element => {
            testeo.innerHTML +=
                `
            <h3>${element.nombre}</h3>
            <img src="${element.imagen}" alt=""> <br>
            `


        });
        // testeo.innerHTML = `${data} <br>`
    })
});


// Evento para el log in. Guarda token en local storage.

submitLogin.addEventListener('click', async (e) => {
    let lookUp = { usuario: user.value, contrasena: contrasena.value }

    e.preventDefault()
    fetch(`http://localhost:3000/login`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            //Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTEsInJvbCI6ImFkbWluIiwiaWF0IjoxNjM3MTc1NTIxfQ.zs23gE2zCmPxGBuzqa1PSwfd7zd4_0wFl3XpJ-trWFQ",
            //Content-Type: "application/json",
        },
        body: JSON.stringify(lookUp)
    }).then(function (rawResponse) {
        //alert('ehy2')
        console.log(rawResponse)
        const data = rawResponse.json();
        console.log(data)
        return data
    }).then(function (data) {
        //alert(Object.keys(data.msg[2]));


        localStorage.setItem('token', (data.token || data.msg))
        if (data.token){
            testeo.innerHTML = `Log in exitoso, to token JWT es: ${localStorage.getItem('token')} <br>`
        }else{
            testeo.innerHTML = `${localStorage.getItem('token')} <br>`
        }
    });
    // testeo.innerHTML = `${data} <br>`
});

// Evento para registrarse

registerButton.addEventListener('click', async (e) => {
    e.preventDefault()
    let registerInfo = {
        user: registerUser.value,
        nombre: registerNombre.value,
        tel: registerTelefono.value,
        dir: registerDireccion.value,
        contrasena: registerPassword.value,
        correo: registerCorreo.value
    }
    //alert('works')
    fetch(`http://localhost:3000/registrarse`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            //Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTEsInJvbCI6ImFkbWluIiwiaWF0IjoxNjM3MTc1NTIxfQ.zs23gE2zCmPxGBuzqa1PSwfd7zd4_0wFl3XpJ-trWFQ",
            //Content-Type: "application/json",
        },
        body: JSON.stringify(registerInfo)
    }).then(function (rawResponse) {
        //alert('ehy2')
        console.log(rawResponse)
        const data = rawResponse.json();
        console.log(data)
        return data
    }).then(function (data) {
       // alert(data.msg)
        if(data.msg === 'Register correct'){
            alert('wordks')
            window.location.href="../index.html"
        }
    });
});





// const user = req.body.user;
// const name = req.body.nombre;
// const email = req.body.correo;
// const tel = req.body.tel;
// const dir = req.body.dir;
// const password = req.body.contrasena;

