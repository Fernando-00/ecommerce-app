import {createSlice} from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        products:[],
        quantity: 0,
        total: 0,
    },
    reducers:{
        addProduct:(state, action) =>{
            console.log("HELLO")
            const index = state.products.findIndex((item)=>item._id===action.payload._id && item.color===action.payload.color && item.size===action.payload.size);
            
            state.total += action.payload.storePrice * action.payload.quantity;
            if(index != -1){
                state.quantity += action.payload.quantity;
                state.products[index].quantity += action.payload.quantity;
            }else{
                state.quantity += 1;
                state.products.push(action.payload);
                
            }
            
        },
        deleteProduct:(state, action) =>{
            console.log("WORKING")
            const index = state.products.findIndex((item)=>item._id===action.payload._id && item.color===action.payload.color && item.size===action.payload.size);
            state.total -= state.products[index].storePrice * state.products[index].quantity;
            state.quantity -= state.products[index].quantity;
            
            state.products.splice(
                state.products.findIndex((item)=>item._id===action.payload._id), 
                1
            );
            
        },
        deleteSingleProduct:(state, action) =>{
            console.log("WORKING")
            state.quantity -= 1;
            const index = state.products.findIndex((item)=>item._id===action.payload._id && item.color===action.payload.color && item.size===action.payload.size);
            state.total -= state.products[index].storePrice;
            
            if(state.products[index].quantity > 0){
                state.products[index].quantity -= 1;
                if(state.products[index].quantity <= 0){
                    state.products.splice(
                        state.products.findIndex((item)=>item._id===action.payload), 
                        1
                    );
                }
            }else{
                state.products.splice(
                    state.products.findIndex((item)=>item._id===action.payload), 
                    1
                );
            }
            
            
        },
        clearCart:(state, action) =>{
            state.quantity = 0;
            state.products= [];
            state.total = 0;
        },
    },
});

export const {addProduct, clearCart, deleteProduct, deleteSingleProduct} = cartSlice.actions
export default cartSlice.reducer;