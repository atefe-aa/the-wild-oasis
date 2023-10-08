import Cookies from "js-cookie";
import { API_BASE_URL } from "../utils/constants";

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
  const accessToken = Cookies.get("access_token");
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
