'use client'
import { TypewriterEffect } from "@/common/components/atoms";
import Lottie from 'react-lottie';
import { BackgroundBeamsWithCollision } from "@/common/components/molecules";
import * as animationData from '@/common/lottie/hero-animation.json'
import { CreateProject } from "./createProject";

export const Hero = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  const words = [
    {
      text: "Fund",
    },
    {
      text: "your",
    },
    {
      text: "Web3",
      className: "gradientText dark:gradientText",
    },
    {
      text: "ideas",
    },
    {
      text: "with",
    },
    {
      text: "ease.",
    },
  ];
  return (
    <header className="pt-24 px-4 max-w-[100vw] relative pb-12">
      <BackgroundBeamsWithCollision className="absolute top-0 left-0 pointer-events-none">
        <div className="w-full"></div>
      </BackgroundBeamsWithCollision>
      <div className="top-0 left-0 -translate-x-1/2 -translate-y-1/2 -z-[15] absolute w-[800px] h-[800px] blur-[200px] rounded-full bg-opacity-30 bg-[#6741E8]"></div>
      <div className="bottom-0 right-0 translate-x-1/2 translate-y-1/2 -z-[15] absolute w-[800px] h-[800px] blur-[200px] rounded-full bg-opacity-30 bg-[#6741E8]"></div>
      <div className='container text-white mx-auto flex items-center w-full justify-between'>
        <div className="flex-1">
          <h2 className='text-sm font-semibold'>Explore ideas with Web3It.AI</h2>
          <TypewriterEffect words={words} className="text-7xl font-semibold mt-4" />
          <h1 className='sr-only'>
            Fund your Web3 project with ease.
          </h1>
          <h2 className='mt-8 max-w-[700px]'>
          Whether you're looking to build a new Web3 site from the ground up or seeking to enhance an existing platform, our team of experts is here to guide you every step of the way. From initial design to ongoing maintenance, we utilize Claude AI to ensure your site remains at the forefront of the blockchain revolution.
            <br />
            <br />
          Join us in redefining the digital landscape, where your ideas are not just seen but are also invested in and supported through the power of tokenization. Let's build the future of the web, together.</h2>
          <div className='mt-16 flex gap-4 items-center'>
            <CreateProject />
          </div>
        </div>
        <div className="py-40 pointer-events-none">
          <Lottie options={defaultOptions}
            height={400}
            width={400}
          />
        </div>
      </div>
    </header>
  );
};
