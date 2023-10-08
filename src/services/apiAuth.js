import Cookies from "js-cookie";
import { API_BASE_URL } from "../utils/constants";

const accessToken = Cookies.get("access_token");

export async function signup(userData) {
  try {
    const res = await fetch(API_BASE_URL + "/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
    throw new error("Somthing went wrong while signing up!");
  }
}

export async function login({ email, password }) {
  if (!email || !password) return;

  try {
    const res = await fetch(API_BASE_URL + "/login", {
      // mode: "no-cors",
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // "X-XSRF-TOKEN": xsrfToken,
      },
    });

    if (!res.ok) {
      const errorResponse = await res.json();
      console.error("Login failed:", errorResponse.message);
      throw new Error("Login failed");
    }

    const { data } = await res.json();

    // // Set a secure HttpOnly cookie with an expiration time
    const expirationTime = new Date();
    expirationTime.setDate(expirationTime.getDate() + 7); // Set to expire in 7 days
    document.cookie = `access_token=${
      data.token
    }; path=/; secure;  expires=${expirationTime.toUTCString()}`;

    return data;
  } catch (error) {
    console.error("Error during login:", error);
    throw new Error("Login failed");
  }
}

export async function getCurrentUser() {
  if (!accessToken) return null;

  const res = await fetch(API_BASE_URL + "/user", {
    method: "GET",
    headers: {
      Accept: "application/json",
      authorization: `Bearer ${accessToken}`,
    },
  });

  const { data, error } = await res.json();
  if (error) {
    console.error(error);
    throw new Error("fetching user failed!");
  }

  return data;
}

export async function logout() {
  if (!accessToken) return null;

  try {
    const res = await fetch(API_BASE_URL + "/logout", {
      method: "POST",
      headers: {
        Accept: "application/json",
        authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      console.error(`Logout request failed with status ${res.status}`);
      throw new Error("Logout request failed");
    }

    const responseBody = await res.text();

    if (responseBody) {
      try {
        const responseData = JSON.parse(responseBody);

        if (responseData.message) {
          console.error(responseData.message);
          throw new Error("Logging out failed.");
        }
      } catch (jsonError) {
        console.error("Error parsing JSON response:", jsonError);
        throw new Error("Logout failed due to JSON parsing error.");
      }
    }
  } catch (error) {
    console.error("Error during logging out:", error);
    throw new Error("Logout failed");
  }
}

// export async function logout() {
//   if (!accessToken) return null;

//   try {
//     const res = await fetch(API_BASE_URL + "/logout", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         authorization: `Bearer ${accessToken}`,
//       },
//     });
//     const { message } = await res.json();
//     if (message) {
//       console.error(message);
//       throw new Error("Logging out failed.");
//     }
//   } catch (error) {
//     console.error("Error during logging out:", error);
//     throw new Error("Logout failed");
//   }
// }
