import React from 'react';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Navbar/Footer';

const HomeLayout = () => {
    return (
        <div>
            <div>
                <header className='w-11/12 mx-auto'>
                    <Navbar></Navbar>
                </header>
                <main className='w-11/12 mx-auto'>
                    <Outlet></Outlet>
                </main>
                <footer className='w-11/12 mx-auto'>
                    <Footer></Footer>
                </footer>
            </div>
        </div>
    );
}

export default HomeLayout;
