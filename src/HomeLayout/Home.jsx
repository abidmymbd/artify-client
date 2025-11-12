import React from 'react';
import Slider from './Slider';
import TopArtists from './TopArtists';
import FeaturedArtworks from './FeaturedArtworks';
import CommunityHighlights from './CommunityHighlights';

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <FeaturedArtworks></FeaturedArtworks>
            <TopArtists></TopArtists>
            <CommunityHighlights></CommunityHighlights>
        </div>
    );
};

export default Home;
