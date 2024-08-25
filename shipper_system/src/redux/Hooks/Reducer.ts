import { createSlice } from '@reduxjs/toolkit';
import { fetch_data_order } from './Thunk';

interface I_initial_state {
    data?: [],
    status?: string,
    error?: string
}

const initial_state: I_initial_state = {
    data: [],
    status: '',
    error: ''
}


export const useSliceRedux = createSlice({
    name: 'shipper_system_order',
    initialState: initial_state,
    reducers: {},
    extraReducers: (builder: any) => {
        builder
            .addCase(fetch_data_order.pending, (state: { status: string }) => {
                state.status = 'pending'
            })
            .addCase(fetch_data_order.fulfilled, (state: I_initial_state, action: { payload: any }) => {
                state.status = 'success',
                    state.data = action.payload
            })
            .addCase(fetch_data_order.rejected, (state: { status: string }) => {
                state.status = 'error'
            })
    }
});


export default useSliceRedux.reducer