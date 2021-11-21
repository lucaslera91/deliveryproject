window.onload = pedidosShow
let pedidosTabla = document.querySelector('#pedidosContainer')
//alert(pedidosTabla.innerHTML)
let testDeDispley = document.querySelector('#testID')
//alert(testDeDispley.innerHTML)
let elmts = ["Creado", "En curso", "Pendiente", "Entregada", "Anulada"];
let estado = document.querySelector('#estado')
let trying = document.querySelector('#numero2')

function GFG_Fun(id) {
  //testDeDispley.style.display = 'none'
  let droptest = document.querySelector(`#${id}`)
  alert(droptest.innerHTML)
  //alert('yay')
  for (let i = 0; i < elmts.length; i++) {
    let optn = elmts[i];
    //alert(optn)
    let el = document.createElement("option");
    //alert(el.textContent)
    el.textContent = optn;
    el.value = optn;
    droptest.appendChild(el);
  }
  droptest.innerHTML = el.value;


}
//testDeDispley.style.display = 'none'


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

    //const values = Object.values(obj);
    let values = "";
    //pedidosTabla.innerHTML = `
    //       <div class="row">`
    let color = true
    let aux = data.data
    //console.log(aux)
    //console.log(data.data)
    //testeando.innerHTML = aux



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
          <select name="dropLsit" id="drop">${element2}</select>
          <button type="button" onclick="GFG_Fun(this.id)" id="numero${element.id}" class="btn btn-outline-light">Edit</button>
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
      pedidosTabla.innerHTML += `<div class="w-100"></div>`
    })
    pedidosTabla.innerHTML += `</div>`

  }).then(function () {


  }).catch(error => {
    console.error(error)
    console.log('Error en vincular a los servidores - cargando productos..')

    //location.reload();

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