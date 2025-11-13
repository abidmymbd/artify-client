import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const Footer = () => {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        document.querySelector('html').setAttribute('data-theme', theme);
    }, [theme]);

    const handleToggle = (e) => {
        setTheme(e.target.checked ? 'dark' : 'light');
    };

    return (
        <div className="bg-base-200 text-base-content p-3 py-5 transition-colors duration-300">
            <footer className="footer sm:footer-horizontal flex flex-col md:flex-row justify-between items-center">
                <aside className="grid-flow-row items-center">
                    <Link to="/" className="text-3xl font-bold text-[#8BBA45]">
                        ARTIFY
                    </Link>
                    <div className="flex flex-col justify-center text-sm mt-2 space-y-1">
                        <span className="text-base-content">
                            Email: <a className="text-base-content/80">hello@artify.example</a>
                        </span>
                        <span className="text-base-content">
                            Phone: <a className="text-base-content/80">+88 02 9123 4567</a>
                        </span>
                        <span className="text-base-content">
                            Address: <a className="text-base-content/80">128 Canvas Lane, Dhaka 1212, Bangladesh</a>
                        </span>
                    </div>
                </aside>

                <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end text-[#8BBA45]">
                    <a>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                            <path d="M4.5 3.5L19.5 20.5M19.5 3.5L4.5 20.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                        </svg>
                    </a>
                    <a>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                        </svg>
                    </a>
                    <a>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                        </svg>
                    </a>
                </nav>
            </footer>

            <div className="flex justify-between items-center mt-3 text-center">
                <div></div>
                <div>
                    © 2025 <span className="font-semibold text-[#8BBA45]">Artify</span>
                </div>
                <div>
                    <label className="flex cursor-pointer gap-2 items-center">
                        <input
                            type="checkbox"
                            onChange={handleToggle}
                            checked={theme === 'dark'}
                            className="toggle toggle-success"
                        />
                        <span className="text-sm">{theme === 'dark' ? 'Dark' : 'Light'}</span>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Footer;
