let imagenProducto = document.querySelector('.imagentProducto')
let tituloProducto = document.querySelector('.titulo')
let pantallaProducto = document.querySelector('#productScreen')
let lineaPedidosAdmin = document.querySelector('#listaPedidosAdmin')
lineaPedidosAdmin.style.display = 'flex'

let addToCartButton = 'realy'


chekAdminToken();
muestraProductos();
menuList();



// modificar listado si no es admin
async function menuList(){
    const isAdmin = await chekAdminToken()
    if (!isAdmin){
        lineaPedidosAdmin.style.display = 'none'
    } else{
        console.log(chekAdminToken())
        console.log(isAdmin)
    }
}

async function muestraProductos(){
    let data = await myFetch("/productos","GET")
    console.log(data)
    try{
        const backGroudColor = 'rgb(212, 212, 212, 0.3)';

        data.dat.forEach(element => {
            pantallaProducto.innerHTML +=
            `
            <div class="col-12" style="background-color: ${backGroudColor};">${element.nombre}</div>
            <div class="container">
            <div class="row" id="box2" >
                <div class="col-5" id="imgBox"><img src="${element.imagen}" alt=""></div>
                <div class="col-7" style="background-color: ${backGroudColor}; line-height: 1.8;">
                    <div class="row" id="box3">
                    <div class="col-12" id="descriptionBox" >${element.descripcion}</div>
                        <div class="col-6"  id="priceTag">$ ${element.precio}</div>
                        <div class="col-6" >
                            <button type="button" class="btn btn-light" id="${element.nombre}" onclick="addToCart(this.id)">Add to cart</button>
                        </div>
                    </div>
                
                </div>
            </div>`
        });
    } catch(e)     {
            console.log('Error');
            console.log(e)
        }
    }


//addToCart()
async function addToCart(id){
    let idProducto = { nombre: id }
    let data = await myFetch("/productos/addCarrito", "PUT", idProducto)
    console.log(data)
    try{
        alert(data.msg)
    } catch(e){
        console.log('Error en Button');
        console.log(e)
    }

}

