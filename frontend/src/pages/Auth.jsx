import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  MdOutlineShield,
  MdOutlineLogin,
  MdPersonAddAlt1,
} from "react-icons/md";
import {
  FaFolderOpen,
  FaTags,
  FaLink,
  FaCheckCircle,
  FaBolt,
} from "react-icons/fa";
import axios from "axios";

const Auth = () => {
  const [loginError, setLoginError] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loggedIn, navigate, setToken, setLoggedIn, setUser } =
    useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = (
        await axios.post(
          `${import.meta.env.VITE_BASE_URL_BACKEND}/auth/login`,
          { email, password },
          { withCredentials: true }
        )
      ).data;

      if (res.success) {
        localStorage.setItem("jwt_token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        setToken(res.token);
        setUser(res.user);
        setLoggedIn(true);
        navigate("/");
      }
    } catch (err) {
      setLoginError(err.response?.message || "Login failed.");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = (
        await axios.post(
          `${import.meta.env.VITE_BASE_URL_BACKEND}/auth/signup`,
          { email, password },
          { withCredentials: true }
        )
      ).data;

      if (res.success) {
        setIsLogin(true);
        setLoginError(null);
      }
    } catch (err) {
      setLoginError(err.response?.message || "Signup failed.");
    }
  };

  const features = [
    {
      icon: <FaFolderOpen className="text-orange-500" />,
      title: "Organize with Folders",
      description: "Manually categorize links into smart folders.",
    },
    {
      icon: <FaLink className="text-blue-500" />,
      title: "Manage Your Links",
      description: "Save, annotate, and never lose a link again.",
    },
    {
      icon: <FaTags className="text-green-500" />,
      title: "Search & Filter",
      description: "Quickly find links by folder, note, or title.",
    },
  ];

  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  }, [loggedIn, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="space-y-6">
            <h2 className="text-5xl font-bold text-gray-800 leading-tight">
              Take control of your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                digital bookmarks
              </span>
            </h2>
            <p className="text-lg text-gray-600">
              LinkVault helps you store, categorize, and rediscover your
              favorite links — all in one secure place.
            </p>
          </div>

          <div className="grid gap-4">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur rounded-lg border hover:shadow-md transition border-orange-200"
              >
                <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-6 pt-4">
            <div className="flex items-center gap-2">
              <MdOutlineShield className="text-green-500" />
              <span className="text-sm text-gray-600">Secure by Design</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500" />
              <span className="text-sm text-gray-600">No Data Sharing</span>
            </div>
            <div className="flex items-center gap-2">
              <FaBolt className="text-orange-500" />
              <span className="text-sm text-gray-600">Fast Access</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center min-h-screen px-4 ml-5">
          <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-md text-center space-y-6">
            <div className="text-3xl mb-6">
              <span className="bg-white border px-3 py-3 rounded-xl border-orange-400 shadow">
                🔐
              </span>
            </div>

            <h1 className="text-3xl font-semibold text-gray-800 tracking-wide">
              {isLogin ? "Login to" : "Sign up for"}{" "}
              <span className="font-bold text-orange-500">LinkVault</span>
            </h1>

            <p className="text-gray-500 text-sm -mt-4">
              {isLogin
                ? "Access your personal dashboard"
                : "Create an account to start organizing your links"}
            </p>

            {loginError && <p className="text-red-500 text-sm">{loginError}</p>}

            <form
              onSubmit={isLogin ? handleLogin : handleSignup}
              className="space-y-4 text-left"
            >
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
              >
                {isLogin ? (
                  <span className="flex items-center justify-center gap-2 cursor-pointer">
                    <MdOutlineLogin /> Login
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2 cursor-pointer">
                    <MdPersonAddAlt1 /> Sign Up
                  </span>
                )}
              </button>
            </form>

            <div className="text-sm text-gray-600 pt-2">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setLoginError(null);
                }}
                className="text-orange-500 font-semibold hover:underline"
              >
                {isLogin ? "Sign up" : "Login"}
              </button>
            </div>

            <p className="text-xs text-gray-400 pt-4">
              By signing in, you agree to our{" "}
              <span className="font-bold text-orange-400 cursor-pointer">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="font-bold text-orange-400 cursor-pointer">
                Privacy Policy
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
