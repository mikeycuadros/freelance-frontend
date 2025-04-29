import React from "react";
import { Card, CardContent } from "../components/Card";
import { Button } from "../components/Button";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="text-center py-16 bg-gray-100">
        <h2 className="text-4xl font-bold mb-4">
          Encuentra o publica servicios freelance
        </h2>
        <p className="text-gray-600 mb-6">
          Explora talentos o haz crecer tu negocio.
        </p>
        <div className="max-w-xl mx-auto">
          <input
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
            type="text"
            placeholder="Buscar servicios"
          />
          <Button className="w-full">Buscar</Button>
        </div>
      </section>

      {/* Categorías destacadas */}
      <section className="py-10 px-4">
        <h3 className="text-2xl font-semibold mb-6 text-center">
          Categorías destacadas
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["Diseño", "Desarrollo", "Marketing", "Escritura"].map((cat) => (
            <Card key={cat} className="hover:shadow-lg cursor-pointer">
              <CardContent className="p-6 text-center font-medium">
                {cat}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Servicios populares */}
      <section className="py-10 px-4 bg-gray-50">
        <h3 className="text-2xl font-semibold mb-6 text-center">
          Servicios populares
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((id) => (
            <Card key={id} className="hover:shadow-lg">
              <CardContent className="p-4">
                <img
                  src={`https://via.placeholder.com/400x200?text=Servicio+${id}`}
                  alt="Servicio"
                  className="rounded mb-2"
                />
                <h4 className="font-semibold">Título del servicio {id}</h4>
                <p className="text-sm text-gray-600">
                  Freelancer {id} • Desde $50
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="text-center py-16">
        <h3 className="text-3xl font-semibold mb-4">¿Listo para empezar?</h3>
        <Button className="text-lg px-6 py-3">
          Regístrate y empieza ahora
        </Button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-6 text-center">
        <p>© 2025 freelance-platform. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Home;
