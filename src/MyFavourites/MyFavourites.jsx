import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyFavourites = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    const userEmail = "test@example.com";

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const res = await fetch(`https://artify-server-jade.vercel.app/favorites/${userEmail}`);
                const data = await res.json();

                if (Array.isArray(data)) {
                    setFavorites(data);
                } else {
                    console.error("Unexpected response format:", data);
                    setFavorites([]);
                }
            } catch (err) {
                console.error("Failed to load favorites", err);
                setFavorites([]);
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, [userEmail]);

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You want to remove this from favorites?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#8BBA45",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, remove it!",
        });

        if (result.isConfirmed) {
            try {
                const res = await fetch(`https://artify-server-jade.vercel.app/favorites/${id}`, {
                    method: "DELETE",
                });
                const data = await res.json();

                if (res.ok) {
                    setFavorites((prev) => prev.filter((fav) => fav._id !== id));
                    Swal.fire({
                        title: "Removed!",
                        text: "Artwork removed from favorites.",
                        icon: "success",
                        confirmButtonColor: "#8BBA45",
                    });
                } else {
                    Swal.fire("Error", data.message || "Failed to remove.", "error");
                }
            } catch (err) {
                Swal.fire("Error", "Something went wrong.", "error");
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <h2 className="text-center mb-10 text-2xl md:text-4xl font-bold text-[#8BBA45]">
                My Favourite Items
            </h2>

            {loading ? (
                <p className="text-center text-gray-500">Loading favorites...</p>
            ) : favorites.length === 0 ? (
                <p className="text-center text-gray-500">No favorite artworks yet.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {favorites.map((fav) => (
                        <div
                            key={fav._id}
                            className="bg-white rounded-2xl shadow-md border border-[#8BBA45] overflow-hidden hover:shadow-lg transition-shadow duration-200"
                        >
                            <img
                                src={fav.imageUrl}
                                alt={fav.title}
                                className="w-full h-60 object-cover"
                            />
                            <div className="p-4 space-y-2">
                                <h3 className="text-xl font-semibold text-[#8BBA45]">
                                    {fav.title}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    <strong>Artist:</strong> {fav.userName || " "}
                                </p>
                                <p className="text-sm text-gray-600">
                                    <strong>Category:</strong> {fav.category || " "}
                                </p>

                                <div className="mt-3">
                                    <button
                                        onClick={() => handleDelete(fav._id)}
                                        className="bg-red-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-600 transition"
                                    >
                                        Remove from Favourite
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyFavourites;
