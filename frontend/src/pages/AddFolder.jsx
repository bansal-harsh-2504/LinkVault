import { useState, useContext, useEffect } from "react";
import { FaFolderPlus } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const AddFolder = () => {
  const [name, setName] = useState("");
  const { token, user, isAuthLoading, navigate } = useContext(AuthContext);
  const { id: parentFolderId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/folders`,
        {
          name,
          parentFolderId: parentFolderId || null,
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (parentFolderId) {
        navigate(`/folders/${parentFolderId}`);
      } else {
        navigate("/folders");
      }
    } catch (err) {
      console.error("Failed to create folder", err);
    }
  };

  useEffect(() => {
    if (!isAuthLoading && !token) {
      navigate("/auth", { replace: true });
      return;
    }
  }, [isAuthLoading, token, navigate]);

  return (
    <div className="min-h-screen bg-orange-50 px-6 py-20 mt-10">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-slate-800 flex items-center">
          <FaFolderPlus className="mr-2 text-orange-500" />
          {parentFolderId ? "Create Subfolder" : "Create New Folder"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm text-slate-700">
              Folder Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="e.g. Dev Resources"
              autoFocus
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition cursor-pointer"
          >
            Create Folder
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFolder;
