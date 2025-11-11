import React, { createContext, useState, useContext } from "react";

const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            {/* Full-page spinner */}
            {isLoading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                    <span className="loading loading-spinner loading-lg text-[#8BBA45]"></span>
                </div>
            )}
            {children}
        </LoadingContext.Provider>
    );
};

export default LoadingProvider;
