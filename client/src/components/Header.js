import React, { useState } from 'react'; import { Link } from 'react-router-dom'; import { Menu, X, User } from 'lucide-react';

const Header = () => { const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

const navLinks = [ { label: 'Accommodations', to: '/home' }, { label: 'Experiences', to: '/experiences' }, { label: 'Contact', to: '/contact' }, ];

return ( <header className="bg-white shadow-sm py-4 px-6 md:px-10 lg:px-16 fixed top-0 left-0 right-0 z-20"> <div className="flex justify-between items-center">

{/* Mobile menu & Logo */}
    <div className="flex items-center space-x-4">
      <button
        className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
        onClick={() => setMobileMenuOpen(prev => !prev)}
      >
        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
      <Link to="/" className="text-2xl font-light text-gray-800">
        Openstays
      </Link>
    </div>

    {/* Desktop navigation + profile */}
    <div className="hidden md:flex items-center space-x-6">
      {navLinks.map(link => (
        <Link
          key={link.to}
          to={link.to}
          className="text-gray-600 hover:text-gray-900"
        >
          {link.label}
        </Link>
      ))}
      <Link
        to="/admin"
        className="p-2 rounded-full text-gray-600 hover:bg-gray-100"
      >
        <User className="w-6 h-6" />
      </Link>
    </div>

    {/* Mobile profile icon */}
    <Link
      to="/admin"
      className="md:hidden p-2 rounded-full text-gray-600 hover:bg-gray-100"
    >
      <User className="w-6 h-6" />
    </Link>
  </div>

  {/* Mobile dropdown menu */}
  {mobileMenuOpen && (
    <nav className="md:hidden bg-white shadow-md">
      <div className="flex flex-col py-4 px-6 space-y-2">
        {navLinks.map(link => (
          <Link
            key={link.to}
            to={link.to}
            onClick={() => setMobileMenuOpen(false)}
            className="text-gray-700 hover:text-gray-900"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  )}
</header>

); };

export default Header;


