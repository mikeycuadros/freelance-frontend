import React, { useEffect, useState } from "react";
import { Button } from "../components/Button";
import Pagination from "../components/Pagination";
import { Link, useNavigate } from "react-router-dom";
import { getFreelancersWithRole } from "../services/freelancer";

const Freelancer = () => {
  const [freelancers, setFreelancers] = useState([]);
  const [allFreelancers, setAllFreelancers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(6);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [experienceLevel, setExperienceLevel] = useState(
    "Cualquier Experiencia"
  );
  const [priceRange, setPriceRange] = useState(150);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categorias = [
    "Desarrollo Web",
    "Diseño",
    "Marketing",
    "Redacción",
    "Traducción",
    "Desarrollo Móvil",
  ];

  const nivelesExperiencia = [
    "Cualquier Experiencia",
    "Principiante",
    "Intermedio",
    "Experto",
  ];

  // Cargar freelancers desde la API
  useEffect(() => {
    const fetchFreelancers = async () => {
      setLoading(true);
      try {
        const data = await getFreelancersWithRole();
        console.log("Datos recibidos de la API:", data);

        // Establecer directamente los datos con las propiedades necesarias
        setAllFreelancers(
          data.map((user) => ({
            ...user,
            // Acceder a las propiedades dentro del objeto freelancer
            hourlyRate: user.freelancer?.hourlyRate || 30,
            skills: user.freelancer?.skills || [
              "Sin habilidades especificadas",
            ],
            title: user.freelancer?.title || "Freelancer",
            description: user.freelancer?.description || "",
            name: user.username || "Sin nombre",
          }))
        );

        setLoading(false);
      } catch (err) {
        console.error("Error al cargar freelancers:", err);
        setError(
          "No se pudieron cargar los freelancers. Por favor, intenta de nuevo más tarde."
        );
        setLoading(false);
      }
    };

    fetchFreelancers();
  }, []);

  // Filtrar freelancers según los criterios seleccionados
  useEffect(() => {
    let filtered = [...allFreelancers];

    if (categoryFilter) {
      filtered = filtered.filter(
        (f) =>
          (f.skills &&
            f.skills.some((skill) =>
              skill.toLowerCase().includes(categoryFilter.toLowerCase())
            )) ||
          (f.title &&
            f.title.toLowerCase().includes(categoryFilter.toLowerCase()))
      );
    }

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (f) =>
          (f.name && f.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (f.username &&
            f.username.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (f.title &&
            f.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (f.skills &&
            f.skills.some((skill) =>
              skill.toLowerCase().includes(searchTerm.toLowerCase())
            ))
      );
    }

    // Filtrar por precio (con valor predeterminado si no existe)
    filtered = filtered.filter((f) => (f.hourlyRate || 30) <= priceRange);

    // Filtrar por experiencia (simulado)
    if (experienceLevel !== "Cualquier Experiencia") {
      // Lógica simplificada para demostración
      if (experienceLevel === "Experto") {
        filtered = filtered.filter((f) => (f.rating || 4.5) >= 4.8);
      } else if (experienceLevel === "Intermedio") {
        filtered = filtered.filter(
          (f) => (f.rating || 4.5) >= 4.5 && (f.rating || 4.5) < 4.8
        );
      } else if (experienceLevel === "Principiante") {
        filtered = filtered.filter((f) => (f.rating || 4.5) < 4.5);
      }
    }

    setTotalPages(Math.ceil(filtered.length / itemsPerPage));

    const startIndex = (currentPage - 1) * itemsPerPage;
    const selectedFreelancers = filtered.slice(
      startIndex,
      startIndex + itemsPerPage
    );

    setFreelancers(selectedFreelancers);
  }, [
    currentPage,
    categoryFilter,
    searchTerm,
    experienceLevel,
    priceRange,
    allFreelancers,
  ]);

  const handleCategoryClick = (category) => {
    setCategoryFilter(category);
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const navigate = useNavigate();

  const handleFreelancerClick = (freelancerId) => {
    navigate(`/freelancer/${freelancerId}`);
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Encontrar Freelancers</h1>
        <p className="text-gray-600 mb-8">
          Navega por nuestra lista seleccionada de los mejores freelancers en
          varias categorías. Utiliza los filtros para encontrar la combinación
          perfecta para tu proyecto.
        </p>

        {/* Buscador - Modificado para no ocupar todo el ancho */}
        <div className="mb-10 max-w-3xl">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-800 focus:border-purple-800"
              type="text"
              placeholder="Buscar por habilidades, nombre o título..."
            />
            <Button type="submit" className="px-6">
              <svg
                className="w-5 h-5 mr-2 inline-block"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Buscar
            </Button>
          </form>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filtros - Ahora con posición sticky */}
          <div className="w-full md:w-1/4">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-25">
              <h2 className="text-xl font-bold mb-6">Filtros</h2>

              {/* Filtro por palabra clave */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Palabra clave</h3>
                <input
                  type="text"
                  placeholder="Buscar por palabra clave..."
                  className="w-full p-2 border border-gray-300 rounded-md"
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>

              {/* Filtro por categoría */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Categoría</h3>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md"
                  onChange={(e) => {
                    setCategoryFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="">Todas las Categorías</option>
                  {categorias.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filtro por nivel de experiencia */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Nivel de Experiencia</h3>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={experienceLevel}
                  onChange={(e) => {
                    setExperienceLevel(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  {nivelesExperiencia.map((nivel) => (
                    <option key={nivel} value={nivel}>
                      {nivel}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filtro por tarifa por hora */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">
                  Tarifa por hora: $10 - ${priceRange}
                </h3>
                <input
                  type="range"
                  min="10"
                  max="150"
                  value={priceRange}
                  onChange={(e) => {
                    setPriceRange(parseInt(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-800"
                />
              </div>

              <Button
                className="w-full"
                onClick={() => {
                  setSearchTerm("");
                  setCategoryFilter("");
                  setExperienceLevel("Cualquier Experiencia");
                  setPriceRange(150);
                  setCurrentPage(1);
                }}
              >
                Aplicar Filtros
              </Button>
            </div>
          </div>

          {/* Resultados */}
          <div className="w-full md:w-3/4">
            {loading ? (
              <div className="text-center py-8">
                <p className="text-gray-600">Cargando freelancers...</p>
              </div>
            ) : error ? (
              <div className="bg-red-100 p-4 rounded-lg text-red-700">
                <p>{error}</p>
              </div>
            ) : (
              <>
                <p className="text-gray-600 mb-4">
                  Mostrando {freelancers.length} freelancers
                </p>

                {freelancers.length === 0 ? (
                  <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
                    <p className="text-gray-500 text-lg">
                      No se encontraron freelancers que coincidan con tus
                      criterios.
                    </p>
                    <Button
                      className="mt-4"
                      onClick={() => {
                        setSearchTerm("");
                        setCategoryFilter("");
                        setExperienceLevel("Cualquier Experiencia");
                        setPriceRange(150);
                        setCurrentPage(1);
                      }}
                    >
                      Limpiar filtros
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {freelancers.map((freelancer) => (
                      <div
                        key={freelancer.id}
                        className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4 items-start cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => handleFreelancerClick(freelancer.id)}
                      >
                        <div className="flex-shrink-0">
                          <img
                            src={`https://randomuser.me/api/portraits/${
                              freelancer.id % 2 === 0 ? "women" : "men"
                            }/${freelancer.id % 10 || 1}.jpg`}
                            alt={freelancer.username}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-xl font-bold">
                                {freelancer.username}
                              </h3>
                              <p className="text-gray-600">
                                {freelancer.title}
                              </p>
                            </div>
                            <p className="text-xl font-bold">
                              ${freelancer.hourlyRate}/hr
                            </p>
                          </div>

                          <div className="flex items-center mt-2">
                            <span className="flex items-center text-yellow-500 mr-2">
                              <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              {freelancer.rating || 4.5}
                            </span>
                            <span className="text-gray-500 mr-2">
                              •{" "}
                              {freelancer.reviews ||
                                Math.floor(Math.random() * 100) + 10}{" "}
                              reseñas
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {freelancer.skills &&
                            freelancer.skills.length > 0 ? (
                              freelancer.skills.map((skill, index) => (
                                <span
                                  key={index}
                                  className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-md"
                                >
                                  {skill}
                                </span>
                              ))
                            ) : (
                              <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-md">
                                Sin habilidades especificadas
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Paginación */}
                {totalPages > 1 && (
                  <div className="mt-8">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Freelancer;
