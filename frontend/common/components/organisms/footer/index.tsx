'use client'
import { X } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../../atoms";
import { LampContainer } from "../../atoms/lamp";
import {
  LinkedInIcon,
  TwitterIcon,
  YoutubeIcon,
} from "../../icons";

export const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <footer className="bg-black relative">
        <LampContainer className="hidden md:block">
          <div></div>
        </LampContainer>
        <div className="md:absolute bottom-0 left-0 w-full">
          <motion.div
            initial={{
              opacity: 0.5,
            }}
            whileInView={{
              opacity: 1,
            }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="container mx-auto flex flex-col md:flex-row w-full justify-between mb-0 md:mb-4 items-center md:items-end px-4 gap-4 py-4 md:py-0 md:gap-2 md:px-0 pb-4"
          >
            <div className="flex flex-col gap-4">
              <div className="flex gap-4 justify-center md:justify-start">
                <a href="#" className="group buttonWithGradient">
                  <LinkedInIcon className="group-hover:text-white text-gradient"  />
                </a>
                <a href="#" className="group buttonWithGradient">
                  <TwitterIcon width={32} height={32} className="text-white" />
                </a>
                <a href="#" className="group buttonWithGradient">
                  <YoutubeIcon width={32} height={32} className="text-white" />
                </a>
              </div>
              <div className="flex gap-2">
                <a href="#" className="mr-4 text-xl text-white hover:text-primary">
                  Blog
                </a>
                <a href="#" className="mr-4 text-xl text-white hover:text-primary">
                  FAQ
                </a>
                <a href="#" className="text-white text-xl hover:text-primary">
                  Privacy Policy
                </a>
              </div>
            </div>
            <Button onClick={() => setIsModalOpen(true)} size="md" variant="secondary" className="ring-1 ring-white ring-inset hover:ring-0 from-indigo-500 to-purple-500 hover:bg-gradient-to-r">
              Contact Us
            </Button>
          </motion.div>
        </div>
      </footer>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-700 p-8 rounded-lg w-full max-w-md relative">
            <h2 className="text-2xl font-bold mb-4 text-white">Contact Us</h2>
            <form>
              <input
                type="text"
                placeholder="Name"
                required
                className="w-full mb-4 p-2 bg-gray-600 rounded text-white"
              />
              <input
                type="email"
                placeholder="Email"
                required
                className="w-full mb-4 p-2 bg-gray-600 rounded text-white"
              />
              <textarea
                placeholder="Message"
                required
                className="w-full mb-4 p-2 bg-gray-600 rounded h-32 text-white"
              ></textarea>
              <Button size="md" type="submit" variant="primary" className="w-full bg-gradient-to-r from-indigo-500 to-purple-500">
                Send
              </Button>
            </form>
            <p className="mt-4 text-gray-300">
              You can contact us at support@web3it.ai
            </p>
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
