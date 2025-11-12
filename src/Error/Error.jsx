import React from 'react';
import { Link } from 'react-router';

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F3F4F6] text-center px-4">
      <h1 className="text-9xl font-extrabold text-[#8BBA45] mb-4">404</h1>
      <p className="text-2xl font-semibold mb-6">Oops! Page Not Found</p>
      <p className="mb-6 text-gray-600">
        The page you are looking for might be removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link 
        to="/" 
        className="btn-auth mx-3 px-9 py-4 rounded text-xl font-semibold"
      >
        Go Back Home
      </Link>
    </div>
  )
}

export default Error;
