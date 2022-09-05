import { AccountCircle, ArrowForwardIos, Redeem } from '@material-ui/icons';
import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'

const Container = styled.div`
    flex: 1;
    height: calc(100vh - 50px);
    position: sticky;
    top: 50px;
    background-color: teal;
`;

const Wrapper = styled.div`
    
    padding: 20px;
    color: white;
    margin-left: 20px;
    
`;
const MenuItem = styled.div`
    display: flex;
    margin-bottom: 30px;
    
    
    font-size: 25px;
    align-items: center;
    cursor: pointer;

    &:hover {
        background-color: rgb(63, 137, 141);
    }
    

`;

const Sidebar = () => {
  return (
    <Container>
        <Wrapper>
            <Link to="/profile" style={{textDecoration: "none", color:"inherit"}}>
            <MenuItem>
                <AccountCircle style={{marginRight:"20px"}}/>
                Profile
                <ArrowForwardIos style={{marginLeft:"20px"}}/>
                
            </MenuItem>
            </Link>
            <Link to="/profile/orders"  style={{textDecoration: "none", color:"inherit"}}>
            <MenuItem>
            <Redeem  style={{marginRight:"20px"}}/>
                Orders
                <ArrowForwardIos style={{marginLeft:"20px"}}/>
            </MenuItem>
            </Link>
        </Wrapper>
    </Container>
  )
}

export default Sidebar