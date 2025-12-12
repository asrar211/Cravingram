import { useState } from "react";
import { useFoodItem } from "../../hooks/useFoodItem";

export const AddFood = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState<File | null>(null);

  const { addFoodItem, loading, error } = useFoodItem();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !description || !video) {
      alert("All fields are required including video!");
      return;
    }

    await addFoodItem(name, description, video);
    alert("Food Uploaded Successfully!");
  };

  return (
    <div className="max-w-xl mx-auto pt-20">
      <form onSubmit={handleSubmit}>
        {loading && <p>Uploading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <input
          type="text"
          placeholder="Food Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Food Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideo(e.target.files?.[0] || null)}
        />

        <button type="submit">Add Food</button>
      </form>
    </div>
  );
};
