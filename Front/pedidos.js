window.onload = pedidosShow
let pedidosTabla = document.querySelector('#pedidosContainer')
//alert(pedidosTabla.innerHTML)
//let testDeDispley = document.querySelector('#testID')
//alert(testDeDispley.innerHTML)
let elmts = ["Creado", "En curso", "Pendiente", "Entregada", "Anulada"];
//let estado = document.querySelector('#estado')
//let trying = document.querySelector('#numero2')

function GFG_Fun(valueEstado, id) {

  let auxEstado = { estado: valueEstado, idPed: id }

  fetch(`http://localhost:3000/pedido/estado`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      Authorization: "Bearer " + localStorage.getItem('token')
      //Content-Type: "application/json",
    },
    body: JSON.stringify(auxEstado)
  }).then(function (rawResponse) {
    console.log(rawResponse)
    const data = rawResponse.json();
    console.log(data)
    return data
  }).then(function (data) {
    //DO SOMETHING?
  }).catch(error => {
    console.error(error)
    console.log('Error en vincular a los servidores - cargando productos..')
    //location.reload();
  });
};



//testDeDispley.style.display = 'none'


async function pedidosShow() {
  pedidosTabla.innerHTML = ""
  fetch(`http://localhost:3000/pedido`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem('token')
      //Content-Type: "application/json",
    }
  }).then(function (rawResponse) {
    //alert('ehy2')
    console.log(rawResponse)
    const data = rawResponse.json();
    console.log(data)
    return data
  }).then(function (data) {
    let values = "";
    let color = true
    let aux = data.data
    aux.forEach(element => {
      if (color == true) {
        backGroudColor = 'rgb(212, 212, 212, 0.3)'
      } else {
        backGroudColor = 'rgb(212, 212, 212, 0,7)'
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
                    <div class="col-3" style="background-color:${backGroudColor}">
                                ${date}
                    </div>`
        } else if (index == 1) {


          pedidosTabla.innerHTML += ` 
          <div class="col-3" style="background-color: ${backGroudColor}">
          <select id="estado${element.id}" onchange="GFG_Fun(this.value, ${element.id})">
            <option disabled selected>${element.estado}</option>
            <option value="Creado">Creado</option>
            <option value="En curso">En curso</option>
            <option value="Entregada">Entregada</option>
            <option value="Anulada">Anulada</option>
          </select>
          </div>`
        } else {
          pedidosTabla.innerHTML += ` 
            <div class="col-3" style="background-color: ${backGroudColor}">
              ${element2}
            </div>`
        }
      }
      color = !color
      //alert(color)
      //<select name="dropLsit" id="drop${element.id}">${element2}</select>
      //
      pedidosTabla.innerHTML += `<div class="w-100"></div>`
    })
    pedidosTabla.innerHTML += `</div>`
    //<button type="button" onclick="GFG_Fun(this.id)" id="numero${element.id}" class="btn btn-outline-light">Edit</button>
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