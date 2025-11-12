import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaHeart, FaCrown } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";
import { AiFillLike } from "react-icons/ai";

const CommunityHighlights = () => {
    const [highlights, setHighlights] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3000/artworks")
            .then((res) => res.json())
            .then((data) => {
                const sorted = data.sort((a, b) => (b.likes || 0) - (a.likes || 0)).slice(0, 3);
                setHighlights(sorted);
            })
            .catch(() => toast.error("Failed to load highlights"))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="w-12 h-12 border-4 border-[#8BBA45] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <section className="pb-16 bg-gradient-to-b from-white to-[#f8faf5]">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-bold text-[#8BBA45] mb-3">
                    Community Highlights
                </h2>
                <p className="text-gray-600 text-lg mx-auto max-w-2xl">
                    <Typewriter
                        words={[
                            "Celebrating the most loved artworks by our amazing community of creators.",
                            "Discover stunning art shared by passionate artists worldwide.",
                            "Join the movement. Share your creativity. Inspire others!"
                        ]}
                        loop={0}
                        cursor
                        cursorStyle="|"
                        typeSpeed={50}
                        deleteSpeed={30}
                        delaySpeed={2500}
                    />
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {highlights.map((art, index) => (
                    <motion.div
                        key={art._id}
                        whileHover={{ scale: 1.05 }}
                        className="relative bg-white rounded-2xl shadow-md border border-[#8BBA45]/40 overflow-hidden group"
                    >
                        <img
                            src={art.imageUrl}
                            alt={art.title}
                            className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />

                        <div className="absolute top-3 left-3 bg-[#8BBA45] text-white text-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                            <FaCrown className="text-yellow-300" /> Top {index + 1}
                        </div>

                        <div className="p-5 space-y-2">
                            <h3 className="text-xl font-bold text-[#8BBA45] truncate">{art.title}</h3>
                            <p className="text-gray-600 text-sm">By {art.userName || "Unknown Artist"}</p>

                            <div className="flex justify-between items-center mt-4">
                                <span className="flex items-center text-[#8BBA45] font-semibold">
                                    <AiFillLike className="mr-1 text-[#376fe0] text-2xl" /> {art.likes || 0}
                                </span>

                                <Link
                                    to={`/artworks/${art._id}`}
                                    className="bg-[#8BBA45] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#7aa73c] transition"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default CommunityHighlights;
