import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '../(Pages)/Layout'
import List_Item from '../(Pages)/List_Item/page'
import Detail_Item from '@/(Pages)/[Detail_Item]/page'

export default function Router_Page() {
    return (<>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                <Route index element={<List_Item/>}/>
                <Route path='/shop' element={<Detail_Item/>}/>
                </Route>
            </Routes>
        </BrowserRouter>

    </>)
}
