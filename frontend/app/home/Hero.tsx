'use client'
import { TypewriterEffect } from "@/common/components/atoms";
import Lottie from 'react-lottie';
import { BackgroundBeamsWithCollision } from "@/common/components/molecules";
import { useWindowDimensions } from "@/common/hooks/useWindowDimensions";
import { heroWords } from "@/common/constants";
import lang from "@/common/lang";
import { CreateProject } from "./createProject";
import * as animationData from '@/common/lottie/hero-animation.json'

const { homePage: homePageCopy } = lang

export const Hero = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const {
    windowSize,
  } = useWindowDimensions()

  return (
    <header className="pt-24 px-4 max-w-[100vw] relative pb-12">
      <BackgroundBeamsWithCollision className="hidden md:block absolute top-0 left-0 pointer-events-none">
        <div className="w-full"></div>
      </BackgroundBeamsWithCollision>
      <div className="top-0 left-0 -translate-x-1/2 -translate-y-1/2 -z-[15] absolute w-[300px] md:w-[800px] h-[300px] md:h-[800px] blur-[200px] rounded-full bg-opacity-30 bg-purple-400"></div>
      <div className="bottom-0 right-0 translate-x-1/2 translate-y-1/2 -z-[15] absolute w-[300px] md:w-[800px] h-[300px] md:h-[800px] blur-[200px] rounded-full bg-opacity-30 bg-purple-400"></div>
      <div className='container text-white mx-auto flex items-center w-full justify-between md:py-40'>
        <div className="flex-1 text-center md:text-left mt-10 md:mt-0">
          <h2 className='font-medium'>{homePageCopy.subHeading}</h2>
          <TypewriterEffect words={heroWords} className="font-semibold text-4xl md:text-5xl mt-4 min-h-20 md:min-h-12" />
          <h1 className='sr-only'>
            {homePageCopy.h1}
          </h1>
          <h2 className='text-sm text-gray-400 mt-4 md:mt-8 max-w-[700px]'>
            {homePageCopy.subHeading1}
            <br />
            <br />
            {homePageCopy.subHeading2}
            <br />
            <br />
            {homePageCopy.subHeading3}
          </h2>
          <div className='mt-16 flex gap-4 lg:items-center flex-col lg:flex-row'>
            <CreateProject />
          </div>
        </div>
        <div className="pointer-events-none hidden md:block">
          {windowSize !== "mobile" ? (
            <Lottie options={defaultOptions}
              height={400}
              width={400}
            />
          ) : null}
        </div>
      </div>
    </header>
  );
};
