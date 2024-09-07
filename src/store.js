import { configureStore, createSlice } from '@reduxjs/toolkit'
import  user from './store/userSlice.js';

const cart = createSlice({
    name: 'cart',
    initialState: [
        { id: 0, name: 'White and Black', count: 2 },
        { id: 2, name: 'Grey Yordan', count: 1 }
    ],
    reducers: {
        changeQuantity(state, action) {
            return state.map((item, id) => {
                if (id === action.payload) {
                    return { ...item, count: item.count + 1 };
                }
                return item;
            });
        },
        addItem(state, action){
            const existingItem = state.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.count += 1;
            } else {
                state.push({ ...action.payload, count: 1 });
            }
        }
    }
});


export let {changeQuantity , addItem} = cart.actions

export default configureStore({
    reducer: {
        user: user.reducer,
        // stock : stock.reducer,
        cart: cart.reducer
    }
}) 