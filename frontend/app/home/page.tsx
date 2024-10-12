'use client'
import { useState } from 'react';
import { X } from 'lucide-react';
import { Hero } from './Hero';
import { TrendingProjects } from './TrendingProjects';
import { DevelopmentProcess } from './DevelopmentProcess';

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <footer className="bg-dark-secondary py-8 px-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <a href="#" className="mr-4 text-white hover:text-primary">Blog</a>
            <a href="#" className="mr-4 text-white hover:text-primary">FAQ</a>
            <a href="#" className="text-white hover:text-primary">Privacy Policy</a>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Contact Us
          </button>
        </div>
      </footer>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-8 rounded-lg w-full max-w-md relative">
            <h2 className="text-2xl font-bold mb-4 text-white">Contact Us</h2>
            <form>
              <input type="text" placeholder="Name" required className="w-full mb-4 p-2 bg-gray-700 rounded text-white" />
              <input type="email" placeholder="Email" required className="w-full mb-4 p-2 bg-gray-700 rounded text-white" />
              <textarea placeholder="Message" required className="w-full mb-4 p-2 bg-gray-700 rounded h-32 text-white"></textarea>
              <button type="submit" className="bg-primary hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full transition duration-300">Send</button>
            </form>
            <p className="mt-4 text-gray-300">Customer Support: support@web3it.ai</p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
            >
              <X />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default function Home () {
  return (
    <div className="min-h-screen overflow-hidden">
      <Hero />
      <TrendingProjects />
      <DevelopmentProcess />
      <Footer />
    </div>
  );
}
