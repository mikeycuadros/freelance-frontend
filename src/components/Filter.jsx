import React, { useState } from "react";

const Filter = ({ onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    onFilterChange(e.target.value);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h3 className="text-xl font-semibold mb-4">Filtros</h3>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Categoría</label>
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">Seleccionar</option>
          <option value="Diseño">Diseño</option>
          <option value="Desarrollo">Desarrollo</option>
          <option value="Marketing">Marketing</option>
          <option value="Escritura">Escritura</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
