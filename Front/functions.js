url1 = 'http://localhost:3000'

async function myFetch(endPoint, methodType, bodyData = ""){
    let option = {
        method: methodType,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: "Bearer " + localStorage.getItem('token')
        }
    }
    if (methodType != "GET"){
        option.body = JSON.stringify(bodyData)
    }
    return (await fetch(url1 + endPoint, option)).json()
}

async function chekAdminToken(){
    let data = await myFetch('/userCheck', "GET")
    console.log(data)
    try{
        //alert(data.msg)
        if (data.msg == 'Not admin'){
           return false
        }else{
            return true
        }
    }catch(e){
        console.log('Error en fetch')
        console.log(e)
    }
}