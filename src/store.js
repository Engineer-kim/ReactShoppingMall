import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice.js';

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
        addItem(state, action) {
            const existingItem = state.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.count += 1;
            } else {
                state.push({ ...action.payload, count: 1 });
            }
        },
        minusItem(state, action){
            const idx = action.payload;
            const existingItem = state[idx]; 
            if (existingItem) {
                if (existingItem.count > 0) {
                    existingItem.count -= 1;
                    if (existingItem.count === 0) {// 수량이 0 이 되었을때
                        //findIndex는  있으면 1 없으면 -1
                        const findDeleteProduct = state.findIndex(item => item.id === existingItem.id);
                        if (findDeleteProduct !== -1) {
                            state.splice(findDeleteProduct, 1);
                        }
                    }
                }
            }
        }
    }
});


export let { changeQuantity, addItem ,minusItem } = cart.actions

export default configureStore({
    reducer: {
        user: user.reducer,
        // stock : stock.reducer,
        cart: cart.reducer
    }
}) 