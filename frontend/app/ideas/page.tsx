'use client'

import { useState } from "react";
import {
  Token,
  TokenListItem,
} from "@/common/components/molecules";
import Lottie from 'react-lottie';
import { Footer } from '@/common/components/organisms';
import { Loader } from '@/common/components/atoms';
import {
  LayoutGrid,
  LayoutList,
  PiggyBank,
} from "lucide-react";
import { BackgroundBeamsWithCollision } from '@/common/components/molecules';
import { Masonry } from "masonic";
import lang from "@/common/lang";
import Link from "next/link";
import { routes } from "@/common/routes";
import Carousel  from "@/common/components/molecules/carousel";
import { useGetIdeas } from "./useGetIdeas";
import * as animationData from '@/common/lottie/no-ideas.json'

const { ideas: ideasCopy } = lang

const ViewTokens = () => {
  const [isListView, setIsListView] = useState(false)
  const {
    columnCount,
    ideas,
    isLoading,
    categories,
    currentCategory,
    handleCategoryChange,
  } = useGetIdeas()

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const carouselItems = categories.map((c) => {
    return (
      <button
        onClick={() => handleCategoryChange(c)}
        key={c.id}
        type="button"
        className={`${c.active ? "bg-white shadow-sm shadow-indigo-400" : ""} hover:bg-white rounded-full transition-all duration-200 ease-in-out px-4 py-1 font-semibold`}
      >
        <span className="bg-gradient-to-t from-indigo-500 to-purple-500 whitespace-nowrap text-transparent bg-clip-text">
          {c.value}
        </span>
      </button>
    )
  })

  return (
    <>
      <div className="w-full h-full absolute top-0 left-0 pointer-events-none">
        <BackgroundBeamsWithCollision className="hidden md:block !h-[calc(100%)]">
          <div className="w-full"></div>
        </BackgroundBeamsWithCollision>
      </div>
      <div className="min-h-screen pt-20 md:pt-32 pb-[180px]">
        <div className='container mx-auto flex items-center flex-col w-full relative'>
          <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-center text-white">{ideasCopy.currentIdeas}</h2>
          <h1 className="text-center text-neutral-200 text-sm pb-4 max-w-[200px] md:max-w-max">
            {ideasCopy.currentIdeasSubHeading}
          </h1>
          <div className="absolute top-10 right-4 md:right-0">
            <button type="button" onClick={() => setIsListView(!isListView)} className="flex gap-2 text-white hover:text-indigo-400">
              {isListView ? (
                <LayoutList />
              ) : (
                <LayoutGrid />
              )}
            </button>
          </div>
          <div className="w-[calc(100%-32px)] mx-auto md:w-full h-px bg-white/10 mb-6"></div>
          <div className="w-[calc(100%-32px)] mx-auto md:w-full mb-6 flex justify-center">
            <Carousel items={carouselItems} />
          </div>
          {isLoading ? (
            <Loader />
          ) : (
            <div className="px-4 md:px-0 w-full">
              {ideas.length ? (
                isListView ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {ideas.map((idea, index) => (
                      <TokenListItem key={index} data={idea} />
                    ))}
                  </div>
                ) : (
                  <Masonry
                    key={currentCategory}
                    columnCount={columnCount}
                    columnGutter={16}
                    rowGutter={16}
                    items={ideas}
                    render={Token}
                  />
                )
              ) : (
                <div className="flex justify-center items-center md:mt-16 mb-16 flex-col">
                  <div className="pointer-events-none">
                    <Lottie options={defaultOptions}
                      height={200}
                      width={200}
                    />
                  </div>
                  <div className="text-xl md:text-2xl font-semibold text-white text-center">{ideasCopy.noIdeasHeading}</div>
                  <div className="text-neutral-200 text-sm  mt-2 mb-6 text-center">{ideasCopy.noIdeasSubHeading}</div>
                  <Link href={routes.newIdeaPath} prefetch={true}
                    className={`flex items-center justify-center text-white rounded-xl outline-none px-4 py-3 text-base
                    disabled:cursor-not-allowed ease-in-out transition-all gap-2 duration-150 hover:from-indigo-500/70
                    hover:to-purple-500/70 bg-gradient-to-r from-indigo-500 to-purple-500 font-medium`}
                  >
                    {ideasCopy.registerIdea}
                    <PiggyBank strokeWidth={1.5} />
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full">
        <Footer />
      </div>
    </>
  )
};

export default ViewTokens;
