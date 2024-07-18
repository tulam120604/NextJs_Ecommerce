'use client';

import LoadingPage from "@/src/app/Components/Loadings/LoadingPage";
import { Suspense } from "react"

const Setting_Admin = () => {
  return (
    <Suspense fallback={<LoadingPage/>}>
      <div>page</div>
    </Suspense>
  )
}

export default Setting_Admin