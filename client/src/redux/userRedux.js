import {createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name:"user",
    initialState:{
        currentUser: null,
        orders: [],
        isFetching: false,
        error: false,
        
        
    },
    reducers:{
        loginStart:(state)=>{
            state.isFetching = true;
            state.error = false;
        },
        loginSuccess:(state, action)=>{
            state.isFetching = false;
            state.currentUser = action.payload;
            state.error = false;
        },
        loginFailure:(state)=>{
            state.isFetching = false;
            state.error = true;
        },
        logout:(state)=>{
            state.currentUser = null
            state.error = false;
            state.isFetching = false;

        },
        //UPDATE
        updateClientStart:(state)=>{
            state.isFetching = true;
            state.error = false;
        },
        updateClientSuccess:(state, action)=>{
            state.isFetching = false;
            state.error = false;
            
            state.currentUser = 
            {...state.currentUser, ...action.payload.client};
        },
        updateClientFailure:(state)=>{
            state.isFetching = false;
            state.error = true;
        },
        //ORDERS
        getOrderStart:(state)=>{
            state.isFetching = true;
            state.error = false;
        },
        getOrderSuccess:(state, action)=>{
            state.isFetching = false;
            state.error = false;
            
            state.orders = action.payload
        },
        getOrderFailure:(state)=>{
            state.isFetching = false;
            state.error = true;
        },
    },
});

export const {loginStart, loginSuccess, loginFailure, logout ,updateClientFailure, updateClientSuccess, updateClientStart, getOrderStart, getOrderSuccess, getOrderFailure} = userSlice.actions
export default userSlice.reducer;