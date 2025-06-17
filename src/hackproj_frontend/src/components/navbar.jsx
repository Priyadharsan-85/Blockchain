import React, { useState } from "react";
import './navbar.css'; // Importing the CSS file for navbar styles
import { FiMenu, FiX } from "react-icons/fi";
import { BiWallet } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";

const Navbar = ({login }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [walletBalance, setWalletBalance] = useState("$1,234");

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { id: 1, name: "About Us", link: "#" },
    { id: 2, name: "Wallet", link: "#", icon: BiWallet, badge: walletBalance },
  ];

  return (
    <nav className="navbar"> 
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <h1 className="logo"> 
              Splitsy
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="navbar-content hidden md:flex items-center space-x-8"> 
            {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.link}
                  className="nav-item" 

                aria-label={item.name}
              >
                {item.icon && <item.icon className="text-xl" />}
                <span >{item.name}</span>
                {item.badge && (
                  <span className="bg-teal-500 text-white text-xs px-2 py-1 rounded-full">
                    {item.badge}
                  </span>
                )}
              </a>
            ))}

            {!isLoggedIn ? (
              <div className="flex items-center space-x-4">
                {/* <button 
                  // className="button"
                  className="non"
                  // className="text-gray-300 hover:text-white transition-colors duration-300"
                  onClick={() => window.location.href = '/login'}
                >
                  Sign In
                </button> */}
                <button className="button" onClick={login}> 
                  <b>Login</b>
                </button>
              </div>
            ) : (
              <div className="relative">
                <button
                  className="flex items-center space-x-2 text-gray-300 hover:text-white
                   transition-colors duration-300"
                  aria-label="User profile"
                >
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="User"
                    className="h-8 w-8 rounded-full"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";
                    }}
                  />
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="mobile-menu md:hidden"> 
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="mobile-menu-content"> 
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.link}
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base
                 font-medium flex items-center space-x-2"
              >
                {item.icon && <item.icon className="text-xl" />}
                <span>{item.name}</span>
                {item.badge && (
                  <span className="bg-teal-500 text-white text-xs px-2 py-1 rounded-full">
                    {item.badge}
                  </span>
                )}
              </a>
            ))}
            {!isLoggedIn ? (
              <div className="space-y-2">
                <button 
                  className="w-full text-left text-gray-300 hover:text-white px-3 py-2"
                  onClick={() => window.location.href = '/login'}
                >
                  Sign In
                </button>
                <button className="w-full bg-teal-500 text-white px-3 py-2 rounded-lg
                 hover:bg-teal-600">
                  Sign Up
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 px-3 py-2">
                <FaUserCircle className="h-8 w-8 text-gray-300" />
                <span className="text-gray-300">Profile</span>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
