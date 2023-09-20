import { useState } from "react";
import { isFuture, isPast, isToday } from "date-fns";
import Button from "../ui/Button";
import { subtractDates } from "../utils/helpers";

import { bookings } from "./data-bookings";
import { cabins } from "./data-cabins";
import { guests } from "./data-guests";

// const originalSettings = {
//   minBookingLength: 3,
//   maxBookingLength: 30,
//   maxGuestsPerBooking: 10,
//   breakfastPrice: 15,
// };

const BASE_URL = `http://127.0.0.1:8000/api/`;

async function deleteGuests() {
  const { error } = await fetch(`${BASE_URL}guests/empty`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (error) console.log(error.message);
}

async function deleteCabins() {
  const { error } = await fetch(`${BASE_URL}cabins/empty`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (error) console.log(error.message);
}

async function deleteBookings() {
  const { error } = await fetch(`${BASE_URL}bookings/empty`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (error) console.log(error.message);
}

async function createGuests() {
  const { error } = await fetch(`${BASE_URL}guests`, {
    method: "POST",
    body: JSON.stringify(guests),
    headers: { "Content-Type": "application/json" },
  });

  if (error) console.log(error.message);
}

async function createCabins() {
  const { error } = await fetch(`${BASE_URL}cabins`, {
    method: "POST",
    body: JSON.stringify(cabins),
    headers: { "Content-Type": "application/json" },
  });

  if (error) console.log(error.message);
}

async function createBookings() {
  const allGuestIds = Array.from({ length: 30 }, (_, index) => index + 1);

  const allCabinIds = Array.from({ length: 8 }, (_, index) => index + 1);

  const finalBookings = bookings.map((booking) => {
    // Here relying on the order of cabins, as they don't have an ID yet
    const cabin = cabins.at(booking.cabinId - 1);
    const numNights = subtractDates(booking.endDate, booking.startDate);
    const cabinPrice = numNights * (cabin.regular_price - cabin.discount);
    const extrasPrice = booking.hasBreakfast
      ? numNights * 15 * booking.numGuests
      : 0; // hardcoded breakfast price
    const totalPrice = cabinPrice + extrasPrice;

    let status;
    if (
      isPast(new Date(booking.endDate)) &&
      !isToday(new Date(booking.endDate))
    )
      status = "checked-out";
    if (
      isFuture(new Date(booking.startDate)) ||
      isToday(new Date(booking.startDate))
    )
      status = "unconfirmed";
    if (
      (isFuture(new Date(booking.endDate)) ||
        isToday(new Date(booking.endDate))) &&
      isPast(new Date(booking.startDate)) &&
      !isToday(new Date(booking.startDate))
    )
      status = "checked-in";

    const {
      startDate: start_date,
      endDate: end_date,
      created_at,
      hasBreakfast: has_breakfast,
      observations,
      isPaid: is_paid,
      numGuests: num_guests,
    } = booking;

    return {
      num_nights: numNights,
      cabin_price: cabinPrice,
      extras_price: extrasPrice,
      total_price: totalPrice,
      guest_id: allGuestIds.at(booking.guestId - 1),
      cabin_id: allCabinIds.at(booking.cabinId - 1),
      status,
      start_date,
      end_date,
      created_at,
      has_breakfast,
      observations,
      is_paid,
      num_guests,
    };
  });

  console.log(JSON.stringify(finalBookings));

  const { error } = await fetch(`${BASE_URL}bookings`, {
    method: "POST",
    body: JSON.stringify(finalBookings),
    headers: { "Content-Type": "application/json" },
  });
  if (error) console.log(error.message);
}

function Uploader() {
  const [isLoading, setIsLoading] = useState(false);

  async function uploadAll() {
    // console.log(JSON.stringify(guests));
    //   setIsLoading(true);
    //   // Bookings need to be deleted FIRST
    //   await deleteBookings();
    //   await deleteGuests();
    //   await deleteCabins();

    //   // Bookings need to be created LAST
    //   await createGuests();
    //   await createCabins();
    await createBookings();

    //   setIsLoading(false);
  }

  async function uploadBookings() {
    setIsLoading(true);
    await deleteBookings();
    await createBookings();
    setIsLoading(false);
  }

  return (
    <div
      style={{
        marginTop: "auto",
        backgroundColor: "#e0e7ff",
        padding: "8px",
        borderRadius: "5px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <h3>SAMPLE DATA</h3>

      <Button onClick={uploadAll} disabled={isLoading}>
        Upload ALL
      </Button>

      <Button onClick={uploadBookings} disabled={isLoading}>
        Upload bookings ONLY
      </Button>
    </div>
  );
}

export default Uploader;
