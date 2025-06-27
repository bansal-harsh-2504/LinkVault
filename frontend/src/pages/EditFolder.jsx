import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const EditFolder = () => {
  const { id: folderId } = useParams();
  const navigate = useNavigate();
  const { token, isAuthLoading } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/folders/${folderId}`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate(`/folders/${folderId}`, { replace: true });
    } catch (err) {
      setError("Failed to update folder.");
      console.error(err);
    }
  };

  useEffect(() => {
    if (isAuthLoading || !token) return;
    const fetchFolder = async () => {
      if (!token || isAuthLoading) return;
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL_BACKEND}/folders/${folderId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { folder } = res.data.data;
        setName(folder.name || "");
      } catch (err) {
        setError("Failed to fetch folder details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFolder();
  }, [folderId, token, isAuthLoading]);

  useEffect(() => {
    if (!isAuthLoading && !token) {
      navigate("/auth", { replace: true });
      return;
    }
  }, [isAuthLoading, token, navigate]);

  if (loading) {
    return <p className="text-center text-slate-500 mt-10">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-orange-50 flex justify-center items-center px-4">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md border border-orange-100">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Edit Folder</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block font-medium text-slate-700">
              Folder Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <button
            type="submit"
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition cursor-pointer"
          >
            Update Folder
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditFolder;
