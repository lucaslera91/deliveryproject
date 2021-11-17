let user = document.querySelector('user');
let contrasena = document.querySelector('password')
let submitLogin = document.querySelector('submitLogin')

submitLogin.addEventListener('click', (e) => {
    //e.preventDefault()
    alert(user.value)
    console.log(user.value)
    alert(contrasena.value)
})



