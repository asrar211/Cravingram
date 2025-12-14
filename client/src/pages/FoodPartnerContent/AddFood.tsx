import { useState } from "react";
import { useFoodItem } from "../../hooks/useFoodItem";
import { useNavigate } from "react-router-dom";

export const AddFood = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState<File | null>(null);
  const navigate = useNavigate();

  const { addFoodItem, loading, error } = useFoodItem();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !description || !video) {
      alert("All fields are required including video!");
      return;
    }

    await addFoodItem(name, description, video);
    alert("Food Uploaded Successfully!");
    navigate("/");
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-900 flex items-start justify-center px-4">
      <div className="w-full max-w-xl bg-gray-800 border border-gray-700 rounded-xl shadow-xl p-8">
        <h1 className="text-2xl font-semibold text-white text-center mb-6">
          Add New Food Item
        </h1>

        {loading && (
          <p className="text-blue-400 text-sm mb-3 text-center">Uploading...</p>
        )}

        {error && (
          <p className="text-red-400 text-sm mb-3 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Food Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 text-gray-200 border border-gray-600 
            rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
          />

          <input
            type="text"
            placeholder="Food Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 text-gray-200 border border-gray-600 
            rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
          />

          <div>
            <label className="block text-gray-300 text-sm mb-2">
              Upload Food Video:
            </label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideo(e.target.files?.[0] || null)}
              className="w-full text-gray-300 bg-gray-700 border border-gray-600 rounded-lg 
              p-2 cursor-pointer focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg 
            font-medium text-sm hover:bg-blue-700 transition-all shadow-md"
          >
            Add Food
          </button>
        </form>
      </div>
    </div>
  );
};
