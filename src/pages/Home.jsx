import React from "react";
import ServiceCard from "../components/ServiceCard";
import CategoryCard from "../components/CategoryCard";
import { Button } from "../components/Button";
import { Link } from "react-router-dom";
import { getAllServices } from "../services/service";
import { getAllCategories } from "../services/category";
import { useFetch } from "../hooks/useFetch";
import CategoryIcon from "../components/CategoryIcon";

const Home = () => {
  const {
    data: services,
    loading: loadingServices,
    error: errorServices,
  } = useFetch(() => getAllServices(), []);
  const {
    data: categories,
    loading: loadingCategories,
    error: errorCategories,
  } = useFetch(() => getAllCategories(), []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Nueva sección Hero */}
      <section className="bg-lavender-50 py-16">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-5xl font-bold mb-4">
              Encuentra el talento{" "}
              <span className="text-purple-800">freelance</span> perfecto para
              tu negocio
            </h1>
            <p className="text-gray-600 mb-6 text-lg">
              Conecta con profesionales de primera categoría para tus proyectos.
              Trabaja con freelancers talentosos para dar vida a tus ideas.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/explore">
                <Button className="text-lg px-6 py-3">Buscar Talento</Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" className="text-lg px-6 py-3">
                  Soy Freelancer
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <img
                src="/hero-image.jpg"
                alt="Profesionales colaborando"
                className="rounded-4xl shadow-xl"
              />
              <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-md">
                <p className="text-sm font-medium">Confiado por</p>
                <p className="font-bold">+10,000 Empresas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categorías populares - Nuevo diseño */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Categorías Populares</h2>
            <Link
              to="/categories"
              className="text-purple-800 hover:text-purple-900 flex items-center"
            >
              Ver todas las categorías
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>

          <p className="text-gray-600 mb-8">
            Explora talento por categoría y encuentra la combinación perfecta
            para las necesidades de tu proyecto
          </p>

          {loadingCategories ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-gray-100 rounded-lg p-6 animate-pulse"
                >
                  <div className="h-12 w-12 bg-gray-200 rounded-md mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : errorCategories ? (
            <p className="text-red-500 text-center">{errorCategories}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories?.slice(0, 6).map((category) => (
                <Link
                  to={`/category/${category.id}`}
                  key={category.id}
                  className="block"
                >
                  <div className="bg-gray-50 hover:bg-gray-100 rounded-lg p-6 transition-all duration-300 border border-gray-100 hover:shadow-md">
                    <div className="mb-4">
                      <CategoryIcon type={category.icon} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {category.description || "Sin descripción"}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        {category.serviceCount || 0} freelancers
                      </span>
                      <span className="text-purple-800 text-sm font-medium flex items-center">
                        Explorar
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 ml-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Servicios populares */}
      <section className="py-10 px-4 bg-gray-50">
        <h3 className="text-2xl font-semibold mb-6 text-center">
          Servicios populares
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loadingServices ? (
            <p>Cargando servicios...</p>
          ) : errorServices ? (
            <p>Error al cargar los servicios: {errorServices}</p>
          ) : (
            services?.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))
          )}
        </div>
      </section>

      {/* CTA final */}
      <section className="text-center py-16">
        <h3 className="text-3xl font-semibold mb-4">¿Listo para empezar?</h3>
        <Link to="/register">
          <Button className="text-lg px-6 py-3">
            Regístrate y empieza ahora
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default Home;
