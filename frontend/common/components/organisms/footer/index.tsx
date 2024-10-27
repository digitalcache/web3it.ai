'use client'
import {
  X,
} from "lucide-react";
import { useState } from "react";
import {
  Button,
  LinkStyled,
} from "../../atoms";
import {
  LinkedInIcon,
  TwitterIcon,
  YoutubeIcon,
} from "../../icons";

export const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <footer className="relative border-t border-gray-200/5">
        <div className="bottom-0 left-0 opacity-30 absolute w-full h-[300px] bg-gradient-to-b from-transparent to-purple-500 pointer-events-none -z-10"></div>
        <div className="">
          <div className="container mx-auto flex flex-col md:flex-row w-full justify-between items-center md:items-end px-4 gap-4 py-4 md:py-12 md:gap-2 md:px-0 pb-4">
            <div className="flex flex-col gap-4">
              <div className="flex gap-4 justify-center md:justify-start">
                <a href="https://www.linkedin.com/company/web3ai/" target="_blank" className="group buttonWithGradient">
                  <LinkedInIcon className="group-hover:text-white text-gradient"  />
                </a>
                <a href="https://x.com/justweb3it" target="_blank" className="group buttonWithGradient">
                  <TwitterIcon width={32} height={32} className="text-white" />
                </a>
                <a href="#" className="group buttonWithGradient">
                  <YoutubeIcon width={32} height={32} className="text-white" />
                </a>
              </div>
              <div className="flex gap-8">
                <LinkStyled href="#" className="!px-0">Team</LinkStyled>
                <LinkStyled href="#" className="!px-0">About Us</LinkStyled>
                <LinkStyled href="#" className="!px-0">Privacy Policy</LinkStyled>
              </div>
            </div>
            <Button onClick={() => setIsModalOpen(true)} size="md" variant="secondary" className="ring-1 gap-2 ring-white ring-inset hover:ring-0 from-indigo-500 to-purple-500 hover:bg-gradient-to-r font-semibold">
              Contact us
            </Button>
          </div>
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
              <Button size="md" type="submit" variant="primary" className="transition-all duration-150 hover:from-indigo-500/90 hover:to-purple-500/90 w-full bg-gradient-to-r from-indigo-500 to-purple-500 font-semibold">
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
