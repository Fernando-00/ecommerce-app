import { Add, Clear, Remove } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components"
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {loadStripe} from '@stripe/stripe-js';
import { addProduct, deleteProduct, deleteSingleProduct } from "../redux/cartRedux";


const KEY = process.env.REACT_APP_STRIPE;
const Container = styled.div``;

const Wrapper = styled.div`

    padding: 20px;
    ${mobile({padding: "10px"})}
`;

const Title = styled.h1`

    font-weight: 300;
    text-align: center;
`;

const Top = styled.div`

    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`;

const TopButton = styled.button`

    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${props=>props.type === "filled" && "none"};
    background-color: ${props=>props.type === "filled" ? "black" : "transparent"};
    color: ${props=>props.type === "filled" && "white"};
`;

const TopTexts = styled.button`

${mobile({display: "none"})}
`;


const TopText = styled.span`

text-decoration: underline;
cursor: pointer;
margin: 0px 10px;

    
`;


const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({flexDirection: "column"})}
    
`;
const Info = styled.div`
    flex: 3;

    
`;

const Product = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({flexDirection: "column"})}
`;
const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`;
const Image = styled.img`
    width: 200px;
`;
const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;
const ProductName = styled.span`
    
`;
const ProductId = styled.span`
    
`;
const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props=>props.color};


`;
const ProductSize = styled.span`
    
`;
const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ProductAmountContainer = styled.div`

    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;

const ProductAmount = styled.div`
    font-size: 24px;
    margin: 5px;
    ${mobile({margin: "5px 15px"})}
`;

const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;
    ${mobile({marginBottom: "20px"})}
`;

const Hr = styled.hr`

    background-color: #eee;
    border: none;
    height: 1px;
`;



const Summary = styled.div`
flex: 1;
border: 0.5px solid lightgray;
border-radius: 10px;
padding: 20px;
height: 50vh;
    
`;

const SummaryTitle = styled.h1`
    font-weight: 200;

`;
const SummaryItem = styled.div`
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    font-weight: ${props=>props.type === "total" && "500"};
    font-size: ${props=>props.type === "total" && "24px"};

`;
const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;
const Button = styled.button`

    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
    font-weight: 600;
`;


const Cart = () => {

    const cart = useSelector(state=>state.persistedReducer.cart)
    const [stripeToken, setStripeToken] = useState(null);
    const dispatch = useDispatch();
    
    
    const navigate = useNavigate();
    
    

    

    const onToken = (token) =>{
        setStripeToken(token);
    };

    const makeRequest = async () =>{


        const stripe = await loadStripe(process.env.REACT_APP_STRIPE)
        
        let products = cart.products.map((item)=>{return {id: item._id, quantity: item.quantity}});
        
        fetch("http://localhost:5000/api/checkout/payment", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            products: products
            
            }),
        })
            .then(res => {
            if (res.ok) return res.json()
            return res.json().then(json => Promise.reject(json))
            })
            .then((session) => {
                console.log(session.id)
                return stripe.redirectToCheckout({ sessionId: session.id});
            })
            .catch(e => {
            console.error(e.error)
            })

    
    };

    const handleDelete = (product) => {
        console.log("Deleting CLIENT")
        dispatch(deleteProduct(product));
        
    };

    const handleSingleDelete = (product) => {
        console.log("Deleting CLIENT")
        dispatch(deleteSingleProduct(product));
        
    };

    const handleAdd = (product) => {
        console.log("Deleting CLIENT")
        console.log(product)
        dispatch(
            addProduct(product)
        );
        
    };

  return (
    <Container>
        <Navbar/>
        <Announcement/>
        <Wrapper>
            <Title>YOuR BAG</Title>
            <Top>
                <TopButton>CONTINUE SHOPPING</TopButton>
                <TopTexts>

                    <TopText>Shopping Bag(2)</TopText>
                    <TopText>Your Wishlist (0)</TopText>

                </TopTexts>
                
                <TopButton type="filled">CHECKOUT NOW</TopButton>
            </Top>
            <Bottom>

                <Info>
                    {cart.products.map(product=>(<Product>
                        <ProductDetail>
                            <Image src={product.img}/>
                            
                            <Details>
                                <ProductName><b>Product:</b>{product.title}</ProductName>
                                <ProductId><b>ID:</b> {product._id}</ProductId>
                                <ProductColor color={product.color}/>
                                <ProductSize><b>Size:</b> {product.size}</ProductSize>
                            </Details>
                        </ProductDetail>
                        <PriceDetail>
                            <ProductAmountContainer>
                                <Add style={{cursor:"pointer"}} onClick={()=>handleAdd(product)}/>
                                <ProductAmount>{product.quantity}</ProductAmount>
                                <Remove style={{cursor:"pointer"}} onClick={()=>handleSingleDelete(product)}/>
                            </ProductAmountContainer>
                            <ProductPrice>$ {product.storePrice* product.quantity}</ProductPrice>
                        </PriceDetail>
                        <Clear style={{marginRight:"20px", cursor: "pointer"}} onClick={()=>handleDelete(product)} />
                        
                    </Product>))}
                    <Hr/>
                    
                </Info>
                <Summary>
                    <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                    <SummaryItem>
                        <SummaryItemText>Subtotal</SummaryItemText>
                        <SummaryItemText>$ {cart.total}</SummaryItemText>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>Estimated Shipping</SummaryItemText>
                        <SummaryItemText>$ 5.90</SummaryItemText>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>Shipping Discount</SummaryItemText>
                        <SummaryItemText>$ -5.90</SummaryItemText>
                    </SummaryItem>
                    <SummaryItem type="total">
                        <SummaryItemText>Total</SummaryItemText>
                        <SummaryItemText>$ {cart.total}</SummaryItemText>
                    </SummaryItem>
                    
                    <Button onClick={makeRequest}>
                        CHECKOUT NOW
                    </Button>
                
                </Summary>

            </Bottom>
        </Wrapper>
        <Footer/>


    </Container>
  )
}

export default Cart