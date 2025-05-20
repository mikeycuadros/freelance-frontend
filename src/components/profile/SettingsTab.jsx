import React from "react";
import { Button } from "../Button";

const SettingsTab = ({ 
  user, 
  formData, 
  handleChange, 
  handleUpdatePassword, 
  handleLogout, 
  setMessage 
}) => {
  return (
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

      <div className="border-t pt-6 mb-6">
        <h3 className="text-lg font-medium mb-3">Tipo de cuenta</h3>
        <p className="text-gray-600 mb-4">
          Cambia entre cuenta de cliente y freelancer según tus necesidades
        </p>
        <div className="flex items-center space-x-4">
          <span className="text-gray-700">Tipo actual: {user?.roles?.includes('ROLE_FREELANCER') ? 'Freelancer' : 'Cliente'}</span>
          <Button 
            onClick={async () => {
              try {
                // Aquí deberías llamar a la función que cambia el rol del usuario
                // Por ejemplo: await updateUserRole()
                const newRole = user?.roles?.includes('ROLE_FREELANCER') ? 'ROLE_CLIENT' : 'ROLE_FREELANCER';
                // Simulación de la respuesta exitosa
                setMessage({
                  text: `Tipo de cuenta actualizado a ${newRole === 'ROLE_FREELANCER' ? 'Freelancer' : 'Cliente'}`,
                  type: "success",
                });
                setTimeout(() => setMessage({ text: "", type: "" }), 3000);
              } catch (error) {
                setMessage({ text: "Error al cambiar el tipo de cuenta", type: "error" });
              }
            }}
          >
            Cambiar a {user?.roles?.includes('ROLE_FREELANCER') ? 'Cliente' : 'Freelancer'}
          </Button>
        </div>
      </div>

      <div className="border-t pt-6 mt-6">
        <h3 className="text-lg font-medium mb-3">Cerrar sesión</h3>
        <p className="text-gray-600 mb-4">¿Deseas salir de tu cuenta?</p>
        <Button variant="danger" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </div>
    </div>
  );
};

export default SettingsTab;