import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useLocation } from "react-router-dom";
import pathConstants from "../routes/pathConstants";
import profile from '../images/profile.jpg';
import { FaRegBell } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";
import useLogout from "../pages/Logout";



export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const Logout = useLogout();
  let isLoggedIn = sessionStorage.getItem('isLoggedIn');
  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);  // Toggle menu open state
  };

  useEffect(() => {
    setIsMenuOpen(false);  // Close menu on route change
  }, [location]);

  return (
    <nav className="flex flex-col items-center border-b-2 p-2 md:flex-row">
      <div className="flex w-full md:w-auto text-xl font-bold">
        <Link to={pathConstants.HOME}>Book Share</Link>
        <button className="md:hidden ml-auto" onClick={handleMenuClick}>
          <GiHamburgerMenu size={30} />
        </button>
      </div>
      <ul
        className={`flex flex-col text-center items-center transition-all duration-300 ease-in-out transform md:medium_screen ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5 hidden'
          } md:flex md:opacity-100 md:translate-y-0 md:pointer-events-auto`}
      >
        {isLoggedIn === 'true' ?
          (
            <>
              <li><Link to={pathConstants.BROWSE} className="hover:underline">Browse</Link></li>
              <li><Link to={pathConstants.MyBooks} className="hover:underline">My Books</Link></li>
              <li className="mb-1 mt-1 md:mb-0 rounded-xl bg-orange-500 px-4 p-2 hover:underline"><Link to={pathConstants.POST} className="text-white">Add a Book</Link></li>
              <li className="mb-1 mt-1 md:mb-0 rounded-xl bg-gray-300 px-4 p-2 hover:underline hidden md:block"><Link to={pathConstants.MESSAGES}><FaRegBell size={25} /></Link></li>
              <li className="mb-1 mt-1 md:mb-0 rounded-xl bg-gray-300 px-4 p-2 hover:underline hidden md:block"><button onClick={Logout}><CiLogout size={25} /></button></li>
              <li><Link to={pathConstants.PROFILE} className="hover:underline">
                <img src={profile} alt="profile" className="w-12 h-12 rounded-full cover hidden md:block"></img>
              </Link></li>
              <li className="mb-1 mt-1 md:hidden"><Link to={pathConstants.MESSAGES} className="hover:underline">Messages</Link></li>
              <li className="mb-1 mt-1 md:hidden"><button onClick={Logout} className="hover:underline">Logout</button></li>
              <li className="mb-1 mt-1 md:hidden"><Link to={pathConstants.PROFILE} className="hover:underline">Profile</Link></li>
            </>
          )
          : (
            <>
              <li className="mb-1 mt-1"><Link to={pathConstants.BROWSE} className="hover:underline">Browse</Link></li>
              <li className="mb-1 mt-1"><a href="home" className="hover:underline">Help</a></li>
              <li className="mb-1 mt-1 rounded-xl bg-orange-500 px-4 p-2 hover:underline"><Link to={pathConstants.LOGIN} className="text-white">Log In</Link></li>
              <li className="mb-1 mt-1 rounded-xl bg-gray-300 px-4 p-2 md:mr-5 hover:underline"><Link to={pathConstants.SIGNUP}>Sign Up</Link></li>
            </>
          )
        }
      </ul>
    </nav>
  );
}
