import Cookies from "js-cookie";
import { API_BASE_URL } from "../utils/constants";
import { getToday } from "../utils/helpers";

const BASE_URL = API_BASE_URL + "/bookings";
const accessToken = Cookies.get("access_token");

export async function getBookings(page) {
  if (!accessToken) return null;

  let url = BASE_URL;
  if (page) url = BASE_URL + `?page=${page}`;

  const res = await fetch(url, {
    // mode: "no-cors",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      authorization: `Bearer ${accessToken}`,
    },
    // credentials: "include",
  });

  const {
    data: { data: bookings, ...pageData },
    error,
    message,
  } = await res.json();
  if (error) {
    console.error(error);
    throw new Error("Bookings could not be found.");
  }
  if (message) {
    console.error(message);
    throw new Error(message);
  }
  return { bookings, pageData };
}

export async function getBooking(id) {
  if (!accessToken) return null;

  const url = BASE_URL + `/${id}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      authorization: `Bearer ${accessToken}`,
    },
  });
  const { data, error } = await res.json();
  if (error) {
    console.error(error);
    throw new Error("Booking could not be found.");
  }
  return data;
}

export async function deleteBooking(id) {
  if (!accessToken) return null;

  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      authorization: `Bearer ${accessToken}`,
    },
  });
  const { success, error } = await res.json();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted.");
  }

  return success;
}

export async function updateBooking(id, obj) {
  if (!accessToken) return null;

  const url = BASE_URL + `/${id}`;
  const res = await fetch(url, {
    method: "PATCH",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      authorization: `Bearer ${accessToken}`,
    },
  });
  const { data, error } = await res.json();
  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}
// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  if (!accessToken) return null;
 
  const url = `${BASE_URL}/where`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      where:[ { column: "created_at", oprator: ">", value: date }],
    }),
  });

  const { data, error, message } = await res.json();
  if (error) {
    console.error(error);
    throw new Error("Bookings could not be found.");
  }
  if (message) {
    console.error(message);
    throw new Error(message);
  }
  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  if (!accessToken) return null;

  const url = `${BASE_URL}/where`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      where:[ { column: "start_date", oprator: ">", value: date }],
    }),
  });

  const { data, error, message } = await res.json();
  if (error) {
    console.error(error);
    throw new Error("Bookings could not be found.");
  }
  if (message) {
    console.error(message);
    throw new Error(message);
  }
  return data;
}

export async function getStaysTodayActivity() {
  if (!accessToken) return null;
  const url = `${BASE_URL}/where`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      where: [
        { column: "status", oprator: "=", value: "unconfirmed" },
        { column: "start_date", oprator: "<=", value: getToday() },
      ],
      orwhere: [
        { column: "status", oprator: "=", value: "checked-in" },
        { column: "end_date", oprator: ">=", value: getToday() },
      ],
    }),
  });

  const { data, error, message } = await res.json();
  if (error) {
    console.error(error);
    throw new Error("Bookings could not be found.");
  }
  if (message) {
    console.error(message);
    throw new Error(message);
  }
  return data;
}

// Activity means that there is a check in or a check out today
// export async function getStaysTodayActivity1() {
//   const { data, error } = await supabase
//     .from("bookings")
//     .select("*, guests(fullName, nationality, countryFlag)")
//     .or(
//       `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
//     )
//     .order("created_at");

//   // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
//   // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
//   // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

//   if (error) {
//     console.error(error);
//     throw new Error("Bookings could not get loaded");
//   }
//   return data;
// }

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
/*
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
  .from("bookings")
  .select("created_at, totalPrice, extrasPrice")
  .gte("created_at", date)
  .lte("created_at", getToday({ end: true }));
  
  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  
  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}



export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}

*/
