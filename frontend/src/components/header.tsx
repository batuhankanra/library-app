import { useState } from "react";
import { Link, NavLink } from "react-router";
import menu from "../route/menu";

const Navbar = () => {
  const user = null;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-primary text-white shadow-md">
      <div className="flex items-center justify-between max-w-6xl mx-auto px-6 py-4">

        {/* Logo */}
        <Link to="/" className="text-xl font-bold whitespace-nowrap">
          📚 Yağmur Kalp
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 items-center font-semibold text-lg">
          {menu.map((item) => (
            <NavLink
              key={item.id}
              to={item.link}
              className={({ isActive }) =>
                `transition-colors ${
                  isActive ? "text-fourth" : "hover:text-third"
                }`
              }
            >
              {item.title}
            </NavLink>
          ))}
        </nav>

        {/* Search (Desktop) */}
        <div className="hidden md:block flex-1 max-w-xs mx-4">
          <input
            type="text"
            placeholder="Ara..."
            className="w-full bg-third px-3 py-2 rounded-xl outline-none focus:bg-fourth text-black transition"
          />
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm text-fourth">{user}</span>
              <button className="bg-danger px-3 py-1 rounded-md text-sm hover:opacity-90 transition">
                Çıkış
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-button px-4 py-1.5 rounded-md text-sm hover:bg-third transition"
            >
              Giriş Yap
            </Link>
          )}
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1"
        >
          <span
            className={`w-6 h-0.5 bg-white transition ${
              isOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-white transition ${
              isOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-white transition ${
              isOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-secondary px-6 overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 py-4" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col gap-3 text-center">
          {menu.map((item) => (
            <NavLink
              key={item.id}
              to={item.link}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `transition-colors ${
                  isActive ? "text-fourth" : "hover:text-third"
                }`
              }
            >
              {item.title}
            </NavLink>
          ))}
        </nav>

        {/* Search Mobile */}
        <div className="mt-4">
          <input
            type="text"
            placeholder="Ara..."
            className="w-full bg-third px-3 py-2 rounded-xl outline-none focus:bg-fourth text-black"
          />
        </div>

        {/* Auth */}
        <div className="pt-4 mt-4 border-t border-third">
          {user ? (
            <>
              <p className="text-sm mb-2 text-fourth text-center">{user}</p>
              <button className="w-full bg-danger py-2 rounded-md text-sm">
                Çıkış
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="block w-full text-center bg-button py-2 rounded-md text-sm"
            >
              Giriş Yap
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;