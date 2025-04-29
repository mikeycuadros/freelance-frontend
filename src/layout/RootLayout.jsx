import { NavLink, Outlet } from "react-router-dom";
import { Button } from "../components/Button";

const RootLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="flex justify-between items-center p-6 shadow-md">
        <h1 className="text-2xl font-bold">freelance-platform</h1>
        <nav className="space-x-4">
          <NavLink to="/" className="hover:underline">
            Inicio
          </NavLink>
          <NavLink to="/explore" className="hover:underline">
            Explorar
          </NavLink>
          <NavLink to="/how-it-works" className="hover:underline">
            Cómo funciona
          </NavLink>
          <NavLink to="/" className="hover:underline">
            Noticias
          </NavLink>
        </nav>
        <div className="space-x-2">
          <Button variant="outline">Iniciar sesión</Button>
          <Button>Publicar servicio</Button>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
