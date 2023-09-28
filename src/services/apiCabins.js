import { API_BASE_URL } from "../utils/constants";

const BASE_URL = API_BASE_URL + "/cabins";
const storagePath = "http://127.0.0.1:8000/storage/cabins/";

export async function getCabins() {
  const res = await fetch(BASE_URL, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const { data, error } = await res.json();

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be found.");
  }

  return data;
}

export async function deleteCabin(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  const { success, error } = await res.json();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted.");
  }

  return success;
}

//use formData so you don't need JSON.stringify which would prevent image to be uploaded
export async function createUpdateCabin(newCabin, id) {
  const formData = new FormData();
  formData.append("name", newCabin.name);
  formData.append("regular_price", newCabin.regular_price);
  formData.append("max_capacity", newCabin.max_capacity);
  formData.append("description", newCabin.description);
  formData.append("discount", newCabin.discount);
  formData.append("image", newCabin.image); // Assuming "image" is the key for the image file

  const hasImagePath = Boolean(newCabin.image?.startsWith?.(storagePath));

  let url = BASE_URL;
  if(id) url =  `${BASE_URL}/${id}`;

  let request = "";
  if (hasImagePath) {
    request = await fetch(url, {
      method: "POST",
      body: JSON.stringify({newCabin}),
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!hasImagePath) {
    request = await fetch(url, {
      method: "POST",
      body: {formData},
    });
  }

  const res =  request;

  const { data, success, error } = await res.json();

  if (error) {
    const { name, regular_price, max_capacity, image } = error;
    console.error(error);
    if (name) throw new Error(name);
    if (max_capacity) throw new Error(max_capacity);
    if (regular_price) throw new Error(regular_price);
    if (image) throw new Error(image);
    console.error(error);
    throw new Error("Error creating cabin.");
  }

  return {success, data};
}
