import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/Button";
import { getUserChats, getChatMessages, sendMessageToChat } from "../services/chat";

const Messages = () => {
  const { user } = useAuth();
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newMessage, setNewMessage] = useState({ content: "" });

  useEffect(() => {
    if (user) {
      setLoading(true);
      getUserChats()
        .then(setChats)
        .catch(() => setError("No se pudieron cargar los chats"))
        .finally(() => setLoading(false));
    }
  }, [user]);

  const handleSelectChat = async (chat) => {
    setSelectedChat(chat);
    setLoading(true);
    try {
      const messages = await getChatMessages(chat.id);
      setChatMessages(messages);
    } catch {
      setError("No se pudieron cargar los mensajes");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setNewMessage({ content: e.target.value });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.content.trim() || !selectedChat) return;
    try {
      await sendMessageToChat(selectedChat.id, newMessage.content);
      setNewMessage({ content: "" });
      handleSelectChat(selectedChat); // Recargar mensajes
    } catch {
      setError("No se pudo enviar el mensaje");
    }
  };

  if (loading) {
    return <div className="text-center py-10">Cargando mensajes...</div>;
  }

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Mensajes</h1>
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex h-[600px]">
            {/* Lista de chats */}
            <div className="w-1/3 border-r">
              <div className="p-4 border-b">
                <h2 className="font-semibold">Conversaciones</h2>
              </div>
              <div className="overflow-y-auto h-[calc(600px-57px)]">
                {chats.length === 0 ? (
                  <p className="text-center py-4 text-gray-500">No tienes chats</p>
                ) : (
                  chats.map((chat) => {
                    // Encuentra el otro participante
                    const otherUser = chat.participants.find(u => u.id !== user.id);
                    return (
                      <div
                        key={chat.id}
                        className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                          selectedChat && selectedChat.id === chat.id ? 'bg-purple-50' : ''
                        }`}
                        onClick={() => handleSelectChat(chat)}
                      >
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center mr-3">
                            <span className="font-semibold text-purple-800">
                              {otherUser?.username?.charAt(0) || "U"}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-medium">{otherUser?.username || "Usuario"}</h3>
                            <p className="text-sm text-gray-500 truncate">
                              {chat.lastMessage?.content || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
            {/* Área de mensajes */}
            <div className="w-2/3 flex flex-col">
              {selectedChat ? (
                <>
                  <div className="p-4 border-b">
                    <h2 className="font-semibold">
                      Conversación con {
                        selectedChat.participants.find(u => u.id !== user.id)?.username || "Usuario"
                      }
                    </h2>
                  </div>
                  <div className="flex-grow overflow-y-auto p-4">
                    {chatMessages.length === 0 ? (
                      <p className="text-gray-500">No hay mensajes en este chat.</p>
                    ) : (
                      chatMessages.map((message, index) => (
                        <div
                          key={index}
                          className={`mb-4 max-w-[80%] ${
                            message.sender.id === user.id
                              ? 'ml-auto bg-purple-100 rounded-lg p-3'
                              : 'bg-gray-100 rounded-lg p-3'
                          }`}
                        >
                          <p>{message.content}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(message.date).toLocaleString()}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="p-4 border-t">
                    <form onSubmit={handleSendMessage} className="flex">
                      <input
                        type="text"
                        name="content"
                        value={newMessage.content}
                        onChange={handleInputChange}
                        placeholder="Escribe un mensaje..."
                        className="flex-grow p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <Button type="submit" className="rounded-l-none">
                        Enviar
                      </Button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  Selecciona un chat para ver los mensajes
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;