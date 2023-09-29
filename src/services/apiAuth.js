import { API_BASE_URL } from "../utils/constants";

export async function login({ email, password }) {
  const res = await fetch(API_BASE_URL + "/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  });
  const { data, error } = await res.json();
  if (error) {
    console.error(error);
    throw new Error("login failed!");
  }

  console.log(data);
  return data;
}

export async function getCurrentUser() {
  const res = await fetch(API_BASE_URL + "/user", {
    method: "GET",
    credentials: "include", // Include cookies in the request
    headers: {  Accept: "application/json" },
  });

  const { data, error } = await res.json();
  if (error) {
    console.error(error);
    throw new Error("fetching user failed!");
  }

  console.log(data);
  return data;
}
