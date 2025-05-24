import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../components/Button";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getFreelancerById } from "../services/user";

const FreelancerDetail = () => {
  const { id } = useParams();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("about");

  const handleContactClick = () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: `/freelancer/${id}` } });
    } else {
      // Lógica para contactar al freelancer
      console.log("Contactando al freelancer:", id);
    }
  };

  useEffect(() => {
    const fetchPersonData = async () => {
      setLoading(true);
      try {
        // Obtener datos del freelancer desde la API
        const userData = await getFreelancerById(id);

        // Transformar los datos de la API al formato que espera nuestra aplicación
        const formattedPerson = {
          id: userData.id,
          name: userData.username || "Sin nombre",
          title: userData.freelancer?.title || "Freelancer",
          email: userData.email || "contact@example.com",
          phone: userData.phone || "Disponible después de contactar",
          location: userData.location || "Sin ubicación",
          rating:
            userData.freelancer?.reviews?.length > 0
              ? (
                  userData.freelancer.reviews.reduce(
                    (sum, review) => sum + parseFloat(review.rating),
                    0
                  ) / userData.freelancer.reviews.length
                ).toFixed(1)
              : "0.0",
          reviews: userData.freelancer?.reviews || [],
          reviewCount: userData.freelancer?.reviews?.length || 0,
          successRate: userData.successRate || 0,
          hourlyRate: userData.freelancer?.hourlyRate || 0,
          skills: userData.freelancer?.skills || [
            "Sin habilidades especificadas",
          ],
          description:
            userData.freelancer?.description ||
            "Este freelancer aún no ha añadido una descripción detallada sobre su experiencia y servicios.",
          memberSince: userData.createdAt
            ? new Date(userData.createdAt).toLocaleDateString()
            : "Fecha desconocida",
          website: userData.website || "No disponible",
          experience: userData.experience || [
            {
              company: "Información no disponible",
              position: "Freelancer",
              period: "Actual",
              description:
                "Este freelancer aún no ha añadido información sobre su experiencia laboral.",
            },
          ],
          education: userData.education || [
            {
              institution: "Información no disponible",
              degree: "No especificado",
              year: "No especificado",
            },
          ],
          portfolio: userData.portfolio || [
            {
              title: "Sin proyectos",
              description:
                "Este freelancer aún no ha añadido proyectos a su portafolio.",
              link: "#",
            },
          ],
        };

        setPerson(formattedPerson);
        setLoading(false);
      } catch (err) {
        console.error("Error al obtener datos de la persona:", err);
        setError("No se pudo cargar la información de la persona");
        setLoading(false);
      }
    };

    fetchPersonData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen px-6 py-10 bg-gray-50 flex justify-center items-center">
        <div className="animate-pulse">
          <div className="h-32 w-32 bg-gray-200 rounded-full mb-4 mx-auto"></div>
          <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-48 mb-2 mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen px-6 py-10 bg-gray-50 flex justify-center items-center">
        <div className="bg-red-100 p-4 rounded-lg text-red-700 max-w-md text-center">
          <p className="font-bold mb-2">Error</p>
          <p>{error}</p>
          <Button className="mt-4" onClick={() => window.history.back()}>
            Volver atrás
          </Button>
        </div>
      </div>
    );
  }

  if (!person) {
    return (
      <div className="min-h-screen px-6 py-10 bg-gray-50 flex justify-center items-center">
        <div className="bg-yellow-100 p-4 rounded-lg text-yellow-700 max-w-md text-center">
          <p>No se encontró información para esta persona</p>
          <Button className="mt-4" onClick={() => window.history.back()}>
            Volver atrás
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Cabecera con información principal */}
          <div className="p-6 bg-white">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="flex-shrink-0">
                <img
                  src={`https://randomuser.me/api/portraits/${
                    person.id % 2 === 0 ? "women" : "men"
                  }/${person.id}.jpg`}
                  alt={person.name}
                  className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                />
              </div>
              <div className="flex-grow">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                  <div>
                    <h1 className="text-2xl font-bold">{person.name}</h1>
                    <p className="text-gray-600">{person.title}</p>
                    <div className="flex items-center mt-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-2 text-gray-700">
                        {person.rating} · {person.reviewCount} reseñas
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {person.skills.map((skill, index) => (
                        <span
                          key={index}
                          className={`px-3 py-1 text-xs rounded-full ${
                            index === 0
                              ? "bg-purple-100 text-purple-800"
                              : index === 1
                              ? "bg-blue-100 text-blue-800"
                              : index === 2
                              ? "bg-pink-100 text-pink-800"
                              : index === 3
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 text-right">
                    <p className="text-2xl font-bold text-purple-800">
                      ${person.hourlyRate}/hr
                    </p>
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={handleContactClick}
                        className="px-4 py-2 bg-purple-800 text-white rounded-md flex items-center justify-center hover:bg-purple-900"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                          />
                        </svg>
                        Enviar Mensaje
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pestañas de navegación */}
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab("about")}
                className={`px-4 py-3 font-medium text-sm ${
                  activeTab === "about"
                    ? "border-b-2 border-purple-800 text-purple-800"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Acerca de
              </button>
              <button
                onClick={() => setActiveTab("portfolio")}
                className={`px-4 py-3 font-medium text-sm ${
                  activeTab === "portfolio"
                    ? "border-b-2 border-purple-800 text-purple-800"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Portafolio
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`px-4 py-3 font-medium text-sm ${
                  activeTab === "reviews"
                    ? "border-b-2 border-purple-800 text-purple-800"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Reseñas
              </button>
            </nav>
          </div>

          {/* Contenido principal */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Columna principal */}
              <div className="md:col-span-2">
                {activeTab === "about" && (
                  <>
                    <div className="mb-8">
                      <h2 className="text-xl font-bold mb-4">Acerca de mí</h2>
                      <div className="text-gray-700 whitespace-pre-line">
                        {person.description}
                      </div>
                    </div>

                    <div className="mb-8">
                      <h2 className="text-xl font-bold mb-4">Experiencia</h2>
                      {person.experience.map((exp, index) => (
                        <div key={index} className="mb-6">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-lg">
                                {exp.position}
                              </h3>
                              <p className="text-gray-600">{exp.company}</p>
                            </div>
                            <span className="text-gray-500 text-sm">
                              {exp.period}
                            </span>
                          </div>
                          <p className="text-gray-700 mt-2">
                            {exp.description}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mb-8">
                      <h2 className="text-xl font-bold mb-4">Educación</h2>
                      {person.education.map((edu, index) => (
                        <div key={index} className="mb-4">
                          <h3 className="font-semibold">{edu.institution}</h3>
                          <p className="text-gray-700">{edu.degree}</p>
                          <p className="text-sm text-gray-500">{edu.year}</p>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {activeTab === "portfolio" && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">Portafolio</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {person.portfolio.map((item, index) => (
                        <div
                          key={index}
                          className="border rounded-lg p-4 hover:shadow-md transition"
                        >
                          <div className="h-40 bg-gray-200 rounded-md mb-3"></div>
                          <h3 className="font-medium mb-1">{item.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {item.description}
                          </p>
                          <a
                            href={item.link}
                            className="text-purple-800 hover:underline text-sm font-medium"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Ver proyecto →
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">
                      Reseñas de clientes
                    </h2>

                    <div className="space-y-6">
                      {person.reviews && person.reviews.length > 0 ? (
                        person.reviews.map((review) => (
                          <div
                            key={review.id}
                            className="p-4 border rounded-lg"
                          >
                            <div className="flex justify-between mb-2">
                              <div className="flex items-center">
                                <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                                <div>
                                  <p className="font-medium">
                                    {review.user.username}
                                  </p>
                                  <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                      <svg
                                        key={i}
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        viewBox="0 0 20 20"
                                        fill={
                                          i <
                                          Math.floor(parseFloat(review.rating))
                                            ? "currentColor"
                                            : "none"
                                        }
                                        stroke="currentColor"
                                      >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                      </svg>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <span className="text-gray-500 text-sm">
                                {review.createdAt
                                  ? new Date(
                                      review.createdAt
                                    ).toLocaleDateString()
                                  : "Hace 2 meses"}
                              </span>
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 border rounded-lg text-center">
                          <p className="text-gray-500">
                            Este freelancer aún no tiene reseñas.
                          </p>
                        </div>
                      )}
                      {isAuthenticated && user && user.id !== parseInt(id) && (
                        <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                          <h3 className="text-lg font-semibold mb-3">
                            Añadir una reseña
                          </h3>
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              const rating = e.target.rating.value;
                              const comment = e.target.comment.value;

                              // Aquí implementarías la lógica para enviar la reseña al backend
                              console.log("Enviando reseña:", {
                                rating,
                                comment,
                                freelancerId: id,
                              });

                              // Ejemplo de cómo podría ser la llamada a la API
                              // addReview({ rating, comment, freelancerId: id })
                              //   .then(response => {
                              //     // Actualizar la lista de reseñas
                              //     fetchPersonData();
                              //     // Limpiar el formulario
                              //     e.target.reset();
                              //   })
                              //   .catch(error => {
                              //     console.error("Error al enviar la reseña:", error);
                              //   });
                            }}
                          >
                            <div className="mb-4">
                              <label
                                htmlFor="rating"
                                className="block text-sm font-medium text-gray-700 mb-1"
                              >
                                Calificación
                              </label>
                              <div className="flex items-center">
                                {[5, 4, 3, 2, 1].map((value) => (
                                  <label
                                    key={value}
                                    className="mr-4 flex items-center cursor-pointer"
                                  >
                                    <input
                                      type="radio"
                                      name="rating"
                                      value={value}
                                      className="mr-1"
                                      defaultChecked={value === 5}
                                    />
                                    <span>{value}</span>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-5 w-5 text-yellow-400 ml-1"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                  </label>
                                ))}
                              </div>
                            </div>

                            <div className="mb-4">
                              <label
                                htmlFor="comment"
                                className="block text-sm font-medium text-gray-700 mb-1"
                              >
                                Comentario
                              </label>
                              <textarea
                                id="comment"
                                name="comment"
                                rows="4"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Comparte tu experiencia trabajando con este freelancer..."
                                required
                              ></textarea>
                            </div>

                            <button
                              type="submit"
                              className="px-4 py-2 bg-purple-800 text-white rounded-md hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                              Publicar reseña
                            </button>
                          </form>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Columna lateral */}
              <div>
                <div className="bg-gray-50 p-5 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">
                    Información de contacto
                  </h3>

                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-1">Miembro desde</p>
                    <p>{person.memberSince}</p>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <p>{person.email}</p>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm text-gray-500 mb-1">Sitio web</p>
                    <a
                      href={`https://${person.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-800 hover:underline"
                    >
                      {person.website}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerDetail;
