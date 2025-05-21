import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 py-4 shadow-sm">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <div className="bg-purple-800 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
            <span className="font-bold">FL</span>
          </div>
          <span className="text-xl font-bold text-purple-800">
            FreelancePro
          </span>
        </Link>

        {/* Enlaces de navegación */}
        <div className="hidden md:flex space-x-8">
          <Link to="/freelancer" className="text-gray-600 hover:text-purple-900">
            Buscar Talento
          </Link>
          <Link
            to="/categories"
            className="text-gray-600 hover:text-purple-900"
          >
            Categorias
          </Link>
          {isAuthenticated && (
            <Link to="/messages" className="text-gray-600 hover:text-purple-900 flex items-center">
              Mensajes
              <span className="ml-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </Link>
          )}
        </div>

        {/* Buscador */}
        <div className="hidden md:block relative flex-grow max-w-md mx-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full bg-gray-100 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-800"
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Botones de autenticación o perfil según estado */}
        {isAuthenticated ? (
          <div className="flex items-center space-x-4">
            <Link
              to="/profile"
              className="text-gray-700 hover:text-purple-900 font-medium"
            >
              Mi perfil
            </Link>
            {isAuthenticated && (
              <Link to="/messages" className="text-gray-700 hover:text-purple-900 font-medium md:hidden">
                Mensajes
                <span className="ml-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 inline-flex items-center justify-center">
                  3
                </span>
              </Link>
            )}
            {/* <Link to="/publish">
              <Button className="bg-purple-800 hover:bg-purple-900 text-white px-4 py-2 rounded-md">
                Publicar Servicio
              </Button>
            </Link> */}
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="text-gray-700 hover:text-purple-900 font-medium"
            >
              Iniciar Sesión
            </Link>
            <Link to="/register">
              <Button className="bg-purple-800 hover:bg-purple-900 text-white px-4 py-2 rounded-md">
                Unirse
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
