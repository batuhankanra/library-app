import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import menu from "../route/menu";
import {
  useAppSelector,
  useAppDispatch,
} from "../store/app_hook";
import { logout } from "../store/features/auth/auth_slice";

const Navbar = () => {
  const { user } = useAppSelector((state) => state.auth_slice);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 🔥 dışarı tıklayınca dropdown kapat
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔥 logout
  const handleLogout = () => {
    dispatch(logout());
    setOpen(false);
    navigate("/login");
  };

  return (
    <header className="bg-primary text-white shadow-md">
      <div className="flex items-center justify-between max-w-6xl mx-auto px-6 py-4">
        
        {/* LOGO */}
        <Link to="/" className="text-xl font-bold whitespace-nowrap">
          📚 Yağmur Kalp
        </Link>

        {/* DESKTOP MENU */}
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

        {/* SEARCH */}
        <div className="hidden md:block flex-1 max-w-xs mx-4">
          <input
            type="text"
            placeholder="Ara..."
            className="w-full bg-third px-3 py-2 rounded-xl outline-none focus:bg-fourth text-black transition"
          />
        </div>

        {/* AUTH */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <div
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
              >
                <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center text-sm">
                  {user.name.charAt(0).toUpperCase()}
                </div>

                <span className="text-sm text-white">
                  {user.name}
                </span>
              </div>
              {open && (
                <div className="absolute -right-10 mt-2 w-44 bg-zinc-700 border rounded-xl shadow-lg py-2 z-50">
                  
                  <button className="w-full text-left px-4 py-2 text-sm hover:text-black transition-all cursor-pointer hover:text-base duration-200">
                    Profil
                  </button>

                  <button className="w-full text-left px-4 py-2 text-sm hover:text-black transition-colors cursor-pointer hover:text-base duration-200">
                    Ayarlar
                  </button>

                  <div className="border-t my-1" />

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-500 cursor-pointer hover:text-red-300 hover:text-base duration-200"
                  >
                    Çıkış Yap
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-button px-4 py-1.5 rounded-md text-sm hover:bg-third transition"
            >
              Giriş Yap
            </Link>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1"
        >
          <span
            className={`w-6 h-0.5 bg-white transition ${
              isOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-white transition ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-white transition ${
              isOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          />
        </button>
      </div>

      {/* MOBILE MENU */}
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

        {/* SEARCH */}
        <div className="mt-4">
          <input
            type="text"
            placeholder="Ara..."
            className="w-full bg-third px-3 py-2 rounded-xl outline-none focus:bg-fourth text-black"
          />
        </div>

        {/* AUTH */}
        <div className="pt-4 mt-4 border-t border-third">
          {user ? (
            <>
              <p className="text-sm mb-2 text-fourth text-center">
                {user.name}
              </p>

              <button
                onClick={handleLogout}
                className="w-full bg-danger py-2 rounded-md text-sm"
              >
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