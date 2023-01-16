import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { getType } from '../api/type'

// 异步获取
export const  getTypeList=createAsyncThunk(
    'type/getTypeList',
    async (_,action)=>{
        const response=await getType()
        return response.data
    }
)

export const typeSlice =createSlice({
    name:'type',
    initialState:{

        typeList:[]
    },
    reducers:{
        initUserInfo:(state,{payload})=>{
                state.userInfo=payload
        },

    },
    extraReducers:{
        [getTypeList.fulfilled]:(state,{payload})=>{
            state.typeList=payload
    },

    }
})


// export const {}=typeSlice.actions
export default typeSlice.reducer