import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { toast } from "react-hot-toast";
import { auth } from "../firebase.config";

const AddArtwork = () => {
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        imageUrl: "",
        title: "",
        category: "",
        description: "",
        price: "",
        visibility: "Public",
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setFormData((prevData) => {
            return {
                ...prevData,
                [name]: value
            };
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const artworkData = {
            ...formData,
            userName: user.displayName || "Anonymous",
            userEmail: user.email
        };

        try {
            await fetch("http://localhost:3000/artworks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(artworkData)
            });

            toast.success("Artwork added successfully!");

            setFormData({
                imageUrl: "",
                title: "",
                category: "",
                description: "",
                price: "",
                visibility: "Public",
            });

        } catch (error) {
            console.error(error);
            toast.error("Something went wrong!");
        }
    }

    return (
        <div>
            <h2 className='text-center my-5 text-2xl md:text-4xl font-bold text-[#8BBA45]'>Add Your Art Works</h2>
            <div className="min-h-screen flex items-start justify-center bg-gray-50 py-10 px-4">
                <div className="max-w-5xl w-full bg-white p-8 rounded-3xl shadow-lg border border-[#8BBA45] flex flex-col md:flex-row gap-8">

                    
                    <div className="flex-1 flex flex-col items-center">
                        
                        {formData.imageUrl ? (
                            <img
                                src={formData.imageUrl}
                                alt="Artwork Preview"
                                className="rounded-2xl shadow-lg max-h-96 object-contain mb-4 border-2 border-[#8BBA45]"
                            />
                        ) : (
                            <div className="flex items-center justify-center w-full h-96 bg-gray-100 rounded-2xl border-2 border-dashed border-[#8BBA45] text-gray-400 mb-4">
                                Live Preview
                            </div>
                        )}

                        <div className="w-full space-y-3">
                            <input
                                type="text"
                                value={user?.displayName || "Anonymous"}
                                readOnly
                                className="w-full p-3 border rounded-lg bg-gray-100 border-[#8BBA45]"
                            />
                            <input
                                type="email"
                                value={user?.email || ""}
                                readOnly
                                className="w-full p-3 border rounded-lg bg-gray-100 border-[#8BBA45]"
                            />
                        </div>
                    </div>

                    <div className="flex-1">
                        <form onSubmit={handleSubmit} className="space-y-4">

                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Title"
                                className="w-full p-3 border rounded-lg border-[#8BBA45] focus:outline-none focus:ring-2 focus:ring-[#8BBA45]"
                                required
                            />

                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                placeholder="Category"
                                className="w-full p-3 border rounded-lg border-[#8BBA45] focus:outline-none focus:ring-2 focus:ring-[#8BBA45]"
                                required
                            />

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Description"
                                className="w-full p-3 border rounded-lg border-[#8BBA45] focus:outline-none focus:ring-2 focus:ring-[#8BBA45] h-28 resize-none"
                                required
                            />

                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="Price (optional)"
                                className="w-full p-3 border rounded-lg border-[#8BBA45] focus:outline-none focus:ring-2 focus:ring-[#8BBA45]"
                            />

                            <select
                                name="visibility"
                                value={formData.visibility}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg border-[#8BBA45] focus:outline-none focus:ring-2 focus:ring-[#8BBA45]"
                            >
                                <option value="Public">Public</option>
                                <option value="Private">Private</option>
                            </select>

                            <input
                                type="url"
                                name="imageUrl"
                                value={formData.imageUrl}
                                onChange={handleChange}
                                placeholder="Image URL"
                                className="w-full p-3 border rounded-lg border-[#8BBA45] focus:outline-none focus:ring-2 focus:ring-[#8BBA45]"
                                required
                            />

                            <button
                                type="submit"
                                className="w-full bg-[#8BBA45] text-white py-3 rounded-lg font-bold"
                            >
                                Add Artwork
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AddArtwork;
