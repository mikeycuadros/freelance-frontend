const BASE_URL = import.meta.env.VITE_API_URL;

export async function getUserChats() {
  const res = await fetch(`${BASE_URL}/chats`, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  });
  if (!res.ok) throw new Error("Error al obtener los chats");
  return await res.json();
}

export async function getChatMessages(chatId) {
  const res = await fetch(`${BASE_URL}/chats/${chatId}/messages`, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  });
  if (!res.ok) throw new Error("Error al obtener los mensajes del chat");
  return await res.json();
}

export async function sendMessageToChat(chatId, content) {
  const res = await fetch(`${BASE_URL}/chats/${chatId}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify({ content })
  });
  if (!res.ok) throw new Error("Error al enviar el mensaje");
  return await res.json();
}