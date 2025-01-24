import { set } from "mongoose";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { IoMoonSharp } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

export default function Header() {

    // dark-mode on/off
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        // check local storage for dark mode preference on initial load
        const isDarkMode = localStorage.getItem('dark-mode') === 'true';
        setDarkMode(isDarkMode);
    }, []);

    useEffect(() => {
        // apply dark mode styles when dark-mode state changes
        if (darkMode) {
            document.body.classList.add('dark');
            localStorage.setItem('dark-mode', 'true');
        } else {
            document.body.classList.remove('dark');
            localStorage.setItem('dark-mode', 'false');
        }
    }, [darkMode]);

    // toggle dark-mode function
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    }
    
    // navlist active
    const router = useRouter();
    const [clicked, setClicked] = useState(false);
    const [activeLink, setActiveLink] = useState('/');

    const handleLinkClick = (link) => {
        setActiveLink(link);
        setClicked(false);
    }

    useEffect(() => {
        // update active link state when the page is reloaded
        setActiveLink(router.pathname);
    }, [router.pathname]);

    // mobile navbar
    const [mobile, setMobile] = useState(false);

    // open
    const handleMobileOpen = () => {
        setMobile(!mobile);
    }

    // close
    const handleMobileClose = () => {
        setMobile(false);
    }

    return <>
        <header>
            <nav className="container flex flex-sb">
                <div className="logo flex gap-2">
                    <Link href='/'><img src={`/img/${darkMode ? 'radins-logo-dark' : 'radins-logo-light'}.png`} alt="logo" /></Link>
                    {/* <h2>RaDins</h2> */}
                </div>
                <div className="navlist flex gap-2">
                    <ul className="flex gap-2">
                        <li>
                            <Link href='/' onClick={() => handleLinkClick('/')} className={activeLink === '/' ? 'active' : ''}>Home</Link>
                        </li>
                        <li>
                            <Link href='/blogs' onClick={() => handleLinkClick('/blogs')} className={activeLink === '/blogs' ? 'active' : ''}>Blogs</Link>
                        </li>
                        <li>
                            <Link href='/gallery' onClick={() => handleLinkClick('/gallery')} className={activeLink === '/gallery' ? 'active' : ''}>Gallery</Link>
                        </li>
                        <li>
                            <Link href='/services' onClick={() => handleLinkClick('/services')} className={activeLink === '/services' ? 'active' : ''}>Services</Link>
                        </li>
                        <li>
                            <Link href='/projects' onClick={() => handleLinkClick('/projects')} className={activeLink === '/projects' ? 'active' : ''}>Projects</Link>
                        </li>
                        <li>
                            <Link href='/contact' onClick={() => handleLinkClick('/contact')} className={activeLink === '/contact' ? 'active' : ''}>Contact</Link>
                        </li>
                    </ul>
                    <div className="darkmodetoggle" onClick={toggleDarkMode}>
                        {darkMode ? <IoMoonSharp /> : <LuSun />}
                    </div>
                    <button>
                        <Link href='/contact'>Hire me!</Link>
                    </button>
                    <div className="mobiletogglesvg" onClick={handleMobileOpen}>
                        <HiMiniBars3BottomRight />
                    </div>
                </div>
                <div className={mobile ? "mobilenavlist active" : "mobilenavlist"}>
                    <span onClick={handleMobileClose} className={mobile ? "active" : ""}></span>
                    <div className="mobilelogo">
                        <img src="/img/white.png" alt="logo" />
                        <h2>RaDins</h2>
                    </div>
                    <ul className="flex gap-1 flex-col flex-left mt-3" onClick={handleMobileClose}>
                        <li>
                            <Link href='/' onClick={() => handleLinkClick('/')} className={activeLink === '/' ? 'active' : ''}>Home</Link>
                        </li>
                        <li>
                            <Link href='/blogs' onClick={() => handleLinkClick('/blogs')} className={activeLink === '/blogs' ? 'active' : ''}>Blogs</Link>
                        </li>
                        <li>
                            <Link href='/gallery' onClick={() => handleLinkClick('/gallery')} className={activeLink === '/gallery' ? 'active' : ''}>Gallery</Link>
                        </li>
                        <li>
                            <Link href='/services' onClick={() => handleLinkClick('/services')} className={activeLink === '/services' ? 'active' : ''}>Services</Link>
                        </li>
                        <li>
                            <Link href='/projects' onClick={() => handleLinkClick('/projects')} className={activeLink === '/projects' ? 'active' : ''}>Projects</Link>
                        </li>
                        <li>
                            <Link href='/contact' onClick={() => handleLinkClick('/contact')} className={activeLink === '/contact' ? 'active' : ''}>Contact</Link>
                        </li>
                    </ul>
                    <p>Copyright &copy; 2024 | radinsterritory.com</p>
                </div>
            </nav>
        </header>

    </>
}