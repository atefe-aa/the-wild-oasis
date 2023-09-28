import { API_BASE_URL } from "../utils/constants";

export async function login({ email, password }) {
  const url = API_BASE_URL + "/login";
// const url = "http://localhost:8000/login"

  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  });
  const { data, error } = await res.json();
  if (error) {
    console.error(error);
    throw new Error("login failed!");
  }

  console.log(data)
  return data;
}
