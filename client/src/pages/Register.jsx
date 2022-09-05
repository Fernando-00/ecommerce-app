import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import { registerUser } from "../redux/apiCalls";


const RegisterWrapper = styled.div`

`;

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
                rgba(255,255,255,0.5), 
                rgba(255,255,255,0.5)
                ), 
                url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") center;
                background-size: cover;
                display: flex;
                align-items: center;
                justify-content: center;
`;

const Wrapper = styled.div`
    width: 40%;
    padding: 20px;
    background-color: white;
`;


const Title = styled.h1`

    font-size: 24px;
    font-weight: 300;
`;

const Form = styled.form`

        display: flex;
        flex-wrap: wrap;
`;



const Input = styled.input`

flex: 1;
min-width: 40%;
margin: 20px 10px 0px 0px;
padding: 10px;
`;

const Agreement = styled.span`

    font-size: 12px;
    margin:  20px 0px;
`;

const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px ;
    background-color: teal;
    color: white;
    cursor: pointer;
`;


const Register = () => {

  const [inputs, setInputs] = useState({});
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleChange = (e) => {
    
    setInputs(prev=>{
      return {...prev, [e.target.name]:e.target.value}
    })
  };

  const handleClick = (e) =>{
    e.preventDefault();
    if(inputs.password == inputs.confirm){
        setError(false);
        registerUser(inputs, dispatch, navigate);
    }else{
        setError(true);
    }
    
    


  };


  return (

    <RegisterWrapper>

        <Announcement/>
        <Navbar/>
    <Container>
        
        <Wrapper>
            <Title>CREATE AN ACOOUNT</Title>
            <Form>
                <Input placeholder="username" name="username" onChange={(e)=>handleChange(e)}/>
                <Input placeholder="email" name="email" onChange={(e)=>handleChange(e)}/>
                <Input placeholder="password" type="password" name="password" style={{font: "small-caption", fontSize: "16px"}} onChange={(e)=>handleChange(e)}/>
                <Input placeholder="confirm password" type="password"  style={{font: "small-caption", fontSize: "16px"}} name="confirm" onChange={(e)=>handleChange(e)}/>
                <Agreement>
                    By creating an account , I consent to
                     the processing of my personal data in
                      accordance with the <b>PRIVACY POLICY</b>
                </Agreement>
                {error ? <p style={{color:"red"}}>Please ensure the passwords match...</p>: ""}
                <Button onClick={(e)=>handleClick(e)}>CREATE</Button>
            </Form>
        </Wrapper>

    </Container>

    </RegisterWrapper>
  )
}

export default Register