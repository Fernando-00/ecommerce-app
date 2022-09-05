import { publicRequest, userRequest } from "../requestMethods";
import { clearCart } from "./cartRedux";
import { getOrderFailure, getOrderStart, getOrderSuccess, loginFailure, loginStart, loginSuccess, logout, updateClientFailure, updateClientStart, updateClientSuccess } from "./userRedux"

export const login = async (dispatch, user, navigate)=>{
  dispatch(loginStart());
  
  try {
      const res = await publicRequest.post("/auth/login", user);

      localStorage.setItem("token", JSON.stringify(res.data.accessToken));
      console.log(res.data.accessToken)
      console.log("SHOULD BE WORKING")
      
      dispatch(loginSuccess(res.data));
      navigate("/");

      
      
      
  } catch (err) {
      dispatch(loginFailure());
  }
};


export const addOrder = async (dispatch, stripeData, cart, user)=>{
    console.log(stripeData)
    console.log(user)
  try {

    console.log("order being created")
    console.log(cart)
    console.log(stripeData)
    const res = await publicRequest.post("/orders", {
      userId: user? user._id: "",
      orderId: stripeData.payment_intent.id,
      stripeId: stripeData.id,
      products: cart.products.map((item) => ({
        productId: item._id,
        quantity: item._quantity,
        name: item.title,
        
      })),
      dataProducts: cart.products.map((item) => {
        return " " + item.title + " "+ item.size + " * " + item.quantity.toString() + " "
        
    }).join(),
      amount: stripeData.amount_total / 100,
      address: stripeData.shipping_details.address,
    });

    dispatch(clearCart());
    
    
  } catch (err){
    console.log(err)
  }
}


export const registerUser = async (client, dispatch, navigate)=>{
  
  try {
      const res = await publicRequest.post(`/auth/register`, client);
      
      navigate("/");
      login(dispatch, {username: client.username, password: client.password});
      
      
  } catch (err) {
      console.log(err);

      
  }
};


export const updateClient = async (id, client, dispatch, navigate)=>{
  dispatch(updateClientStart());
  try {
      // update using acios userRequest in FUTURE
      // const res = await userRequest.post(`/products/`, {product});
      const res = await userRequest.put(`/users/${id}`,client);
      
      
      dispatch(updateClientSuccess({id, client}));
      navigate("/profile");
      
  } catch (err) {
      dispatch(updateClientFailure());

      if(err.response?.status == 403){
          console.log(err.response)
          console.log("Token has expired...")
          console.log("Dispatching Logout...")
          dispatch(logout());
      }
      
  }
};



export const getOrders = async (id, dispatch)=>{
  dispatch(getOrderStart());
  try {
      const res = await userRequest.get(`/orders/find/${id}`);
      
      dispatch(getOrderSuccess(res.data));
      
  } catch (err) {
      dispatch(getOrderFailure());

      if(err.response?.status == 403){
          console.log(err.response)
          console.log("Token has expired...")
          console.log("Dispatching Logout...")
          // dispatch(logout());
      }
  }
};