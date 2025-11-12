import React from 'react';
import Slider from './Slider';
import TopArtists from './TopArtists';
import FeaturedArtworks from './FeaturedArtworks';

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <FeaturedArtworks></FeaturedArtworks>
            <TopArtists></TopArtists>
        </div>
    );
};

export default Home;
