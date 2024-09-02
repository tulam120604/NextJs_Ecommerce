import { useDispatch, useSelector } from "react-redux"
import { fetchData } from "../../redux/Hooks/Thunk";
import { useEffect } from "react";
import { DataTable } from "@/_Components/Data_Table/page";
import { columns } from "@/_Components/Data_Table/columns";

export default function List_Item() {
  const { data, status } = useSelector((state: any) => state?.order);
  const disPatch = useDispatch<any>();
  useEffect(() => {
    disPatch(fetchData({
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjgwMDcwMzQ1ZGQ0ZmI0MzM5MDg2NjgiLCJpYXQiOjE3MjUxMDQyODMsImV4cCI6MTcyNTE5MDY4M30.oo14LEpoc6shbXeJgVrYRdiW-vrg1FjTbSD1qUdxWnY"
    }))
  }, [disPatch]);
  if (status === 'loading') {
    return <span>Loading...</span>
  }
  return (
    <>
      {
        data?.data &&
          <DataTable data={data?.data?.docs} columns={columns} />
      }
    </>
  )
}
