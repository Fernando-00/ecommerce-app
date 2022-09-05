import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation} from "react-router";
import Navbar from "../components/Navbar";
import Announcement from '../components/Announcement'
import { publicRequest, userRequest } from "../requestMethods";
import { useNavigate } from "react-router-dom";
import {addOrder} from "../redux/apiCalls"

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(location)
  //in Cart.jsx I sent data and cart. Please check that page for the changes.(in video it's only data)
  const stripeId = location.pathname.split('/')[2];
  const [stripeData, setStripeData] = useState({});
  
  console.log(stripeId)
  
  // const cart = location.state.cart;
  const currentUser = useSelector((state) => state.persistedReducer.user?.currentUser);
  const cart = useSelector((state) => state.persistedReducer.cart);
  console.log(currentUser)
  const orderId = "";

  useEffect(()=>{
    const fetchDetails = async () =>{
      await fetch(`http://localhost:5000/api/checkout/payment/search/${stripeId}`)
        .then(response=>response.json())
        .then(res => {
          
          setStripeData(res);
          console.log(stripeData)
          addOrder(dispatch, res, cart, currentUser);

        })
        .catch(e => {
        console.error(e.error)
        });

    }
    stripeId && fetchDetails();
    
  },[])



  console.log(orderId)
  console.log(stripeData)

  const returnHome = () =>{
    const path = '/';
    navigate(path);
  }

  return (
    <>
    
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      
      <h3>Thank You, For shopping at ROSELL!</h3>
      <h3>Your order is currently being processed...</h3>
      <button style={{ padding: 10, marginTop: 20 }} onClick={returnHome}>Go to Homepage</button>
    </div>
    </>
  );
};

export default Success;