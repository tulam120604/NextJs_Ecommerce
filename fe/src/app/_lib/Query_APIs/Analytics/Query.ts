import { useQuery } from "@tanstack/react-query";
import {
  caculate_revenue,
  summary,
} from "../../Services/Service_Analytics/Caculate_revenue";

export function Query_caculate_revenue() {
  const { data, ...rest } = useQuery({
    queryKey: ["CACULATE_REVENUE"],
    queryFn: () => caculate_revenue(),
  });
  return { data, ...rest };
}

//count product, category, user,...
export function Query_summary() {
  const { data, ...rest } = useQuery({
    queryKey: ["SUMMARY"],
    queryFn: () => summary(),
  });
  return { data, ...rest };
}
