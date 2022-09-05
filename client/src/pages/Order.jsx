import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';

import styled from 'styled-components'
import Announcement from '../components/Announcement';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { getOrders } from '../redux/apiCalls';
import { logout } from '../redux/userRedux';

const Container = styled.div`
    display: flex;
`;

const Wrapper = styled.div`
    flex: 6;
`;

const Order = () => {

    const dispatch = useDispatch();

    const orders = useSelector((state)=> state.persistedReducer.user?.orders);
    const userTest = useSelector((state)=> state.persistedReducer.user);
    console.log(userTest)
    console.log(orders)

    //GETS CURRENT USER USING ID
    const user = useSelector(state=> state.persistedReducer.user?.currentUser);
    const userId = user ? user._id : "";

    useEffect(()=>{
        console.log("HIIIIIIIIIIIIIIII")
        try {
          getOrders(userId, dispatch);
        } catch (error) {
          console.log("Token has expired...")
          console.log("Dispatching Logout...")
          dispatch(logout());
        }
        
      },[dispatch]);
    
      

    const columns = [
        { field: 'orderId', headerName: 'Order ID', width: 220 },
        { field: 'dataProducts', headerName: 'Products', width: 300, renderCell: (params)=>{
          return(

              <>
              <p>{params.row.dataProducts}</p>
              </>
              
              
          )
        }
       },
        
        {
            field: 'amount',
            headerName: 'Total Cost',
            width: 160,
          },
          {
            field: 'status',
            headerName: 'Status',
            width: 120,
          },
          {
            field:"createdAt",
            headerName:"Date Ordered",
            width: 150,
            renderCell: (params)=>{
              const createdDate = new Date(params.row.createdAt).toDateString();
                return(

                    <>
                    <p>{createdDate}</p>
                    </>
                    
                    
                );
            },
          },
        
          
      ];

  return (
    <>
    <Announcement/>
    <Navbar/>
    <Container>
        <Sidebar/>
        <Wrapper>
            {orders ? 
            <>
            <div className="userList" style={{height:"80%"}}>
                <DataGrid
                
                rows={orders}
                disableSelectionOnClick
                columns={columns}
                getRowHeight={() => 'auto'}
                getRowId={(row)=>row._id}
                pageSize={8}
                checkboxSelection
                />
            </div></>: 
            <h3>Sorry no orders have been made on this account...</h3>}
            
        </Wrapper>
        
    </Container>
    </>
  )
}

export default Order