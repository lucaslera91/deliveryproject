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
        // pedidosTabla.innerHTML = `
        //         <div class="row">`
        let color = true

        aux.forEach(element => {
            if (color == ture) {
                backGroudColor = 'pedidocolor1'
            } else {
                backGroudColor = 'pedidocolor2'
            }

            values = Object.values(element);
            for (let index = 0; index < values.length; index++) {
                const element2 = values[index];
                if (index == 2) {
                    let date = new Date(element2)
                    let options = {
                        month: "numeric",
                        day: "numeric", hour: "2-digit", minute: "2-digit"
                    }
                    date = date.toLocaleTimeString("en-ar", options)
                    //alert(date)
                    pedidosTabla.innerHTML += ` 
                    <div class="col-3">
                        <div class"${backGroudColor}">
                            <div class="pedidocolor1">
                                <p>${date}</p>
                            </div>
                        </div>
                    <div>`
                } else {
                    pedidosTabla.innerHTML += ` 
                        <div class="col-3">
                            <div class"${backGroudColor}">
                                <p>${element2}</p>
                            </div>
                        <div>`

                }
            }
            color = !color
            alert(color)
            pedidosTabla.innerHTML += `<div class="w-100"></div>`
        })
        pedidosTabla.innerHTML += `</div>`

    }).then(function () {


        }).catch(error => {
            console.error(error)
            console.log('Error en vincular a los servidores - cargando productos..')

            location.reload();

        });
};




/*else {
    if (color = true) {
        //alert(index)
        pedidosTabla.innerHTML += `
        <div class="col-3">

            <p>${element2}</p>

        <div>`
    } else {
        pedidosTabla.innerHTML += `
        <div class="col-3">

            <p>${element2}</p>

        <div>`
    }*/