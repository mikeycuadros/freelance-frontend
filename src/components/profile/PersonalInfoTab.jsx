import React, { useEffect } from "react";
import { Button } from "../Button";
import { useAuth } from "../../context/AuthContext";

const PersonalInfoTab = ({
  isEditing,
  setIsEditing,
  formData,
  handleChange,
  handleUpdateProfile,
}) => {
  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      setFormData({
        ...formData,
        nombre: user.username,
        correo: user.email,
      });
    }
  }, [user]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Información Personal</h2>
        <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
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
  );
};

export default PersonalInfoTab;
