import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const EditLink = () => {
  const { id: linkId } = useParams();
  const { token, isAuthLoading, navigate } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/links/${linkId}`,
        { title, url, notes },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate(-1);
    } catch (err) {
      console.error("Failed to update link", err);
      setError("Failed to update link.");
    }
  };

  useEffect(() => {
    if (isAuthLoading || !token) return;
    const fetchLink = async () => {
      if (!token || isAuthLoading) return;
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL_BACKEND}/links/${linkId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const link = res.data.data;
        setTitle(link.title || "");
        setUrl(link.url || "");
        setNotes(link.notes || "");
      } catch (err) {
        console.error("Failed to fetch link details", err);
        setError("Failed to fetch link.");
      } finally {
        setLoading(false);
      }
    };
    fetchLink();
  }, [linkId, token, isAuthLoading]);

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
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Edit Link</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block font-medium text-slate-700">
              Title
            </label>
            <input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div>
            <label htmlFor="url" className="block font-medium text-slate-700">
              URL
            </label>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div>
            <label htmlFor="notes" className="block font-medium text-slate-700">
              Notes
            </label>
            <textarea
              id="notes"
              rows="4"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition"
          >
            Update Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditLink;
