import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 px-6">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-orange-500">404</h1>
        <p className="text-xl text-slate-700">Page Not Found</p>
        <Link to="/">
          <button className="mt-4 bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition">
            Go Back Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
