import { useState, useEffect, useContext } from "react";
import { FaLink, FaSave } from "react-icons/fa";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const AddLink = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [folder, setFolder] = useState(null);
  const [note, setNote] = useState("");
  const [folders, setFolders] = useState([]);
  const { token, isAuthLoading, navigate } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/links`,
        {
          title,
          url,
          notes: note,
          folderId: folder,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/folders");
    } catch (err) {
      console.error("Error adding link", err);
      alert("Failed to save link");
    }
  };

  useEffect(() => {
    if (isAuthLoading || !token) return;

    const fetchFolders = async () => {
      if (isAuthLoading || !token) return;
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL_BACKEND}/folders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFolders(res.data.data.folders);
      } catch (err) {
        console.error("Error fetching folders", err);
      }
    };

    fetchFolders();
  }, [isAuthLoading, token]);

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
          <FaLink className="mr-2 text-orange-500" /> Add New Link
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm text-slate-700">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="e.g. Google"
              autoFocus
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-slate-700">URL</label>
            <input
              type="url"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="https://example.com"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-slate-700">Folder</label>
            <select
              value={folder ? folder : ""}
              onChange={(e) => setFolder(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
            >
              <option value="">Select Folder</option>
              {folders.length > 0 &&
                folders.map((f) => (
                  <option key={f._id} value={f._id}>
                    {f.name}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm text-slate-700">Note</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows="3"
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
              placeholder="Optional note about this link"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-md flex items-center justify-center hover:bg-orange-600 transition cursor-pointer"
          >
            <FaSave className="mr-2" /> Save Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLink;
