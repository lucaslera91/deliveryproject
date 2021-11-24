// import {getTokenFunction} from '../Front/functions'

//const { getToken } = require("./functions")
let lineaPedidosAdmin = document.querySelector('#listaPedidosAdmin')

window.onload = function () {
    carritoShow()
    getPedidos()
    chekAdminToken()
}

let pantallaCarrito = document.querySelector('#pantallaCarrito')
let verResumen = document.querySelector('#resumen')
let checkOutButton = document.querySelector('#checkOut')
let espacioPedidos = document.querySelector('#pantallaPedidos')

// let tokenData = getTokenFunction()
// alert(tokenData)
checkOutButton.addEventListener('click', confirmarPedido)

async function carritoShow() {
    let total = 0
    let aux = ""
    //alert(token)
    fetch(`http://localhost:3000/carrito`, {
        method: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
            //Content-Type: "application/json",
        }
    }).then(function (rawResponse) {
        console.log(rawResponse)
        const data = rawResponse.json();
        console.log(data)
        return data
    }).then(function (data) {
        if (data.msg == true) {
            let arrayAux = data.carrito
            let color = true
            for (let index = 0; index < arrayAux.length; index++) {
                const element = arrayAux[index];
                total += element[0].precio;

                color ? backGroudColor = 'rgb(212, 212, 212, 0.3)' : backGroudColor = 'rgb(212, 212, 212, 0,7)'

                // if (color) {
                //     backGroudColor = 'rgb(212, 212, 212, 0.1)'
                // } else {
                //     backGroudColor = 'rgb(212, 212, 212, 0,4)'
                // }

                pantallaCarrito.innerHTML +=`
                    <div class="col-12" style="background-color: ${backGroudColor};">${element[0].nombre}</div>
                    <div class="container">
                        <div class="row" id="box2" >
                            <div class="col-5" id="imgBox"><img src="${element[0].imagen}" alt=""></div>
                            <div class="col-7"  style="background-color: ${backGroudColor}; line-height: 1.8;">
                                <div class="row" id="box3">
                                    <div class="col-12" id="descriptionBox" >${element[0].descripcion}</div>
                                    <div class="col-6"  id="priceTag">$${element[0].precio}</div>
                                    <div class="col-6" >
                                        <button type="button" class="btn btn-light" id="${element[0].nombre}" onclick="removeFromCart(this.id)">Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    `

                verResumen.innerHTML = `
                    <h4>Resumen</h2>
                    <h5>Total: $${total}</h3>
                    <p>Tipo de pago: ${data.pago}</p>
                    <p>Direccion de entrega: ${data.dire}</p>
                    `
            }
        } else {
            verResumen.innerHTML = data.msg
            checkOutButton.style.display = 'none'
        }
    }).catch(error => {

        console.error(error)
        console.log('Error en vincular a los servidores')
        location.reload();
        verResumen.innerHTML = `Check server conection`

    });
};

/// remove button

async function removeFromCart(id) {
    let idProducto = { nombre: id }
    fetch(`http://localhost:3000/productos/removeCarrito`, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: "Bearer " + localStorage.getItem('token')
            //Content-Type: "application/json",
        },
        body: JSON.stringify(idProducto)
    }).then(function (rawResponse) {
        const data = rawResponse.json();
        return data
    }).then(function (data) {
        //localStorage.setItem('token', (data.token || data.msg))
        //alert(data.nom)
    }).then(function () {
        location.reload();

    }).catch(error => {
        console.error(error)
        verResumen.innerHTML = 'Check server conection'

    })
};

// confirmar pedido
//carrito/pedido

async function confirmarPedido() {
    let tipoDePago = { pago: 'Efectivo' }
    fetch(`http://localhost:3000/carrito/pedido`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: "Bearer " + localStorage.getItem('token')
            //Content-Type: "application/json",
        },
        body: JSON.stringify(tipoDePago)
    }).then(function (rawResponse) {
        const data = rawResponse.json();
        return data
    }).then(function () {
        window.location.href = "../homePage.html"
    }).catch(error => {
        console.error(error)
        verResumen.innerHTML = 'Check server conection'
    })
};

// get listado de pedidos

async function getPedidos() {

    fetch(`http://localhost:3000/pedido/confirmado`, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: "Bearer " + localStorage.getItem('token')
            //Content-Type: "application/json",
        }
    }).then(function (rawResponse) {
        const data = rawResponse.json();
        return data
    }).then(function (data) {
        espacioPedidos.innerHTML += `
            <h4 style="border-top: 1px dotted white;">Pedidos historicos:</h2>
        `
        data.data.forEach(element => {
            
            if (element.estado == "Anulada" || element.estado == "Entregada") {
                espacioPedidos.innerHTML += `
                <h5 style="border-bottom: 2px dotted white; line-height: 1.8">ID de pedido: ${element.id} - Monto: $${element.monto} - Estado: ${element.estado}</h5>
            `
            } else {
                espacioPedidos.innerHTML += `
                <h5 style="line-height: 1.5">ID de pedido: ${element.id} - Monto: $${element.monto} - Estado: ${element.estado}</h5>
                <button type="button" class="btn btn-light" id="${element.id}" onclick="anularPedido(this.id)">Anular</button>
                `
            }

        });

        //location.reload();

    }).catch(error => {
        console.error(error)
        //alert('Sin conexion a servidores')
        espacioPedidos.innerHTML = 'Check server conection'
        location.reload();

    })
};

// anular pedido


function anularPedido(id) {
    let anularButton = document.getElementById(id)
    anularButton.innerHTML = 'Anulado'
    alert('Se solicito la anulacion!')
    anularButton.style.backgroundColor = 'grey'
}


function chekAdminToken(){
    fetch(`http://localhost:3000/pedido`, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token')
            //Content-Type: "application/json",
        }
    }).then(function (raw) {
       const data = raw.json();
       return data
    }).then(function (data) {
        //( data.msg == 'Ok') ? alert(ok) : alert('not ok')
        if (data.msg == 'Ok'){
            //alert('Done')
        }else{
            (lineaPedidosAdmin.style.display = 'none')
        }
    }).catch(error => {
        console.error(error)
        //alert('wtf')
        //lineaPedidosAdmin.style.display = 'none'
        location.reload();
        console.log('No es admin')
    });
}

try {

}
catch (error) {
    console.error(error);
    // expected output: ReferenceError: nonExistentFunction is not defined
    // Note - error messages will vary depending on browser
    //verResumen.innerHTML = 'Check server conection'

}

