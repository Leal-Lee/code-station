import { createSlice } from '@reduxjs/toolkit'

export const userSlice =createSlice({
    name:'user',
    initialState:{
        isLogin:false,
        userInfo:{}
    },
    reducers:{
        initUserInfo:(state,{payload})=>{
                state.userInfo=payload
        },
        changeLoginStatus:(state,{payload})=>{
            state.isLogin=payload

    },
    clearUserInfo:(state)=>{
        state.userInfo={}
    }
    }
})

export const {initUserInfo,changeLoginStatus,clearUserInfo}=userSlice.actions
export default userSlice.reducer