import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import FolderCard from "../components/FolderCard";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import LinkCard from "../components/LinkCard";

const FolderDetail = () => {
  const { id: folderId } = useParams();
  const [folderName, setFolderName] = useState("Loading...");
  const [subfolders, setSubfolders] = useState([]);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token, isAuthLoading, navigate } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthLoading || !token) return;
    const fetchFolderAndLinks = async () => {
      if (isAuthLoading || !token) return;
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL_BACKEND}/folders/${folderId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { folder, subfolders, links } = res.data.data;
        setFolderName(folder.name);
        setSubfolders(subfolders || []);
        setLinks(links || []);
      } catch (err) {
        console.error("Failed to fetch folder data", err);
        setFolderName("Folder Not Found");
        setSubfolders([]);
        setLinks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFolderAndLinks();
  }, [folderId, token, isAuthLoading]);

  useEffect(() => {
    if (!isAuthLoading && !token) {
      navigate("/auth", { replace: true });
    }
  }, [isAuthLoading, token, navigate]);

  return (
    <div className="min-h-screen bg-orange-50 px-6 py-20 mt-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-end mb-6 gap-4">
          <Link to={`/add-folder/${folderId}`}>
            <button className="bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-500 cursor-pointer">
              + Add Subfolder
            </button>
          </Link>
          <Link to={folderId ? `/add-link/${folderId}` : "/add-link"}>
            <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 cursor-pointer">
              + Add Link
            </button>
          </Link>
        </div>

        <h2 className="text-3xl font-bold text-slate-800 mb-6">{folderName}</h2>

        {loading ? (
          <p className="text-center text-slate-500">Loading data...</p>
        ) : (
          <>
            {/* Subfolders */}
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {subfolders.map((folder) => (
                <FolderCard
                  key={folder._id}
                  folder={folder}
                  onDelete={(id) =>
                    setSubfolders((prev) => prev.filter((f) => f._id !== id))
                  }
                />
              ))}
            </div>

            {/* Links */}
            {links.length > 0 && (
              <>
                <h3 className="text-xl font-semibold text-slate-700 mb-4">
                  Links
                </h3>
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

            {subfolders.length === 0 && links.length === 0 && (
              <p className="text-center text-slate-500">
                Nothing to show here.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FolderDetail;
