import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFolderOpen, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const FolderCard = ({ folder, onDelete }) => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this folder?")) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/folders/${folder._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onDelete?.(folder._id);
    } catch (err) {
      console.error("Failed to delete folder", err);
      alert("Error deleting folder. Try again.");
    }
  };

  const handleEdit = () => {
    navigate(`/edit-folder/${folder._id}`);
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md hover:shadow-lg transition border border-orange-100 relative p-4">
      <Link to={`/folders/${folder._id}`} className="block">
        <div className="flex items-center gap-2 mb-2">
          <FaFolderOpen className="text-orange-400 text-xl shrink-0" />
          <h2 className="text-base font-semibold text-slate-800 truncate">
            {folder.name}
          </h2>
        </div>
      </Link>

      <div className="absolute top-3 right-3 flex gap-2">
        <button
          onClick={handleEdit}
          className="text-blue-500 hover:text-blue-700"
          title="Edit"
        >
          <FaEdit />
        </button>
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700"
          title="Delete"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default FolderCard;
