import React from "react";
import { Link } from "react-router-dom";



const Footer = () => {
  return (
    <footer className="bg-white py-10">
      <div className="max-w-7xl mx-auto px-4 flex justify-between">
        <div className="mb-6">
          <h3 className="font-bold text-2xl">Shop</h3>
          <ul className="mt-2 text-lg">
            <Link>
              <li>Home</li>
            </Link>
            <Link>
              <li>About</li>
            </Link>
            <Link>
              <li>Shop</li>
            </Link>
            <Link>
              <li>Contact</li>
            </Link>
          </ul>
        </div>
          <div className="mb-6">
          <h3 className="font-bold text-2xl">Policy</h3>
          <ul className="mt-2 text-lg">
              <li>terms & conditions</li>
              <li>privacy policy</li>
              <li>refund policy</li>
              <li>Shipping policyy</li>
              <li>accessibility statement</li>
          </ul>
        </div>
         <div className="mb-6">
          <h3 className="font-bold text-2xl">Contact</h3>
          <p className="mt-2 text-lg">ShopBuzzra, Nayabazar, Kathmandu</p>
            <p className="text-lg">info@shopBuzzra.com</p>
            <p className="text-lg">97654545486</p>
        </div>
         <div className="mb-6">
          <h3 className="font-bold text-2xl">Social</h3>
          <ul className="mt-2 text-lg">
              <li>instagram</li>
              <li>privacy policy</li>
              <li>Facebook</li>
              <li>X</li>
              <li>Tik Tok</li>
          </ul>
        </div>

        <div>
            <h3 className="text-xl font-bold">STAY IN THE LOOP</h3>
            <p className="mt-2 text-lg">Subscribe to receive updates and <br /> special offers</p>
            <form className="mt-4 flex">
                <input type="email" placeholder="Your email address" className="w-full p-2 rounded focus:outline-none"/>
                <button className="bg-blue-600 px-4 text-white rounded-r-md">Subscribe</button>

            </form>

        </div>
      </div>

      <div className="flex justify-between items-center px-12">
        <h1 className="text-4xl font-bold ">ShopBuzzra</h1>
       <p>&copy; {new Date().getFullYear()} <span className='text-blue-600'>ShopBuzzra</span>. All rights reserved</p>

      </div>
    </footer>
  );
};

export default Footer;
