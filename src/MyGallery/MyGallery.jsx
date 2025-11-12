import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { auth } from "../firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router";
import Swal from "sweetalert2";

const MyGallery = () => {
    const [user, setUser] = useState(null);
    const [artworks, setArtworks] = useState([]);
    const [editingArtwork, setEditingArtwork] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        description: "",
        imageUrl: "",
        price: "",
        visibility: "Public",
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, setUser);
        return () => unsubscribe();
    }, []);

    const fetchArtworks = async () => {
        if (!user) return;
        try {
            const res = await fetch(`http://localhost:3000/artworks?email=${user.email}`);
            if (res.ok) {
                const data = await res.json();
                setArtworks(data);
            } else toast.error("Failed to fetch your artworks");
        } catch {
            toast.error("Something went wrong while fetching artworks");
        }
    };

    useEffect(() => {
        fetchArtworks();
    }, [user]);

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you really want to delete this artwork?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#8BBA45",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await fetch(`http://localhost:3000/artworks/${id}`, { method: "DELETE" });
                    if (res.ok) {
                        toast.success("Artwork deleted successfully!");
                        fetchArtworks();
                    } else toast.error("Failed to delete artwork");
                } catch {
                    toast.error("Something went wrong while deleting artwork");
                }
            }
        });
    };

    const handleEdit = (artwork) => {
        setEditingArtwork(artwork);
        setFormData({
            title: artwork.title,
            category: artwork.category,
            description: artwork.description,
            imageUrl: artwork.imageUrl,
            price: artwork.price || "",
            visibility: artwork.visibility || "Public",
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!editingArtwork) return;

        try {
            const res = await fetch(`http://localhost:3000/artworks/${editingArtwork._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                toast.success("Artwork updated successfully!");
                setEditingArtwork(null);
                fetchArtworks();
            } else toast.error("Failed to update artwork");
        } catch {
            toast.error("Something went wrong while updating artwork");
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-6">
            <h2 className="text-center mb-10 my-5 text-2xl md:text-4xl font-bold text-[#8BBA45]">
                My Gallery
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {artworks.map((art) => (
                    <div key={art._id} className="border-2 border-[#8BBA45] rounded-2xl shadow-lg p-4 space-y-3 bg-white relative">
                        <img src={art.imageUrl} alt={art.title} className="rounded-xl h-48 w-full object-cover" />
                        <h3 className="font-bold text-lg text-[#8BBA45]">{art.title}</h3>
                        <p><span className="font-bold">Category:</span> {art.category}</p>
                        <p><span className="font-bold">Price:</span> {art.price || "N/A"}</p>

                        <div className="flex flex-col sm:flex-row justify-between mt-3 gap-2">
                            <Link
                                to={`/artworks/${art._id}`}
                                className="bg-[#8BBA45] text-white px-4 py-2 rounded-lg text-center hover:bg-[#7aa73c] transition"
                            >
                                View Details
                            </Link>

                            <button
                                onClick={() => handleEdit(art)}
                                className="bg-[#8BBA45] text-white px-4 py-2 rounded-lg hover:bg-[#7aa73c] transition"
                            >
                                Update
                            </button>

                            <button
                                onClick={() => handleDelete(art._id)}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>


            {editingArtwork && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-lg relative">
                        <h3 className="text-2xl font-bold text-[#8BBA45] mb-4">Update Artwork</h3>
                        <form className="space-y-3" onSubmit={handleUpdate}>
                            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="w-full p-3 border rounded-lg border-[#8BBA45]" required />
                            <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" className="w-full p-3 border rounded-lg border-[#8BBA45]" required />
                            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full p-3 border rounded-lg border-[#8BBA45] h-24 resize-none" required />
                            <input type="url" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Image URL" className="w-full p-3 border rounded-lg border-[#8BBA45]" required />
                            <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price (optional)" className="w-full p-3 border rounded-lg border-[#8BBA45]" />
                            <select name="visibility" value={formData.visibility} onChange={handleChange} className="w-full p-3 border rounded-lg border-[#8BBA45]">
                                <option value="Public">Public</option>
                                <option value="Private">Private</option>
                            </select>

                            <div className="flex justify-end gap-3 mt-3">
                                <button type="button" onClick={() => setEditingArtwork(null)} className="px-4 py-2 rounded-lg border border-gray-400 hover:bg-gray-100">Cancel</button>
                                <button type="submit" className="bg-[#8BBA45] text-white px-4 py-2 rounded-lg hover:bg-[#7aa73c]">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyGallery;
