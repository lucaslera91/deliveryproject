

let pedidosTabla = document.querySelector('#pedidosContainer')
// Opciones para el adeministrador en los estados
let elmts = ["Creado", "En curso", "Pendiente", "Entregada", "Anulada"];
pedidosShow()



//Modificar el Estado del Pedido

async function GFG_Fun(valueEstado, id) {
  let auxEstado = { estado: valueEstado, idPed: id }
  try {
    let data = await myFetch("/pedido/estado", "POST", auxEstado)
    console.log(data)

  } catch (e) {
    console.log("Error en el fetch")
    console.log(e)
  }
}

async function pedidosShow() {
  pedidosTabla.innerHTML = ""
  let data = await myFetch("/pedido", "GET")
  console.log(data)
  try {
    let color = true
    let aux = data.data
    aux.forEach(element => {

      color ? backGroudColor = 'rgb(212, 212, 212, 0.3)' : backGroudColor = 'rgb(212, 212, 212, 0,7)'

      let values = Object.values(element);
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
  } catch (e) {
    console.log("Error")
    console.log(e)
  }
}







