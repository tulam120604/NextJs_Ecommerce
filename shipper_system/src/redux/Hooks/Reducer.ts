import { createSlice } from '@reduxjs/toolkit';
import { fetchData, updateData } from './Thunk';

const initialState: { data: [], status?: string, error?: string } = {
    data: [],
    status: '',
    error: ''
}

const sliceRedux = createSlice({
    name: "order_slice",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.status = 'resolve';
                state.data = action.payload
            })
            .addCase(fetchData.rejected, (state) => {
                state.status = 'reject'
            })
            .addCase(updateData.fulfilled, (state, action) => {
                state.status = 'resolve';
                console.log(action)
            })
    }
})

export default sliceRedux.reducer