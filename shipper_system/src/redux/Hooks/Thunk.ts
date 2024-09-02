import { createAsyncThunk } from '@reduxjs/toolkit';
import { detail_item_order, list_item_order, update_status_item_order } from '../../services/shipper_system';

export const fetchData = createAsyncThunk(
    'order/GET',
    async (dataBody: { token: string, id?: string | number }) => {
        if (dataBody?.id) {
            return await detail_item_order(dataBody)
        }
        return await list_item_order(dataBody?.token)
    }
)

export const updateData = createAsyncThunk(
    'order/UPDATE',
    async (dataBody: { status: string | number, id_order: string | number, user_id: string | number }) => {
        return await update_status_item_order(dataBody)
    }
)