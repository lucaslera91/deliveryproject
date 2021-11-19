window.onload = productShow
let imagenProducto = document.querySelector('.imagentProducto')
let tituloProducto = document.querySelector('.titulo')
let pantallaProducto = document.querySelector('#productScreen')


//alert(pantallaProducto.innerHTML)


async function productShow(e){
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
            // `<h3>${element.nombre}</h3>`
            // `<img src="${element.imagen}" alt=""> <br>`
            
            `<div class="titulo"><h3>${element.nombre}</h3></div>
            <div class="imagentProducto"><img src="${element.imagen}" alt=""></div>`

        });
        // testeo.innerHTML = `${data} <br>`
    })
};