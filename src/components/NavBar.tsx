import { NavLink } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Header = () => {
  const { isAuthenticated, logout } = useAuthStore();
  const navItems = [
    { label: "Home", path: "/" },
    { label: "Profile", path: "/profile" },
    { label: "Books", path: "/book" },
  ];

  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">
      {/* Top Welcome Section */}
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-wide">📚 Welcome to BookVerse</h1>
        <div className="space-x-6"></div>
      </div>

      {/* Nav Bar Section with Light Purple Background */}
      <div className="bg-purple-200 text-black">
        <nav className="max-w-6xl mx-auto px-6 py-4 flex justify-center items-center gap-10 font-medium text-lg">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `py-2 px-4 rounded-md transition-all duration-300 ${
                  isActive
                    ? "text-white bg-gradient-to-r from-teal-500 to-green-500"
                    : "text-gray-700 hover:text-teal-500 hover:scale-105"
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
