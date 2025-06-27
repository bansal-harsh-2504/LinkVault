import { FaLink, FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LinkCard = ({ link, onDelete }) => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this link?")) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/links/${link._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onDelete(link._id);
    } catch (err) {
      console.error("Failed to delete link", err);
      alert("Error deleting link. Try again.");
    }
  };

  const handleEdit = () => {
    navigate(`/edit-link/${link._id}`);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow hover:shadow-md transition border border-orange-100">
      <div className="flex items-center justify-between gap-3 mb-1">
        <div className="flex items-center gap-2">
          <FaLink className="text-orange-500" />
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline break-all"
          >
            {link.url}
          </a>
        </div>
        <div className="flex items-center gap-2">
          <FaEdit
            className="text-gray-500 hover:text-blue-600 cursor-pointer"
            onClick={handleEdit}
          />
          <FaTrash
            className="text-gray-500 hover:text-red-600 cursor-pointer"
            onClick={handleDelete}
          />
        </div>
      </div>
      <p className="text-sm text-slate-600">{link.notes}</p>
    </div>
  );
};

export default LinkCard;
