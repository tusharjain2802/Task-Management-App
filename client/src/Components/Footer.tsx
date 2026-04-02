// src/components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="font-comfy border-t border-[#535353] bg-gray-600 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="mb-2">© 2024 Task Management App. All rights reserved.</p>
        <div className="flex justify-center space-x-4">
          <a href="/privacy" className="hover:text-color2">Privacy Policy</a>
          <a href="/terms" className="hover:text-color2">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
