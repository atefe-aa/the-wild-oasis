import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import { useBookings } from "./useBookings";
import Spinner from "../../ui/Spinner";
import { useSearchParams } from "react-router-dom";

function BookingTable() {
  const { bookings, isLoading } = useBookings();
  const [searchParams] = useSearchParams();
  if (isLoading) return <Spinner />;

  //1)Filter
  const filterValue = searchParams.get("status") || "all";
  let filteredBookings;
  if (filterValue === "all") filteredBookings = bookings;
  if (filterValue === "checked-out")
    filteredBookings = bookings.filter(
      (booking) => booking.status === "checked-out"
    );
  if (filterValue === "checked-in")
    filteredBookings = bookings.filter(
      (booking) => booking.status === "checked-in"
    );
  if (filterValue === "unconfirmed")
    filteredBookings = bookings.filter(
      (booking) => booking.status === "unconfirmed"
    );

  //2)SORT
  const sortBy = searchParams.get("sortBy") || "start_date-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  let sortedBookings;
  if (field === "start_date") {
    sortedBookings = filteredBookings.sort(
      (a, b) => (new Date(a[field]) - new Date(b[field])) * modifier
    );
  } else {
    sortedBookings = filteredBookings.sort(
      (a, b) => (a[field] - b[field]) * modifier
    );
  }

  if (!bookings?.length) return <Empty resource="bookings" />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedBookings}
          render={(booking) => (
            <BookingRow key={booking.bookingId} booking={booking} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default BookingTable;
