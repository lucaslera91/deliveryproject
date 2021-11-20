let imagenProducto = document.querySelector('.imagentProducto')
let tituloProducto = document.querySelector('.titulo')
let pantallaProducto = document.querySelector('#productScreen')
let addToCartButton = 'realy'
window.onload = productShow

async function productShow() {
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
        //alert('yay')
        //alert(Object.keys(data.msg[2]));
        data.dat.forEach(element => {
            pantallaProducto.innerHTML +=
                `<div class="titulo"><h3>${element.nombre}</h3></div>
                <div class="imagentProducto"><img src="${element.imagen}" alt=""></div>
                <div>
                    <div class="elementos">
                        ${element.descripcion} - $${element.precio}
                    </div>
                </div>
                <div>
                    <button class="addToCartButton" onclick="addToCart(this.id)" id="${element.nombre}">Add to cart</button>
                </div>`
                
        })
    }).then(function() {
            
            // addToCartButton = document.getElementsByClassName('addToCartButton')
            // addToCartButton.forEach(element => {
            //     element.addEventListener('click', alert)
            // });
            //addToCartButton.addEventListener('click', alert)
    }).catch(error => {
        console.error(error)
        location.reload();
        console.log('Error en vincular a los servidores - cargando productos..')

    });
};


//addToCartButton.addEvent
//addToCart()
async function addToCart(id) {
    let idProducto = {nombre: id}
    fetch(`http://localhost:3000/productos/addCarrito`, {
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
    }).catch(error => {
            console.error(error)
            alert('Sin conexion a servidores')
    })
};




