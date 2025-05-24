const BASE_URL = import.meta.env.VITE_API_URL;

export const getUserChats = async () => {
  try {
    const response = await fetch(`${BASE_URL}/chats`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error("Error al obtener los chats", error);
  }
};

// Nueva función para obtener un chat específico por su ID
export const getChatById = async (chatId) => {
  try {
    const response = await fetch(`${BASE_URL}/chats/${chatId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error("Error al obtener el chat", error);
  }
};
