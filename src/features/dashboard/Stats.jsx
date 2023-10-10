import Stat from "./Stat";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numCabins, numDays }) {
  //1.
  const numBookings = bookings?.length;

  //2.
  const sales = bookings?.reduce((acc, cur) => acc + cur.total_price, 0);

  //3.
  const checkins = confirmedStays?.length;

  //4.
  const occupation = confirmedStays?.reduce(
    (acc, cur) => acc + cur.num_nights,
    0
  )/(numCabins * numCabins)

  return (
    <>
      <Stat
        title="Bookings"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
        color="blue"
      />{" "}
      <Stat
        title="Sales"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
        color="green"
      />{" "}
      <Stat
        title="Check ins"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
        color="indigo"
      />{" "}
      <Stat
        title="Occupance Rate"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + "%"}
        color="yellow"
      />
    </>
  );
}

export default Stats;
