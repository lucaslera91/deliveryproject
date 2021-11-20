window.onload = pedidosShow
let pedidosTabla = document.querySelector('#pedidosContainer')
//alert(pedidosTabla.innerHTML)

async function pedidosShow() {
    pedidosTabla.innerHTML = ""
    fetch(`http://localhost:3000/pedido`, {
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
        //alert(data.msg)
        
        //alert(Object.keys(data.data[0]))
        //let titulo = [Object.keys.data.data[0]]
        let aux = data.data
        //const values = Object.values(obj);
        let values = "";
        pedidosTabla.innerHTML = `
                <div class="row">`
        aux.forEach(element => {
            values = Object.values(element);
           for (let index = 0; index < values.length; index++) {
               const element2 = values[index];
                
                pedidosTabla.innerHTML += `  
                <div class="col">${element2}}<div>`
               
           }
           pedidosTabla.innerHTML +=`<div class="w-100"></div>`


           // const values = Object.values(j);

                //pedidosTabla.innerHTML += element.nombre
        })
        pedidosTabla.innerHTML +=`</div>`

            /*pedidosTabla.innerHTML +=
                `
                <div class="row">
                <div class="col">col</div>
                <div class="w-100"></div>
                <div class="col">col</div>
                <div class="col">col</div>
                <div class="col">col</div>
                
            </div>
                
                <div class="titulo"><h3>${element.nombre}</h3></div>
                <div class="imagentProducto"><img src="${element.imagen}" alt=""></div>
                <div>
                    <div class="elementos">
                        ${element.descripcion} - $${element.precio}
                    </div>
                </div>
                <div>
                    <button class="addToCartButton" onclick="addToCart(this.id)" id="${element.nombre}">Add to cart</button>
                </div>`
            */    
        
    }).then(function() {
            
            // addToCartButton = document.getElementsByClassName('addToCartButton')
            // addToCartButton.forEach(element => {
            //     element.addEventListener('click', alert)
            // });
            //addToCartButton.addEventListener('click', alert)
    }).catch(error => {
        console.error(error)
        //location.reload();
        console.log('Error en vincular a los servidores - cargando productos..')

    });
};