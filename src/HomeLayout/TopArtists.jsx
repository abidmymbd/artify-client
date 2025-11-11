import React from 'react';

const TopArtists = () => {
    return (
        <div className='my-20'>
            <h1 className='text-center text-2xl md:text-4xl font-bold text-[#8BBA45]'>Top Artists of the Week</h1>
            <div className="flex md:flex-row flex-col items-center gap-6 my-5">
                {/* Card 1 */}
                <div className="card bg-base-100 p-8 w-96 shadow-sm">
                    <figure className="mb-5">
                        <img
                            src="https://media.istockphoto.com/id/2172873491/photo/university-student-and-man-in-portrait-outdoor-on-campus-with-book-for-education-learning-and.jpg?s=612x612&w=0&k=20&c=0jJ62Pxg9qWg2DKCl0pVQmN1j618h01SXJ7DGdlpsZM="
                            alt="Shoes"
                            className="rounded-xl"
                        />
                    </figure>
                    <div className="items-center">
                        <h2 className='font-bold'>John Smith</h2>
                        <p>Based in Tokyo, Japan</p>
                    </div>
                </div>
                {/* Card 2 */}
                <div className="card bg-base-100 p-8 w-96 shadow-sm">
                    <figure className="mb-5">
                        <img
                            src="https://s.hdnux.com/photos/01/41/41/64/25566517/3/ratio3x2_1920.jpg"
                            alt="Shoes"
                            className="rounded-xl"
                        />
                    </figure>
                    <div className="items-center">
                        <h2 className='font-bold'>Lara Chen</h2>
                        <p>50+ artworks sold this week</p>
                    </div>
                </div>
                {/* Card 3 */}
                <div className="card bg-base-100 p-8 w-96 shadow-sm">
                    <figure className="mb-5">
                        <img
                            src="https://media.istockphoto.com/id/2186383983/photo/portrait-creative-and-man-for-pride-in-office-of-about-us-startup-growth-and-career-ambition.jpg?s=612x612&w=0&k=20&c=8hcA2FjOb4YJV8IuBXZofo9aiQBZPbOwiGdVrcSYvY4="
                            alt="Shoes"
                            className="rounded-xl"
                        />
                    </figure>
                    <div className="items-center">
                        <h2 className='font-bold'>Mark Wilson</h2>
                        <p>Abstract Painter</p>
                    </div>
                </div>
            </div>


        </div>
    );
}

export default TopArtists;
