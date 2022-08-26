import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { userRequest } from "../requestMethods";

const Success = () => {
  const location = useLocation();

  console.log(location)
  //in Cart.jsx I sent data and cart. Please check that page for the changes.(in video it's only data)
  const stripeId = location.pathname.split('/')[2];
  const [stripeData, setStripeData] = useState({});
  console.log(stripeId)
  
  // const cart = location.state.cart;
  const currentUser = useSelector((state) => state.user?.currentUser);
  console.log(currentUser)
  const [orderId, setOrderId] = useState(null);

  useEffect(()=>{
    const fetchDetails = () =>{
      fetch(`http://localhost:5000/api/checkout/payment/search/${stripeId}`)
        .then(response=>response.json())
        .then(res => {
          
          setStripeData(res);
          console.log(res)
        })
        .catch(e => {
        console.error(e.error)
        });
    }
    stripeId && fetchDetails();
    
  },[])


  // useEffect(() => {
  //   const createOrder = async () => {
  //     try {
  //       const res = await userRequest.post("/orders", {
  //         userId: currentUser? currentUser._id: "",
  //         orderId: stripeData.data._id,
  //         customerId : stripeData.customer.id,
  //         products: stripeData.line_items.data.map((item) => ({
  //           productId: item._id,
  //           quantity: item._quantity,
  //         })),
  //         amount: cart.total,
  //         address: stripeData.billing_details.address,
  //       });
  //       setOrderId(stripeData.data._id);
  //     } catch {}
  //   };
  //   stripeData && createOrder();
  // }, [stripeData]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
      <button style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button>
    </div>
  );
};

export default Success;