window.onload = pedidosShow
let pedidosTabla = document.querySelector('#pedidosContainer')
let elmts = ["Creado", "En curso", "Pendiente", "Entregada", "Anulada"];
function GFG_Fun(valueEstado, id) {

  let auxEstado = { estado: valueEstado, idPed: id }

  fetch(`http://localhost:3000/pedido/estado`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      Authorization: "Bearer " + localStorage.getItem('token')
    },
    body: JSON.stringify(auxEstado)
  }).then(function (rawResponse) {
    const data = rawResponse.json();
    return data
  }).catch(error => {
    console.error(error)
    console.log('Error en vincular a los servidores - cargando productos..')
    //location.reload();
  });
};

async function pedidosShow() {
  pedidosTabla.innerHTML = ""
  fetch(`http://localhost:3000/pedido`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem('token')
    }
  }).then(function (rawResponse) {
    const data = rawResponse.json();
    return data
  }).then(function (data) {
    let values = "";
    let color = true
    let aux = data.data
    aux.forEach(element => {

      color ? backGroudColor = 'rgb(212, 212, 212, 0.3)' : backGroudColor = 'rgb(212, 212, 212, 0,7)'

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
