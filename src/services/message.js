const BASE_URL = import.meta.env.VITE_API_URL;

const fetchFromApi = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    if (!response.ok) throw new Error("Error en la petición");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export async function getAllMessages() {
  return fetchFromApi("/message");
}

export async function getMessageById(id) {
  return fetchFromApi(`/message/${id}`);
}

export async function getMessagesByUser(userId) {
  return fetchFromApi(`/message/user/${userId}`);
}

export async function sendMessage(data) {
  const res = await fetch(`${BASE_URL}/message/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al enviar el mensaje");
  return await res.json();
}

export async function deleteMessage(id) {
  const res = await fetch(`${BASE_URL}/message/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!res.ok) throw new Error("Error al eliminar el mensaje");
  return true;
}
