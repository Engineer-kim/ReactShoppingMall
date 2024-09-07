import { createSlice } from '@reduxjs/toolkit';

let user = createSlice({    //useState 과 비슷함
    name: 'user',
    initialState: { name: 'kim', age: 20 },
    reducers: {
        changeName(state) {
            state.name = 'park'; 
        }
    }
});

export let {changeName} = user.actions
export default user;