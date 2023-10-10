import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import { useCabins } from "../cabins/useCabins";
import Stats from "./Stats";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { bookings, isLoading: isLoading1, numDays } = useRecentBookings();
  const { stays, confirmedStays, isLoading: isLoading2 } = useRecentStays();
  const { cabins, isLoading: isLoading3 } = useCabins();

  if (isLoading1 || isLoading2 || isLoading3) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats bookings={bookings} numCabins={cabins?.length} numDays={numDays} confirmedStays={confirmedStays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
