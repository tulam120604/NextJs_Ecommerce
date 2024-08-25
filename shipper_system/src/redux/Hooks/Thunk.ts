import { createAsyncThunk } from '@reduxjs/toolkit';
import { get_item_order } from '../../services/shipper_system';

export const fetch_data_order = createAsyncThunk(
    'data_order/get',
    async (dataClient: any) => {
        return await get_item_order(dataClient)
    }
)