let user = document.querySelector('#user');
let contrasena = document.querySelector('#password')
let submitLogin = document.querySelector('#submitLogin')
let formSpace = document.querySelector('#loginForm')
let testeo = document.querySelector('#testeo')
let middleJWTtest = document.querySelector('#jwtTesting')

//user.value = 'lucas'
//contrasena.value = '123456'
//console.log(user, 'this is empty?')
//let a = user.value
//let b = contrasena.value
//alert(lookUp.usuario + lookUp.contrasena)
//alert(b)

// submitLogin.addEventListener('click', (e) => {
//     e.preventDefault()

//     // alert('worked prev')
//     fetch(`http://localhost:3000/productos`)
//         .then(function (response) {
//             //formSpace.innerHTML = `${response}`

//             let data = response.json();

//             return data
//             //alert('worked inside')
//         }).then(function (data) {
//             //formSpace.innerHTML = `So far, so good`
//             //formSpace.innerHTML += `${data.dat[0].nombre} <br>`

//             data.dat.forEach(element => {
//                 formSpace.innerHTML += `${element.nombre} <br>`
//             });
//             //testeo.innerHTML = `${Object.keys(data.dat[0])}`
//         })
//     // alert('succes :)')
// });

// middleJWTtest.addEventListener('click', async (e) => {
//     e.preventDefault()
//     // alert('ehy1')
//     const rawResponse = await fetch(`http://localhost:3000/hola`,{
//         method: "GET",
//         headers: {
//             Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTEsInJvbCI6ImFkbWluIiwiaWF0IjoxNjM3MTc1NTIxfQ.zs23gE2zCmPxGBuzqa1PSwfd7zd4_0wFl3XpJ-trWFQ",
//             //Content-Type: "application/json",
//         }

//     });
//     //alert('ehy2')
//     const data = await rawResponse.json();

//     alert(Object.keys(data.msg[2]));
//     testeo.innerHTML = `${data.msg}`
//     console.log(data)
// });

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
//let loginSearch = 

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


