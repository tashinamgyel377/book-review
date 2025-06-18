import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Header = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Profile", path: "/profile" },
    { label: "Books", path: "/book" },
  ];

  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md sticky top-0 z-50">
      {/* Top section with logo and centered welcome text */}
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center relative">
        {/* Logo */}
        <div
          className="text-xl font-bold cursor-pointer tracking-wide hover:opacity-80 transition"
          onClick={() => navigate("/")}
        >
          📚 BookVerse
        </div>

        {/* Centered Welcome Text with padding */}
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-semibold tracking-wide text-white px-4 py-2">
          Welcome to <span className="text-yellow-300">BookLibrary</span>
        </h1>

        {/* Right space reserved */}
        <div></div>
      </div>

      {/* Navigation Bar */}
      <div className="bg-white text-gray-800">
        <nav className="max-w-6xl mx-auto px-6 py-3 flex justify-center flex-wrap gap-6 font-medium text-lg">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `py-2 px-4 rounded-md transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-teal-500 to-green-500 text-white shadow"
                    : "text-gray-700 hover:text-teal-600 hover:bg-gray-100"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
