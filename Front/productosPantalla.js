let imagenProducto = document.querySelector('.imagentProducto')
let tituloProducto = document.querySelector('.titulo')
let pantallaProducto = document.querySelector('#productScreen')
let lineaPedidosAdmin = document.querySelector('#listaPedidosAdmin')
lineaPedidosAdmin.style.display = 'flex'

let addToCartButton = 'realy'
window.onload = function() {
    productShow()
    chekAdminToken()
}
function chekAdminToken(){
    fetch(`http://localhost:3000/pedido`, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token')
        }
    }).then(function (raw) {
       const data = raw.json();
       return data
    }).then(function (data) {
        //( data.msg == 'Ok') ? alert(ok) : alert('not ok')
        data.msg != 'Ok' ? lineaPedidosAdmin.style.display = 'none' : next()
        // if (data.msg == 'Ok'){
        //     //alert('Done')
        // }else{
        //     (lineaPedidosAdmin.style.display = 'none')
        // }
    }).catch(error => {
        console.error(error)
        location.reload();
        console.log('No es admin')
    });
}


async function productShow() {
    fetch(`http://localhost:3000/productos`, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token')
        }
    }).then(function (rawResponse) {
        const data = rawResponse.json();
        return data
    }).then(function (data) {
        //let color = true
        const backGroudColor = 'rgb(212, 212, 212, 0.3)'

        data.dat.forEach(element => {
            
          
            pantallaProducto.innerHTML +=
            `
            <div class="col-12" style="background-color: ${backGroudColor};">${element.nombre}</div>
            <div class="container">
            <div class="row" id="box2" >
                <div class="col-5" id="imgBox"><img src="${element.imagen}" alt=""></div>
                <div class="col-7" style="background-color: ${backGroudColor}; line-height: 1.8;">
                    <div class="row" id="box3">
                    <div class="col-12" id="descriptionBox" >${element.descripcion}</div>
                        <div class="col-6"  id="priceTag">$ ${element.precio}</div>
                        <div class="col-6" >
                            <button type="button" class="btn btn-light" id="${element.nombre}" onclick="addToCart(this.id)">Add to cart</button>
                        </div>
                    </div>
                
                </div>
            </div>`

            //color = color
        })
    }).catch(error => {
        console.error(error)
        location.reload();
        console.log('Error en vincular a los servidores - cargando productos..')
    });
};

//addToCartButton.addEvent
//addToCart()

async function addToCart(id) {
    let idProducto = { nombre: id }
    fetch(`http://localhost:3000/productos/addCarrito`, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: "Bearer " + localStorage.getItem('token')
        },
        body: JSON.stringify(idProducto)
    }).then(function (rawResponse) {
        const data = rawResponse.json();
        return data
    }).then(function (data) {
        alert(data.msg)
    }).catch(error => {
        console.error(error)
        alert('Sin conexion a servidores')
    })
};




