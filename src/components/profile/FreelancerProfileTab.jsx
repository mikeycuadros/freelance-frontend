import React, { useState, useEffect } from "react";
import { Button } from "../Button";
import {
  getFreelancerById,
  updateFreelancerProfile,
} from "../../services/freelancer";

const FreelancerProfileTab = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [freelancerData, setFreelancerData] = useState({
    title: "",
    description: "",
    hourlyRate: "",
    skills: [],
  });
  const [newSkill, setNewSkill] = useState("");

  // Cargar datos del freelancer
  useEffect(() => {
    const fetchFreelancerData = async () => {
      if (!user || !user.id) return;

      setLoading(true);
      try {
        const data = await getFreelancerById(user.id);
        setFreelancerData({
          title: data.title || "",
          description: data.description || "",
          hourlyRate: data.hourlyRate || "",
          skills: data.skills || [],
        });
      } catch (error) {
        console.error("Error al cargar datos del freelancer:", error);
        setMessage({
          text: "No se pudieron cargar tus datos de freelancer",
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchFreelancerData();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFreelancerData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() !== "") {
      setFreelancerData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (index) => {
    setFreelancerData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateFreelancerProfile(user.id, freelancerData);
      setMessage({
        text: "Perfil de freelancer actualizado correctamente",
        type: "success",
      });
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    } catch (error) {
      console.error("Error al actualizar perfil de freelancer:", error);
      setMessage({
        text: "Error de conexión al actualizar el perfil",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading && !freelancerData.title) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-10 bg-gray-200 rounded w-1/3"></div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Perfil de Freelancer</h2>

      {message.text && (
        <div
          className={`p-3 mb-4 rounded ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Título profesional</label>
          <input
            type="text"
            name="title"
            value={freelancerData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Ej: Desarrollador Web Full Stack"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Descripción</label>
          <textarea
            name="description"
            value={freelancerData.description}
            onChange={handleChange}
            rows="4"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Describe tu experiencia y servicios..."
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Tarifa por hora (€)
          </label>
          <input
            type="number"
            name="hourlyRate"
            value={freelancerData.hourlyRate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Ej: 25"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Habilidades</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {freelancerData.skills.map((skill, index) => (
              <div
                key={index}
                className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full flex items-center"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(index)}
                  className="ml-2 text-purple-600 hover:text-purple-800"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="flex-grow border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Añadir habilidad"
              onKeyPress={(e) =>
                e.key === "Enter" && (e.preventDefault(), handleAddSkill())
              }
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="bg-purple-800 text-white px-4 py-2 rounded-r hover:bg-purple-900"
            >
              Añadir
            </button>
          </div>
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Guardar cambios"}
        </Button>
      </form>
    </div>
  );
};

export default FreelancerProfileTab;
