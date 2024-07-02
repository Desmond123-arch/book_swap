import React from "react";
import { Link } from "react-router-dom";
import desktopImage from '../images/desktop.png';
import { CiClock2 } from "react-icons/ci";
import { CiMoneyBill } from "react-icons/ci";
import { GoPeople } from "react-icons/go";
import pathConstants from "../routes/pathConstants";

export default function Home(){
  return <div>
      <div style={{
      backgroundImage: `url(${desktopImage})`
    }} className="bg-cover my-9 mx-auto w-[95%] rounded-xl h-[50vh] md:h-[80vh] bg-center flex items-center justify-center flex-col text-center">
          <h1 className="text-4xl font-bold text-white">Welcome to book swap</h1>
          <p className="text-lg text-white">Trade used books with other local readers. Better than buying, better than borrowing</p>
          <div className="flex gap-3 flex-row">
            <Link to={pathConstants.BROWSE}><button className="rounded-xl bg-orange-500 px-4 p-2 hover:underline font-bold text-white">Browse books</button></Link>
            <Link to={pathConstants.POST}><button className="rounded-xl bg-gray-300 px-4 p-2 md:mr-5 hover:underline font-bold">Post a book</button></Link>
          </div>
      </div>
      <h1 className="text-3xl font-[500] ml-10">Why swap books?</h1>
      <div className="flex m-10 flex-col md:flex-row gap-6">

        <div className="card flex flex-col border rounded-lg w-[90%] p-4 pr-16 text-start gap-2 mx-auto md:w-[30%]">
        <CiClock2 size={23} />
        <h2 className="font-bold text-xl">No due date</h2>
        <p className="text-lg">Keep books as long as you like</p>
        </div>

        <div className="card flex flex-col border rounded-lg w-[90%] p-4 pr-16 text-start gap-2 mx-auto md:w-[30%]">
        <CiMoneyBill size={23} />
        <h2 className="font-bold text-xl">Save money</h2>
        <p className="text-lg">Get great reads for free</p>
        </div>

        <div className="card flex flex-col border rounded-lg w-[90%] p-4 pr-16 text-start gap-2 mx-auto md:w-[30%]">
        <GoPeople size={23} />
        <h2 className="font-bold text-xl">Connect with neighbours</h2>
        <p className=" text-lg">Meet other book lovers in your area</p>
        </div>
      </div>
      </div>;
}
  