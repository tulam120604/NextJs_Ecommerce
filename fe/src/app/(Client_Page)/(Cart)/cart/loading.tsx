import LoadingPage from "@/src/app/Components/Loadings/LoadingPage"
import { Skeleton } from "@/src/app/Components/ui/Skeleton/skeleton"

const LoadingCart = () => {
  return (
    <Skeleton className="lg:grid grid-cols-[60vw_38vw] h-[70vh] justify-between">
      <Skeleton></Skeleton>
      <Skeleton></Skeleton>
    </Skeleton>
  )
}

export default LoadingCart