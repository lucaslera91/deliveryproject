let lineaPedidosAdmin = document.querySelector('#listaPedidosAdmin')
let pantallaCarrito = document.querySelector('#pantallaCarrito')
let verResumen = document.querySelector('#resumen')
let checkOutButton = document.querySelector('#checkOut')
let espacioPedidos = document.querySelector('#pantallaPedidos')
lineaPedidosAdmin.style.display = 'flex'


carritoShow()
getPedidos()
menuList()

checkOutButton.addEventListener('click', confirmarPedido)
async function menuList(){
    const isAdmin = await chekAdminToken()
    if (!isAdmin){
        lineaPedidosAdmin.style.display = 'none'
    } else{
        console.log(chekAdminToken())
        console.log(isAdmin)
    }
}
async function carritoShow(){
    let total = 0
    let arrayAux = []
    let data = await myFetch("/carrito", "GET")
    console.log(data.carrito)
    try{
        if (data.msg == true) {
            arrayAux = data.carrito
            let color = true
            //por la forma de los datos debo hacer un for each
            for (let index = 0; index < arrayAux.length; index++) { 
                const element = arrayAux[index];
                total += element[0].precio;
                color ? backGroudColor = 'rgb(212, 212, 212, 0.3)' : backGroudColor = 'rgb(212, 212, 212, 0,7)';
          
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

    }catch(e){
        console.log("Error en el Show")
        console.log(e)
        //location.reload()
    };
}


async function removeFromCart(id){
    let idProducto = { nombre: id }
    console.log(id)
    let data = await myFetch("/productos/removeCarrito", "PUT", idProducto)
    console.log(data)
    window.location.href = "../carrito.html"
}


async function confirmarPedido(){
    let tipoDePago = { pago: 'Efectivo' }
    let data = await myFetch("/carrito/pedido", "POST", tipoDePago)
    console.log(data)
    window.location.href = "../homePage.html"
}


async function getPedidos(){

    let data = await myFetch("/pedido/confirmado", "GET")
    console.log(data)
    try{
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
    }catch(e){
        console.log('Error')
        console.log(e)
    }

}

function anularPedido(id) {
    let anularButton = document.getElementById(id)
    anularButton.innerHTML = 'Anulado'
    alert('Se solicito la anulacion!')
    anularButton.style.backgroundColor = 'grey'
}




