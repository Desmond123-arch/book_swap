import React from "react";
import { FaInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa6";

export function Footer() {
  return( <footer className='border-t-2 border-gray-200 p-9'>
    <ul className="flex items-center justify-center gap-4 flex-col md:flex-row mb-4">
      <li className='text-gray-400 hover:text-gray-700'><a href="home">About us</a></li>
      <li className='text-gray-400 hover:text-gray-700'><a href="home">Contact us</a></li>
      <li className='text-gray-400 hover:text-gray-700'><a href="home">Terms of Service</a></li>
      <li className='text-gray-400 hover:text-gray-700'><a href="home">Privacy Policy</a></li>
    </ul>
    <ul className="flex items-center justify-center gap-6 flex-row mt-5">
    <li className='text-gray-400 hover:text-gray-700'><a href="home"><FaInstagram size={30} /></a></li>
    <li className='text-gray-400 hover:text-gray-700'><a href="home"><FaFacebook size={30} /></a></li>
    <li className='text-gray-400 hover:text-gray-700'><a href="home"><FaTwitter size={30} /></a></li>
    </ul>
</footer>);
}
  