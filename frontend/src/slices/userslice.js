import {createSlice} from '@reduxjs/toolkit';
const initialState={
    users:[],
};
 const usersSlice=createSlice({
    initialState,
    name:'user',
    reducers:{
        setUsers:(state,action)=>{
            state.users=action.payload;
            state.isAuthenticated=true;
        },
        logout:(state)=>{
            state.users=null;
            state.isAuthenticated=false;
        }
    },
});
export default usersSlice.reducer;
export const{setUsers,logout}=usersSlice.actions