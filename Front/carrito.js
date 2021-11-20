window.onload = carritoShow
let pantallaCarrito = document.querySelector('#pantallaCarrito')
//alert(pantallaCarrito.innerHTML)
let verResumen = document.querySelector('#resumen')
//alert(verResumen.innerHTML)

async function carritoShow() {
    let total = 0
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
        //alert('yay')
        //alert(Object.keys(data.msg[2]));
        let arrayAux = data.carrito

        for (let index = 0; index < arrayAux.length; index++) {
            const element = arrayAux[index];
            //alert(element[0].nombre)
            total += element[0].precio;
            pantallaCarrito.innerHTML +=
            `
            <div class="titulo"><h3>${element[0].nombre} - $ ${element[0].precio}</h3></div>
        
            <div>
                <button class="addToCartButton" onclick="RemoveToCart(this.id)" id="${element[0].nombre}">Remove</button>
            </div>`
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
        return(data)
    }).then(function(data) {
            //console.log('?')
            //alert('jp;a')
            verResumen.innerHTML = `
            <h2>Resumen</h2>
            <h3>Total: $${total}</h3>
            <p>Tipo de pago: ${(data.pago)}</p>
            <p>Direccion de entrega: ${(data.dire)}</p>
            `
            // // addToCartButton = document.getElementsByClassName('addToCartButton')
            // // addToCartButton.forEach(element => {
            // //     element.addEventListener('click', alert)
            // // });
            //addToCartButton.addEventListener('click', alert)
    }).catch(error => {
        console.error(error)
        location.reload();
        //alert('something is not ok')
        console.log('Error en vincular a los servidores')

    });
};
