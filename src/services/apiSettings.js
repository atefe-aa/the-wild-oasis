const BASE_URL = `http://127.0.0.1:8000/api/settings`;

export async function getSettings() {
  const res = await fetch(BASE_URL, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const { data, error } = await res.json();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be found.");
  }
  return data[0];
}

// We expect a newSetting object that looks like {setting: newValue}
export async function updateSetting(newSetting, id=1) {
  console.log(newSetting)
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify(newSetting),
    headers: { "Content-Type": "application/json" },
  });

  const { error, data, success } = await res.json();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be updated");
  }
  return { data, success };
}
