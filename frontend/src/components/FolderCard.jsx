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
      if (onDelete) onDelete(folder._id);
    } catch (err) {
      console.error("Failed to delete folder", err);
      alert("Error deleting folder");
    }
  };

  const handleEdit = () => {
    navigate(`/edit-folder/${folder._id}`);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition border border-orange-100 relative">
      <Link to={`/folders/${folder._id}`}>
        <div className="flex items-center gap-3">
          <FaFolderOpen className="text-orange-400 text-2xl" />
          <h2 className="text-lg font-semibold text-slate-800">
            {folder.name}
          </h2>
        </div>
      </Link>
      <p className="text-sm text-slate-500 mt-2">
        {folder.totalLinks || 0} links saved
      </p>
      <div className="absolute top-3 right-3 flex gap-3">
        <button
          onClick={handleEdit}
          className="text-blue-500 hover:text-blue-700 cursor-pointer"
          title="Edit"
        >
          <FaEdit />
        </button>
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700 cursor-pointer"
          title="Delete"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default FolderCard;
