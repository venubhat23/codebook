
function getSession(){
    const token=JSON.parse(sessionStorage.getItem("token"));
    const cbid=JSON.parse(sessionStorage.getItem("cbid"));
    return {token,cbid}
}

export async function getUser(){

    const BrowesrData=getSession();
    const requestOptions={ 
        method:"GET",
        headers: {"Content-Type": "application/json", Authorization: `Bearer ${BrowesrData.token}`}
    };
    const response =await fetch(`${process.env.REACT_APP_HOST}/600/users/${BrowesrData.cbid}`,requestOptions);
    if(!response.ok){
        throw { message: response.statusText, status:response.status} //esLint-disable-line
    }
    const data= await response.json();
    return data;
}
    

export async function getUserOrders(cartList, total, user){
    const BrowesrData=getSession();
        const requestOptions={ 
            method:"GET",
            headers: {"Content-Type": "application/json", Authorization: `Bearer ${BrowesrData.token}`}
        }
        const response =await fetch(`${process.env.REACT_APP_HOST}/660/orders?user.id=${BrowesrData.cbid}`,requestOptions);
        if(!response.ok){
            throw { message: response.statusText, status:response.status}  //esLint-disable-line
        }
      const data =await response.json()
      return data


}

export async function createOrder(cartlist,total,user){
    const BrowesrData=getSession();

    const order = {
        cartList:cartlist,
        amount_paid :total,
        quantity : cartlist.length,
        user:{
            name: user.name,
            email: user.email,
            id: user.id
            
        }
    }
        const requestOptions={
            method: "POST",
            headers:{ "Content-Type": "application/json", Authorization:`Bearer ${BrowesrData.token}`},
            body: JSON.stringify(order)
        }
        const response= await fetch(`${process.env.REACT_APP_HOST}/660/orders`,requestOptions)
        if(!response.ok){
            throw { message: response.statusText, status:response.status}  //esLint-disable-line
        }
        
        const data=await response.json()
        return data

}