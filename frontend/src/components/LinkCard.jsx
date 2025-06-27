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
      <div className="flex items-start justify-between gap-3 mb-1">
        <div className="flex flex-col max-w-[85%]">
          <span className="text-lg font-semibold text-slate-800 mb-1 truncate">
            {link.title?.trim() || "title"}
          </span>
          <div className="flex items-center gap-2">
            <FaLink className="text-orange-500 flex-shrink-0" />
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline break-all line-clamp-1 truncate"
              title={link.url}
            >
              {link.url}
            </a>
          </div>
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
      {link.notes && (
        <p className="text-sm text-slate-600 mt-2 line-clamp-2 break-words">
          {link.notes}
        </p>
      )}
    </div>
  );
};

export default LinkCard;
