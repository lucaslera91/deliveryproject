window.onload = productShow
let imagenProducto = document.querySelector('.imagentProducto')
let tituloProducto = document.querySelector('.titulo')
let pantallaProducto = document.querySelector('#productScreen')
let addToCartButton = 'realy'


//alert(pantallaProducto.innerHTML)


async function productShow(e) {
    e.preventDefault()
    //alert('yay')
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
                    <button class='addToCartButton' id="${element.nombre}">Add to cart</button>
                </div>`
                
        })
    }).then(function(){
            
            addToCartButton = document.querySelector('.addToCartButton')
            addToCartButton.addEventListener('click', addToCart)
    });
        // testeo.innerHTML = `${data} <br>`
};

//addToCartButton.addEvent

async function addToCart(e) {

    e.preventDefault()
    let idProducto = {nombre: addToCartButton.id}
    alert(idProducto.nombre)
    //let  = { usuario: user.value, contrasena: contrasena.value }
   
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
        alert(data)
    }).catch(error => {
            console.error(error)
            alert('Sin conexion a servidores')
        })
};

//addToCart()