import React from "react";
import { useNavigate } from "react-router-dom";
import ServiceCard from "../ServiceCard";
import { Button } from "../Button";

const ServicesTab = ({ myServices }) => {
  const navigate = useNavigate();
  
  return (
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
  );
};

export default ServicesTab;