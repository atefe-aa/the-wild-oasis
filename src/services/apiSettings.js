import { API_BASE_URL } from "../utils/constants";

const BASE_URL = API_BASE_URL + "/settings";

export async function getSettings() {
  const res = await fetch(BASE_URL, {
    method: "GET",
    headers: { "Content-Type": "application/json",  Accept: "application/json"  },
  });
  const { data, error } = await res.json();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be found.");
  }
  return data[0];
}

// We expect a newSetting object that looks like {setting: newValue}
export async function updateSetting(newSetting, id = 1) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify(newSetting),
    headers: { "Content-Type": "application/json",  Accept: "application/json"  },
  });

  const { error, data, success } = await res.json();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be updated");
  }
  return { data, success };
}
