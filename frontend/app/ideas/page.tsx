'use client'

import {
  Token,
} from "@/common/components/molecules";
import { Footer } from '@/common/components/organisms';
import { Loader } from '@/common/components/atoms';
import { BackgroundBeamsWithCollision } from '@/common/components/molecules';
import { Masonry } from "masonic";
import lang from "@/common/lang";
import { useGetIdeas } from "./useGetIdeas";

const { ideas: ideasCopy } = lang

const ViewTokens = () => {
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
        <div className='container mx-auto'>
          <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-center text-white">{ideasCopy.currentIdeas}</h2>
          <h2 className="mb-12 text-center text-neutral-200 text-sm border-b border-white border-opacity-10 pb-4">{ideasCopy.currentIdeasSubHeading}</h2>
          {isLoading ? (
            <Loader />
          ) : (
            <div className="px-4 md:px-0">
              <Masonry
                columnCount={columnCount}
                columnGutter={16}
                rowGutter={16}
                items={ideas}
                render={Token}
              />
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
