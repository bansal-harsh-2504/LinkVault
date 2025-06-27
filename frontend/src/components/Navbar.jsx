import { useContext, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { FiLogOut } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { BsPerson } from "react-icons/bs";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { loggedIn, setLoggedIn, navigate, setToken, user, setUser } =
    useContext(AuthContext);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setLoggedIn(false);
    setToken("");
    setUser(null);
    localStorage.removeItem("jwt_token");
    navigate("/auth");
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm border-orange-100"
          : "bg-white border-orange-100"
      }`}
    >
      <div className="flex items-center justify-between py-1 font-medium">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <NavLink to="/" className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-md bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center">
                  <FaStar className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-xl bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  LinkVault
                </span>
              </NavLink>
            </div>
            <div className="relative flex items-center gap-6" ref={dropdownRef}>
              {loggedIn ? (
                <div
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-[256px] flex items-center gap-3 px-3 py-2 rounded-full cursor-pointer hover:bg-orange-300 transition-colors duration-200"
                >
                  <img
                    src="/default-profile.jpg"
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="text-left leading-4">
                    <div className="text-xs max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap text-gray-500">
                      {user?.email || "john@example.com"}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <NavLink to="/auth">
                    <button className="flex bg-white items-center text-gray-600 px-4 py-1.25 rounded-lg border border-orange-200 cursor-pointer transition-colors duration-300 group hover:bg-orange-50">
                      Log In
                    </button>
                  </NavLink>
                  <NavLink to="/auth">
                    <button className="flex bg-orange-400 items-center text-white px-4 py-1.25 rounded-lg shadow cursor-pointer transition-colors duration-300 group hover:bg-orange-500">
                      Get Started
                    </button>
                  </NavLink>
                </div>
              )}

              {dropdownOpen && loggedIn && (
                <div className="absolute top-[110%] w-64 text-gray-600 rounded-lg shadow-lg z-50">
                  <div className="px-4 py-3 border-b border-orange-300 bg-orange-300 rounded-t-lg">
                    <div className="flex items-center gap-3 ">
                      <img
                        src="/default-profile.jpg"
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="text-left text-sm leading-tight">
                        <p className="text-xs text-gray-500 max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
                          {user?.email || "john@example.com"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <ul className="text-sm p-2 bg-white rounded-lg">
                    <li
                      className="px-4 py-2 rounded-lg hover:bg-orange-100 hover:text-gray-600 flex items-center gap-2 cursor-pointer text-red-400"
                      onClick={handleLogout}
                    >
                      <FiLogOut className="text-lg" /> Sign Out
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
