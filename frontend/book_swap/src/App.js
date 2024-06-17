import { GiHamburgerMenu } from "react-icons/gi";
import { CiClock2 } from "react-icons/ci";
import { CiMoneyBill } from "react-icons/ci";
import { GoPeople } from "react-icons/go";
import { useState } from "react";
import { useEffect } from "react";
import desktopImage from './images/desktop.png'; // Import the image
import WebFont from 'webfontloader';

export default function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Noto Sans', 'Sans-Serif']
      }
    });
   }, []);
 
  const [isClassRemoved, setIsClassRemoved] = useState(false);

  const handleMenuClick = () => {
    setIsClassRemoved(!isClassRemoved);  // Toggle class removal
  };

  return (
    <div className="font-loader">
      <nav className="flex flex-col items-center border-b-2 p-2 md:flex-row">
        <div className="flex w-full md:w-auto text-lg font-bold">
          Book swap
          <button className="md:hidden ml-auto" onClick={handleMenuClick}>
              <GiHamburgerMenu  size={30}/>
          </button>
        </div>
          <ul className={`flex flex-col gap-2 text-center items-center ${isClassRemoved ? '' : 'hidden'} md:meduim_screen`}>
            <li><a href="home" className="hover:underline">Browse</a></li>
            <li><a href="home" className="hover:underline">Post a book</a></li>
            <li><a href="home" className="hover:underline">Help</a></li>
            <li className="rounded-xl bg-orange-500 px-4 p-2 hover:underline"><a href="home" className="text-white">Log In</a></li>
            <li className="rounded-xl bg-gray-300 px-4 p-2 md:mr-5 hover:underline"><a href="home">Sign Up</a></li>
          </ul>
      </nav>
      <body>
      <div style={{ backgroundImage: `url(${desktopImage})` }} className="bg-cover my-9 mx-auto w-[95%] rounded-xl h-[50vh] md:h-[80vh] bg-center flex items-center justify-center flex-col text-center">
          <h1 className="text-4xl font-bold text-white">Welcome to book swap</h1>
          <p className="text-lg text-white">Trade used books with other local readers. Better than buying, better than borrowing</p>
          <div className="flex gap-3 flex-row">
            <button  className="rounded-xl bg-orange-500 px-4 p-2 hover:underline font-bold text-white" >Browse books</button>
            <button className="rounded-xl bg-gray-300 px-4 p-2 md:mr-5 hover:underline">Post a book</button>
          </div>
      </div>
      <h1 className="text-3xl font-[500] ml-10">Why swap books?</h1>
      <div className="flex m-10 flex-col md:flex-row gap-6">

        <div className="card flex flex-col border rounded-lg w-[90%] p-4 pr-16 text-start gap-2 mx-auto md:w-[30%]">
        <CiClock2 size={23}/>
        <h2 className="font-bold text-xl">No due date</h2>
        <p className="text-lg">Keep books as long as you like</p>
        </div>

        <div className="card flex flex-col border rounded-lg w-[90%] p-4 pr-16 text-start gap-2 mx-auto md:w-[30%]">
        <CiMoneyBill size={23}/>
        <h2 className="font-bold text-xl">Save money</h2>
        <p className="text-lg">Get great reads for free</p>
        </div>

        <div className="card flex flex-col border rounded-lg w-[90%] p-4 pr-16 text-start gap-2 mx-auto md:w-[30%]">
        <GoPeople size={23}/>
        <h2 className="font-bold text-xl">Connect with neighbours</h2>
        <p className="text-lg">Meet other book lovers in your area</p>
        </div>

      </div>
      </body>
    </div>
  )
}