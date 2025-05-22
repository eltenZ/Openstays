import React from 'react'; import { Link } from 'react-router-dom';

const Footer = () => { return ( <footer className="bg-gray-50 border-t py-10 px-6 md:px-10 lg:px-16"> <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8"> {/* OpenStays info */} <div> <h3 className="text-lg font-medium mb-4">Openstays</h3> <p className="text-gray-600 text-sm mb-4"> Luxury accommodations across the Kenyan coast. Experience the beauty of Diani and beyond. </p> <Link
to="/terms"
className="text-gray-600 hover:text-gray-900 text-sm block"
> Terms and conditions of our service </Link> </div>

{/* Contact info */}
    <div>
      <h3 className="text-lg font-medium mb-4">Contact</h3>
      <p className="text-gray-600 text-sm">
        Diani Beach Road<br />Kwale County, Kenya<br />
        info@openstays.co.ke<br />
        +254 113919039<br />
        +254 737812530
      </p>
    </div>

    {/* Resources */}
    <div>
      <h3 className="text-lg font-medium mb-4">Resources</h3>
      <ul className="space-y-2 text-gray-600 text-sm">
        <li>
          <a href="/brochures/mombasa.pdf" download>
            The best of Mombasa
          </a>
        </li>
        <li>
          <a href="/brochures/diani.pdf" download>
            The highlights of Diani
          </a>
        </li>
        <li>
          <a href="/brochures/lamu.pdf" download>
            Discovering Lamu
          </a>
        </li>
        <li>
          <a href="/brochures/zanzibar.pdf" download>
            The best of Zanzibar
          </a>
        </li>
      </ul>
    </div>

    {/* Social links */}
    <div>
      <h3 className="text-lg font-medium mb-4">Follow Us</h3>
      <div className="flex space-x-4">
        <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
          Instagram
        </a>
        <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
          Facebook
        </a>
        <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
          Twitter
        </a>
      </div>
    </div>
  </div>

  <div className="mt-8 pt-8 border-t border-gray-200">
    <p className="text-center text-sm text-gray-500">
      © {new Date().getFullYear()} Openstays. All rights reserved.
    </p>
  </div>
</footer>

); };

export default Footer;


