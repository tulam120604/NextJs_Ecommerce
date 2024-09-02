import { configureStore } from '@reduxjs/toolkit';
import sliceOrder from './Hooks/Reducer'

export const store_Redux = configureStore({
    reducer: {
        order: sliceOrder
    }
})
