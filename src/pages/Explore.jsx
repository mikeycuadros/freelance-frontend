import React from "react";
import { Card, CardContent } from "../components/Card";
import { Button } from "../components/Button";

const Explore = () => {
  const categorias = ["Diseño", "Desarrollo", "Marketing", "Escritura"];
  return (
    <div className="min-h-screen px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Explora servicios freelance
      </h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Categorías destacadas</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categorias.map((cat) => (
            <Card key={cat} className="hover:shadow-lg cursor-pointer">
              <CardContent className="p-6 text-center font-medium">
                {cat}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Servicios recomendados</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((id) => (
            <Card key={id} className="hover:shadow-md">
              <CardContent className="p-4">
                <img
                  src={`https://via.placeholder.com/400x200?text=Servicio+${id}`}
                  alt={`Servicio ${id}`}
                  className="rounded mb-2"
                />
                <h3 className="font-semibold">Título del servicio {id}</h3>
                <p className="text-sm text-gray-600">
                  Freelancer {id} • Desde $50
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Explore;
