
window.onload = carritoShow
let pantallaCarrito = document.querySelector('#pantallaCarrito')
//alert(pantallaCarrito.innerHTML)
let verResumen = document.querySelector('#resumen')
let checkOutButton = document.querySelector('#checkOut')
//alert(verResumen.innerHTML)
//let reloadPlease = 'n'
checkOutButton.addEventListener('click', confirmarPedido)
confirmarPedido
function test(){
    alert('yay')
}
async function carritoShow() {
    let total = 0
    let aux = ""
    fetch(`http://localhost:3000/carrito`, {
        method: "POST",
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
        try{
        let arrayAux = data.carrito
        let color = true
        for (let index = 0; index < arrayAux.length; index++) {
            const element = arrayAux[index];
            total += element[0].precio;
            if (color == true) {
                backGroudColor = 'rgb(212, 212, 212, 0.1)'
            } else {
                backGroudColor = 'rgb(212, 212, 212, 0,4)'
            }

            pantallaCarrito.innerHTML +=
                `
            
            <div class="col-12" style="background-color: ${backGroudColor};">${element[0].nombre}</div>
            <div class="container" ">
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
            `
        }
        /*<div class="imagentProducto"><img src="${element[0].imagen}" alt=""></div>
        <div>
            <div class="elementos">
                ${element[0].descripcion} - $${element[0].precio}
            </div>
        </div>*/

        // data.carrito.forEach(element => {

        //     //<p>${Object.keys(element.nombre)}</p>
        //     pantallaProducto.innerHTML +=
        //         `
        //         <p>${(element[0].nombre)}</p>
        //         <p>${(data.pago)}</p>
        //         <p>${(data.dire)}</p>

        //         <div class="titulo"><h3>${element.nombre}</h3></div>
        //         <div class="imagentProducto"><img src="${element.imagen}" alt=""></div>
        //         <div>
        //             <div class="elementos">
        //                 ${element.descripcion} - $${element.precio}
        //             </div>
        //         </div>
        //         <div>
        //             <button class="addToCartButton" onclick="addToCart(this.id)" id="${element.nombre}">Add to cart</button>
        //         </div>`
    }catch (error) {
        console.error(error);
        // expected output: ReferenceError: nonExistentFunction is not defined
        // Note - error messages will vary depending on browser
        aux = data.msg
        return aux
    
    }
        return (data)
    }).then(function (data) {
       console.log(data)
       //alert(data)
       if (total){
        verResumen.innerHTML = `
            <h4>Resumen</h2>
            <h5>Total: $${total}</h3>
            <p>Tipo de pago: ${(data.pago)}</p>
            <p>Direccion de entrega: ${(data.dire)}</p>
            `
       }else{

        verResumen.innerHTML = `<h2 id='primerItem'>${data}</h2>`
        checkOutButton.style.display = 'none'
       }
        
    }).catch(error => {
        console.error(error)
        console.log('Error en vincular a los servidores')
        //reloadPlease = prompt('Error en vincular a los servidores - Reload (y/n)?')
        //verResumen.innerHTML = 'Check server conection'
        //alert('something is not ok')
        
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
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTEsInJvbCI6ImFkbWluIiwiaWF0IjoxNjM3MTc1NTIxfQ.zs23gE2zCmPxGBuzqa1PSwfd7zd4_0wFl3XpJ-trWFQ"
            //Content-Type: "application/json",
        },
        body: JSON.stringify(idProducto)
    }).then(function (rawResponse) {
        //alert('ehy2')
        const data = rawResponse.json();
        //alert(data)
        return data
    }).then(function (data) {
        //alert(Object.keys(data.msg[2]));
        //localStorage.setItem('token', (data.token || data.msg))
        alert(data.msg)
        //alert(data.nom)
    }).then(function () {
        location.reload();

    }).catch(error => {
        console.error(error)
        //alert('Sin conexion a servidores')
        verResumen.innerHTML = 'Check server conection'

    })
};

// confirmar pedido
//carrito/pedido

async function confirmarPedido() {
    let tipoDePago = {pago:'Efectivo'}
    fetch(`http://localhost:3000/carrito/pedido`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTEsInJvbCI6ImFkbWluIiwiaWF0IjoxNjM3MTc1NTIxfQ.zs23gE2zCmPxGBuzqa1PSwfd7zd4_0wFl3XpJ-trWFQ"
            //Content-Type: "application/json",
        },
        body: JSON.stringify(tipoDePago)
    }).then(function (rawResponse) {
        //alert('ehy2')
        const data = rawResponse.json();
        //alert(data)
        return data
    }).then(function () {
        window.location.href="../homePage.html"
        //location.reload();

    }).catch(error => {
        console.error(error)
        //alert('Sin conexion a servidores')
        verResumen.innerHTML = 'Check server conection'

    })
};




try {

}
catch (error) {
    console.error(error);
    // expected output: ReferenceError: nonExistentFunction is not defined
    // Note - error messages will vary depending on browser
    verResumen.innerHTML = 'Check server conection'

}

