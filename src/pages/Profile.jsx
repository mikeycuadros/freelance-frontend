import React from "react";
import { Card, CardContent } from "../components/Card";


const Profile = () => {
  const usuario = {
    nombre: "Juan Pérez",
    correo: "juan@example.com",
    servicios: ["Diseño de logos", "Creación de sitios web"],
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-8">Mi perfil</h1>

      <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">Información personal</h2>
            <p className="text-gray-700">Nombre: {usuario.nombre}</p>
            <p className="text-gray-700">Correo: {usuario.correo}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">Mis servicios</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {usuario.servicios.map((servicio, index) => (
                <li key={index}>{servicio}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
