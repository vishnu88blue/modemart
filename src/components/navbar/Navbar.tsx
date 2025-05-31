'use client';
import React, { useState } from 'react';
import { assets } from '@/assets/assets';
import Link from 'next/link';
import { useAppContext } from '@/context/AppContext';
import Image from 'next/image';
import { SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { ShoppingCart } from 'lucide-react';

const Navbar = () => {
  const { isSeller, router, user } = useAppContext();
  const [menuOpen, setMenuOpen] = useState(false);

  const getCartCount = () => {
    //TODO: if user is not logged in should show a popop sawyaing, login to access cart
    return 2; // Replace with actual logic to get cart count
  };

  console.log('User:', user);
  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700">
      <Image
        className="cursor-pointer w-28 md:w-32"
        onClick={() => router.push('/')}
        src={assets.logo}
        alt="logo"
      />
      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        <Link href="/" className="hover:text-gray-900 transition">
          Home
        </Link>
        <Link href="/all-products" className="hover:text-gray-900 transition">
          Shop
        </Link>
        <Link href="/" className="hover:text-gray-900 transition">
          About Us
        </Link>
        <Link href="/" className="hover:text-gray-900 transition">
          Contact
        </Link>

        {isSeller && (
          <button
            onClick={() => router.push('/seller')}
            className="text-xs border px-4 py-1.5 rounded-full max-md:hidden"
          >
            Seller Dashboard
          </button>
        )}
      </div>

      <ul className="hidden md:flex items-center gap-4 ">
        <Image className="w-4 h-4" src={assets.search_icon} alt="search icon" />
        <button className="relative group ml-auto">
          <ShoppingCart className="w-4 h-4 text-gray-700 hover:text-black transition" />

          {/* Cart count badge */}
          {getCartCount() > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-3 h-3 flex items-center justify-center rounded-full">
              {getCartCount()}
            </span>
          )}
        </button>
        {!user ? (
          <>
            <SignInButton />
          </>
        ) : (
          <UserButton />
          // <button
          //   className="flex items-center gap-2 hover:text-gray-900 transition"
          //   onClick={() => {
          //     console.log('Open Sign In');
          //   }}
          // >
          //   <Image src={assets.user_icon} alt="user icon" />
          //   Account
          // </button>
        )}
      </ul>

      <div className="flex items-center md:hidden gap-3">
        <Image className="w-4 h-4" src={assets.search_icon} alt="search icon" />
        {!user ? (
          <>
            <SignInButton />
          </>
        ) : (
          <UserButton />
        )}
      </div>

      {/* Mobile Dropdown Nav */}
      <div className="relative md:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 border rounded"
        >
          ☰
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 bg-white shadow-lg rounded p-4 space-y-2 z-50 min-w-[160px]">
            <Link
              href="/"
              className="block hover:text-gray-900"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/all-products"
              className="block hover:text-gray-900"
              onClick={() => setMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              href="/"
              className="block hover:text-gray-900"
              onClick={() => setMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/"
              className="block hover:text-gray-900"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>

            {isSeller && (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  router.push('/seller');
                }}
                className="block w-full text-left text-xs border px-4 py-1.5 rounded-full"
              >
                Seller Dashboard
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
