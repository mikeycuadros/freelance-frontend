const BASE_URL = import.meta.env.VITE_API_URL;

const fetchFromApi = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) throw new Error("Error en la peticion");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export async function getAllFreelancers() {
  return fetchFromApi("/users");
}

// export const getAllFreelancers = async (page = 1, filters = {}) => {
//   try {
//     // Construir parámetros de consulta basados en los filtros
//     const queryParams = new URLSearchParams();
//     queryParams.append("page", page);

//     if (filters.category) queryParams.append("category", filters.category);
//     if (filters.search) queryParams.append("search", filters.search);
//     if (filters.experienceLevel)
//       queryParams.append("experienceLevel", filters.experienceLevel);
//     if (filters.priceRange) queryParams.append("maxPrice", filters.priceRange);

//     const response = await fetch(
//       `${API_URL}/freelancers?${queryParams.toString()}`
//     );

//     if (!response.ok) {
//       throw new Error("Error al obtener freelancers");
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("Error en getAllFreelancers:", error);
//     throw error;
//   }
// };

export const getFreelancerById = async (id) => {
  return fetchFromApi(`/users/${id}`);
};
