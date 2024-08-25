import { configureStore } from '@reduxjs/toolkit';
import useSliceRedux from './Hooks/Reducer';


export default configureStore({
    reducer: {
        shipper_system: useSliceRedux
    }
})