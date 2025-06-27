import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaFolderPlus, FaLink } from "react-icons/fa";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import FolderCard from "../components/FolderCard";
import LinkCard from "../components/LinkCard";

const Folders = ({ parentId }) => {
  parentId = parentId || null;

  const [folders, setFolders] = useState([]);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  const { token, isAuthLoading, navigate } = useContext(AuthContext);

  const fetchFoldersAndLinks = async () => {
    try {
      const endpoint = parentId
        ? `${import.meta.env.VITE_BASE_URL_BACKEND}/folders/${parentId}`
        : `${import.meta.env.VITE_BASE_URL_BACKEND}/folders/root`;

      const res = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data.data || [];
      setFolders(data.subfolders || []);
      setLinks(data.links || []);
    } catch (err) {
      console.error("Failed to load folders/links", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthLoading && !token) return;
    fetchFoldersAndLinks();
  }, [isAuthLoading, token]);

  useEffect(() => {
    if (!isAuthLoading && !token) {
      navigate("/auth", { replace: true });
    }
  }, [isAuthLoading, token, navigate]);

  const handleFolderDelete = (id) => {
    setFolders((prev) => prev.filter((f) => f._id !== id));
  };

  return (
    <div className="min-h-screen bg-orange-50 px-6 py-20 mt-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-slate-800">My Folders</h1>
          <div className="flex gap-3">
            <Link to={parentId ? `/add-folder/${parentId}` : "/add-folder"}>
              <button className="flex items-center bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition cursor-pointer">
                <FaFolderPlus className="mr-2" /> New Folder
              </button>
            </Link>
            <Link to="/add-link">
              <button className="flex items-center bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition cursor-pointer">
                <FaLink className="mr-2" /> Add Link
              </button>
            </Link>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-slate-500">Loading...</p>
        ) : (
          <>
            {folders.length > 0 && (
              <>
                <h2 className="text-xl font-semibold text-slate-700 mb-4">
                  Folders
                </h2>
                <div className="grid md:grid-cols-2 gap-6 mb-10">
                  {folders.map((folder) => (
                    <FolderCard
                      key={folder._id}
                      folder={folder}
                      onDelete={() => handleFolderDelete(folder._id)}
                    />
                  ))}
                </div>
              </>
            )}

            {links.length > 0 && (
              <>
                <h2 className="text-xl font-semibold text-slate-700 mb-4">
                  Links
                </h2>
                <div className="grid gap-4">
                  {links.map((link) => (
                    <LinkCard
                      key={link._id}
                      link={link}
                      onDelete={(id) =>
                        setLinks((prev) => prev.filter((l) => l._id !== id))
                      }
                    />
                  ))}
                </div>
              </>
            )}

            {folders.length === 0 && links.length === 0 && (
              <p className="text-center text-slate-500">
                No folders or links found.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Folders;
