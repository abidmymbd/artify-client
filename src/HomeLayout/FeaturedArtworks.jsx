import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router";

const FeaturedArtworks = () => {
    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3000/featured-artworks")
            .then((res) => res.json())
            .then((data) => setArtworks(data))
            .catch(() => toast.error("Failed to load artworks"))
            .finally(() => setLoading(false))
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <span className="loading loading-bars loading-md"></span>
            </div>
        );
    }

    return (
        <div className="my-15">
            <h2 className="text-center text-2xl md:text-4xl font-bold text-[#8BBA45] mb-8">
                Featured Artworks
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {artworks.map((art) => (
                    <div
                        key={art._id}
                        className="bg-white border border-[#8BBA45] rounded-2xl shadow p-4 flex flex-col"
                    >
                        <img
                            src={art.imageUrl}
                            alt={art.title}
                            className="rounded-xl mb-4 object-cover h-48 w-full"
                        />
                        <h3 className="text-lg font-bold text-[#8BBA45]">{art.title}</h3>
                        <p className="text-gray-600 font-semibold">Artist: {art.userName}</p>
                        <p className="text-gray-600">Category: {art.category}</p>

                        <Link
                            to={`/artworks/${art._id}`}
                            className="mt-3 text-center bg-[#8BBA45] text-white py-2 rounded-lg font-semibold hover:bg-[#7aa73c] transition"
                        >
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedArtworks;
