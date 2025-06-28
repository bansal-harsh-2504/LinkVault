import { useState, useContext, useEffect } from "react";
import { FaFolderPlus } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const AddFolder = () => {
  const [name, setName] = useState("");
  const [allFolders, setAllFolders] = useState([]);
  const [selectedParentId, setSelectedParentId] = useState(null);

  const { token, user, isAuthLoading, navigate } = useContext(AuthContext);
  const { id: parentFolderId } = useParams();

  useEffect(() => {
    if (!isAuthLoading && token) {
      setSelectedParentId(parentFolderId || null);
      fetchAllFolders();
    }
  }, [isAuthLoading, token, parentFolderId]);

  const fetchAllFolders = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/folders`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAllFolders(res.data.data.folders || []);
    } catch (err) {
      console.error("Failed to fetch folders", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/folders`,
        {
          name,
          parentFolderId: selectedParentId || null,
          userId: user._id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const newFolderId = res.data.data._id;
      navigate(`/folders/${newFolderId}`);
    } catch (err) {
      console.error("Failed to create folder", err);
    }
  };

  useEffect(() => {
    if (!isAuthLoading && !token) {
      navigate("/auth", { replace: true });
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

          <div>
            <label className="block mb-1 text-sm text-slate-700">
              Parent Folder
            </label>
            <select
              value={selectedParentId || ""}
              onChange={(e) => setSelectedParentId(e.target.value || null)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="">None (root folder)</option>
              {allFolders.map((folder) => (
                <option key={folder._id} value={folder._id}>
                  {folder.name}
                </option>
              ))}
            </select>
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
