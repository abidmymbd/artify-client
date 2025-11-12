import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-hot-toast";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiLike } from "react-icons/bi";

const SingleArtWork = () => {
    const { id } = useParams();
    const [artwork, setArtwork] = useState(null);
    const [liked, setLiked] = useState(false);
    const [favorite, setFavorite] = useState(false);
    const [totalArtworks, setTotalArtworks] = useState(0);

    // Fetch artwork and artist info
    useEffect(() => {
        fetch(`http://localhost:3000/artworks/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setArtwork(data);

                // Fetch total artworks by artist
                if (data.userEmail) {
                    fetch(`http://localhost:3000/artist/${data.userEmail}/artworks/count`)
                        .then((res) => res.json())
                        .then((countData) => setTotalArtworks(countData.totalArtworks))
                        .catch(() => toast.error("Failed to load artist info"));
                }
            })
            .catch(() => toast.error("Failed to load artwork"));
    }, [id]);

    const handleLike = async () => {
        if (liked) return;
        try {
            const res = await fetch(`http://localhost:3000/artworks/${id}/like`, {
                method: "PATCH",
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to like");

            setArtwork((prev) => ({ ...prev, likes: data.likes }));
            setLiked(true);
        } catch (err) {
            toast.error(err.message);
        }
    };

    if (!artwork) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6 bg-white rounded-2xl shadow-lg border border-[#8BBA45]">
            <h1 className="text-4xl font-bold text-[#8BBA45] mb-4">{artwork.title}</h1>

            <img
                src={artwork.imageUrl}
                alt={artwork.title}
                className="rounded-xl w-full h-[450px] object-cover shadow-lg mb-4"
            />

            {/* Artist Info */}
            <div className="space-y-2 text-gray-700">
                <p>
                    <span className="font-bold">Artist: </span> {artwork.userName || "Anonymous"}
                </p>
                <p>
                    <span className="font-bold">Email: </span> {artwork.userEmail || "N/A"}
                </p>
                <p>
                    <span className="font-bold">Total Artworks: </span> {totalArtworks}
                </p>
                <p>
                    <span className="font-bold">Category: </span> {artwork.category}
                </p>
                <p>
                    <span className="font-bold">Description: </span> {artwork.description}
                </p>
            </div>

            {/* Like & Favorites */}
            <div className="flex justify-between items-center mt-6">
                {/* Left - Like */}
                <button
                    onClick={handleLike}
                    disabled={liked}
                    className="flex items-center gap-2 bg-[#8BBA45] text-white px-4 py-2 rounded-lg hover:bg-[#7aa73c] transition"
                >
                    <BiLike className="text-2xl" />
                    Like: {artwork.likes || 0}
                </button>

                {/* Right - Favorite */}
                <button
                    onClick={() => setFavorite(!favorite)}
                    className="flex items-center gap-2 text-2xl transition"
                >
                    {favorite ? <AiFillHeart className="text-red-500" /> : <AiOutlineHeart className="text-gray-400" />}
                    Add to Favorites
                </button>
            </div>
        </div>
    );
};

export default SingleArtWork;
