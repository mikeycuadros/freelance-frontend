import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getServiceById } from "../services/service";

const ServiceDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getServiceById(id);
        setService(data);
        console.log(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, [id]);

  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!service) return <p className="text-center">Cargando servicio...</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">{service.title}</h1>
      <p className="text-gray-600 mb-2">Categoría: {service.category.name}</p>
      <p className="text-gray-800 mb-4">{service.description}</p>
      <p className="text-purple-600 font-semibold">Precio: ${service.price}</p>
    </div>
  );
};

export default ServiceDetail;
