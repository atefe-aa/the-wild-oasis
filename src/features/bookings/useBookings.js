import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const [searchParams] = useSearchParams();
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const { isLoading, data:{bookings, pageData} = {}, error } = useQuery({
    queryKey: ["bookings", page],
    queryFn: () => getBookings(page),
  });


  return { isLoading, error, bookings, pageData };
}
