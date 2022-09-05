import { Badge } from '@material-ui/core';
import { Search, ShoppingCartOutlined } from '@material-ui/icons';
import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { logout } from '../redux/userRedux';
import {mobile} from "../responsive"

const Container = styled.div`
    height: 60px;
    
    ${mobile({height: "50px"})}
`;

const Wrapper = styled.div`

    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items:center;
    ${mobile({padding: "10px 0px"})}

`;

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`;

const Language = styled.span`
    font-size: 14px;
    cursor: pointer;
    ${mobile({display: "none"})}

`;

const SearchContainer = styled.div`

    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
`;

const Input = styled.input`
border: none;
    
${mobile({width: "50px"})}
`;

const Center = styled.div`
    flex: 1;
    text-align: center;

`;

const Logo = styled.h1`
    
    font-weight: bold;
    ${mobile({fontSize: "24px"})}
`

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${mobile({justifyContent: "center", flex:2})}

`;

const MenuItem = styled.div`
    
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    ${mobile({fontSize: "12px", marginLeft:"10px"})}
`;

const MenuImg = styled.img`
    
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid lightgray;
    cursor: pointer;
    margin-left: 25px;
    ${mobile({fontSize: "12px", marginLeft:"10px"})}
`;

const Navbar = () => {

    const quantity = useSelector(state=>state.persistedReducer.cart.quantity);
    const user = useSelector(state=> state.persistedReducer.user?.currentUser);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    

    const handleLogout = () =>{
        dispatch(logout());
    };

 

    const handleSubmit = event =>{
        event.preventDefault();
        console.log("activated")
        console.log(search)
        if(search != ""){
            navigate(`../products/${search}`, { replace: true });
            setSearch("");
            
        }
        
        
    }

    const handleClick= event =>{
        console.log("hi")
        
        
    }

  return (
    <Container>
        <Wrapper>
            <Left>
                <Language>EN</Language>
                <SearchContainer>
                    <form onSubmit={handleSubmit}>
                    <Input placeholder="Search" name="search" onChange={(e)=>setSearch(e.target.value)} />
                    </form>
                    
                    <Search style={{color:"gray", fontSize:16, cursor: "pointer"}} onClick={handleSubmit}/>
                </SearchContainer>
                
            </Left>
            <Center>
                <Link to="/" style={{textDecoration: "none", color:"inherit"}}>
                <Logo>ROSELL.</Logo>
                </Link>
            </Center>
            <Right>

                
                {user ? <><MenuItem>{user.username}</MenuItem><Link to="/profile"><MenuImg src={user.img}/></Link> <MenuItem><button onClick={handleLogout} style={{cursor:"pointer"}}>Logout</button></MenuItem> </>:
                <><Link to="/register" style={{textDecoration:"none", color:"inherit"}}> <MenuItem>Register</MenuItem></Link> <Link to="/login" style={{textDecoration:"none", color:"inherit"}}><MenuItem>Login</MenuItem></Link> </>}
                
                <Link to="/cart">
                <MenuItem>

                <Badge badgeContent={quantity} color="primary">
                    <ShoppingCartOutlined />
                </Badge>

                </MenuItem>
                </Link>
            </Right>
        
        </Wrapper>

        
        
    </Container>




  )
}

export default Navbar