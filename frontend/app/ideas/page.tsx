'use client'

import { useState } from "react";
import {
  Token,
  TokenListItem,
} from "@/common/components/molecules";
import { Footer } from '@/common/components/organisms';
import { Loader } from '@/common/components/atoms';
import {
  LayoutGrid,
  LayoutList,
} from "lucide-react";
import { BackgroundBeamsWithCollision } from '@/common/components/molecules';
import { Masonry } from "masonic";
import lang from "@/common/lang";
import { useGetIdeas } from "./useGetIdeas";

const { ideas: ideasCopy } = lang

const ViewTokens = () => {
  const [isListView, setIsListView] = useState(false)
  const {
    columnCount,
    ideas,
    isLoading,
  } = useGetIdeas()

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
          <h2 className="text-center text-neutral-200 text-sm pb-4 max-w-[200px] md:max-w-max">
            {ideasCopy.currentIdeasSubHeading}
          </h2>
          <div className="absolute top-10 right-4 md:right-0">
            <button type="button" onClick={() => setIsListView(!isListView)} className="flex gap-2 text-white hover:text-indigo-400">
              {isListView ? (
                <LayoutList />
              ) : (
                <LayoutGrid />
              )}
            </button>
          </div>
          <div className=" w-[calc(100%-32px)] mx-auto md:w-full h-px bg-white/10 mb-6"></div>
          {isLoading ? (
            <Loader />
          ) : (
            <div className="px-4 md:px-0 w-full">
              {isListView ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {ideas.map((idea, index) => (
                    <TokenListItem key={index} data={idea} />
                  ))}
                </div>
              ) : (
                <Masonry
                  columnCount={columnCount}
                  columnGutter={16}
                  rowGutter={16}
                  items={ideas}
                  render={Token}
                />
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
