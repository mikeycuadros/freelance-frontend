import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ServiceCard from "../components/ServiceCard";
import { Button } from "../components/Button";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, logout, updateUsername, updatePassword } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("info");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState({ text: "", type: "" });

  // Efecto para cargar los datos del usuario cuando estén disponibles
  useEffect(() => {
    if (user) {
      setFormData({
        ...formData,
        nombre: user.username || user.name || "Usuario",
        correo: user.email || "usuario@example.com",
      });
    }
  }, [user]);

  // Servicios de ejemplo (en producción deberían venir de una API)
  const myServices = [
    {
      id: 1,
      title: "Traducción inglés-español",
      description: "Documentos y textos",
      price: 100,
      category: "Traducción",
    },
    {
      id: 2,
      title: "Edición de video",
      description: "Videos profesionales",
      price: 350,
      category: "Edición",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const result = await updateUsername(formData.nombre);
      if (result.user) {
        setMessage({
          text: "Perfil actualizado correctamente",
          type: "success",
        });
        setTimeout(() => setMessage({ text: "", type: "" }), 3000);
        setIsEditing(false);
      } else {
        setMessage({ text: "Error al actualizar el perfil", type: "error" });
      }
    } catch (error) {
      setMessage({ text: "Error al actualizar el perfil", type: "error" });
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({ text: "Las contraseñas no coinciden", type: "error" });
      return;
    }
    try {
      const result = await updatePassword(
        formData.currentPassword,
        formData.newPassword
      );
      if (result.success) {
        setMessage({
          text: "Contraseña actualizada correctamente",
          type: "success",
        });
        setFormData((prev) => ({
          ...prev,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }));
        setTimeout(() => setMessage({ text: "", type: "" }), 3000);
      } else {
        setMessage({
          text: "Error al actualizar la contraseña",
          type: "error",
        });
      }
    } catch (error) {
      setMessage({ text: "Error al actualizar la contraseña", type: "error" });
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Mi Perfil</h1>


        {/* Tabs de navegación */}
        <div className="flex border-b mb-6">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "info"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("info")}
          >
            Información Personal
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "services"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("services")}
          >
            Mis Servicios
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "settings"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("settings")}
          >
            Configuración
          </button>
        </div>

        {/* Mensajes de estado */}
        {message.text && (
          <div
            className={`p-3 mb-4 rounded ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Contenido según la pestaña activa */}
        {activeTab === "info" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Información Personal</h2>
              <Button
                variant="outline"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "Cancelar" : "Editar"}
              </Button>
            </div>

            {isEditing ? (
              <form onSubmit={handleUpdateProfile}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    name="correo"
                    value={formData.correo}
                    onChange={handleChange}
                    disabled
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    El correo electrónico no se puede cambiar
                  </p>
                </div>
                <Button type="submit">Guardar cambios</Button>
              </form>
            ) : (
              <div>
                <p className="text-gray-700 mb-2">
                  <span className="font-medium">Nombre:</span> {formData.nombre}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Correo:</span> {formData.correo}
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === "services" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Mis Servicios</h2>
              <Button onClick={() => navigate("/publish")}>
                Publicar nuevo servicio
              </Button>
            </div>

            {myServices.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No has publicado ningún servicio aún.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {myServices.map((service) => (
                  <ServiceCard key={service.id} {...service} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "settings" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Configuración</h2>

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Cambiar contraseña</h3>
              <form onSubmit={handleUpdatePassword}>
                <div className="mb-3">
                  <label className="block text-gray-700 mb-2">
                    Contraseña actual
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="block text-gray-700 mb-2">
                    Nueva contraseña
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    Confirmar nueva contraseña
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Button type="submit">Actualizar contraseña</Button>
              </form>
            </div>

            <div className="border-t pt-6 mt-6">
              <h3 className="text-lg font-medium mb-3">Cerrar sesión</h3>
              <p className="text-gray-600 mb-4">¿Deseas salir de tu cuenta?</p>
              <Button variant="danger" onClick={handleLogout}>
                Cerrar sesión
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
