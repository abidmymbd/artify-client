import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { auth } from '../firebase.config';

const Navbar = () => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        });
        return () => unsubscribe()
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log('User logged out');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-20">
                <span className="loading loading-ring loading-md"></span>
            </div>
        );
    }

    return (
        <div className="navbar my-5">

            <div className="navbar-start">
                <div className="dropdown">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>

                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li><Link to="/" className="btn-nav">Home</Link></li>
                        <li><Link to="/exploreartworks" className="btn-nav">Explore Artworks</Link></li>

                        {user && (
                            <>
                                <li><Link to="/addartwork" className="btn-nav">Add Artwork</Link></li>
                                <li><Link to="/my-gallery" className="btn-nav">My Gallery</Link></li>
                                <li><Link to="/my-favorites" className="btn-nav">My Favorites</Link></li>
                            </>
                        )}
                    </ul>
                </div>

                <Link to="/" className="text-3xl font-bold text-[#8BBA45]">
                    ARTIFY
                </Link>
            </div>


            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><Link to="/" className="btn-nav">Home</Link></li>
                    <li><Link to="/exploreartworks" className="btn-nav">Explore Artworks</Link></li>

                    {user && (
                        <>
                            <li><Link to="/addartwork" className="btn-nav">Add Artwork</Link></li>
                            <li><Link to="/my-gallery" className="btn-nav">My Gallery</Link></li>
                            <li><Link to="/my-favorites" className="btn-nav">My Favorites</Link></li>
                        </>
                    )}
                </ul>
            </div>



            <div className="navbar-end flex items-center justify-end">
                {user ? (
                    <button
                        onClick={handleLogout}
                        className="btn-auth px-3 py-2 rounded font-semibold">
                        Logout
                    </button>
                ) : (
                    <>
                        <Link to="/login" className="btn-auth mx-3 px-3 py-2 rounded font-semibold">Login</Link>
                        <Link to="/signup" className="btn-auth px-3 py-2 rounded font-semibold">Sign Up</Link>
                    </>
                )}
            </div>

        </div>
    );
};

export default Navbar;
