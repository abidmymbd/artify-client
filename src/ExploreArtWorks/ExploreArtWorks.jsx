import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const ExploreArtWorks = () => {
    const [artworks, setArtworks] = useState([]);
    const [filteredArtworks, setFilteredArtworks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [categories, setCategories] = useState([]);

    // Fetch all artworks data
    const fetchArtworks = async (query = "") => {
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:3000/artworks?search=${query}`);
            const data = await res.json();
            setArtworks(data);


            const uniqueCategories = ["All", ...new Set(data.map((art) => art.category || "Uncategorized"))];
            setCategories(uniqueCategories);
            setFilteredArtworks(data);
        } catch (err) {
            console.error("Error fetching artworks:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArtworks();
    }, []);


    useEffect(() => {
        const timer = setTimeout(() => {
            fetchArtworks(searchText);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchText]);


    useEffect(() => {
        if (selectedCategory === "All") {
            setFilteredArtworks(artworks);
        } else {
            const filtered = artworks.filter(
                (art) => art.category?.toLowerCase() === selectedCategory.toLowerCase()
            );
            setFilteredArtworks(filtered);
        }
    }, [selectedCategory, artworks]);

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <h2 className="text-center my-5 text-2xl md:text-4xl font-bold text-[#8BBA45]">
                Explore All Artworks
            </h2>

            {/* Search & Filter Section */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-10 max-w-2xl mx-auto">
                <input
                    type="text"
                    placeholder="Search artworks by title..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="flex-1 p-3 border border-[#8BBA45] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8BBA45]"
                />

                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="p-3 border border-[#8BBA45] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#8BBA45]"
                >
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            </div>

            {/* Artworks Display */}
            {loading ? (
                <p className="text-center text-gray-500">Loading artworks...</p>
            ) : filteredArtworks.length === 0 ? (
                <p className="text-center text-gray-500">No artworks found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {filteredArtworks.map((art) => (
                        <div
                            key={art._id}
                            className="bg-white rounded-2xl shadow-md border border-[#8BBA45] overflow-hidden hover:shadow-lg transition-shadow duration-200"
                        >
                            <img
                                src={art.imageUrl}
                                alt={art.title}
                                className="w-full h-60 object-cover"
                            />
                            <div className="p-4 space-y-2">
                                <h3 className="text-xl font-semibold text-[#8BBA45]">
                                    {art.title}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    <strong>Artist:</strong> {art.userName || "Unknown"}
                                </p>
                                <p className="text-sm text-gray-600">
                                    <strong>Category:</strong> {art.category || "N/A"}
                                </p>
                                <p className="text-sm text-gray-600">
                                    <strong>Likes:</strong> {art.likes || 0}
                                </p>

                                <Link
                                    to={`/artworks/${art._id}`}
                                    className="mt-3 w-full bg-[#8BBA45] text-white py-2 rounded-lg font-medium hover:bg-[#7aa73c] text-center block"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ExploreArtWorks;
