export async function getCabins() {
  const res = await fetch(`http://127.0.0.1:8000/api/cabins`, {
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
  const res = await fetch(`http://127.0.0.1:8000/api/cabins/${id}`, {
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

export async function createCabin(newCabin) {
  const res = await fetch(`http://127.0.0.1:8000/api/cabins`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newCabin),
  });
  const { success, error } = await res.json();

  if (error) {
    const { name, regular_price, max_capacity } = error;
    console.error(error);
    if (name) throw new Error(name);
    if (max_capacity) throw new Error(max_capacity);
    if (regular_price) throw new Error(regular_price);
    throw new Error(error);
  }

  return success;
}
