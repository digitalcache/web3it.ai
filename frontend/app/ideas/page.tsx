'use client'

import {
  Token,
} from "@/common/components/molecules";
import { Footer } from '@/common/components/organisms';
import { Loader } from '@/common/components/atoms';
import { BackgroundBeamsWithCollision } from '@/common/components/molecules';
import { Masonry } from "masonic";
import { useGetIdeas } from "./useGetIdeas";

const ViewTokens = () => {
  const {
    columnCount,
    ideas,
    isLoading,
  } = useGetIdeas()

  return (
    <>
      <div className="w-full h-full absolute top-0 left-0 pointer-events-none">
        <BackgroundBeamsWithCollision className="hidden md:block !h-[calc(100%-180px)]">
          <div className="w-full"></div>
        </BackgroundBeamsWithCollision>
      </div>
      <div className="min-h-screen pt-20 md:pt-32 pb-12">
        <div className='container mx-auto'>
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center text-white">Current Ideas</h2>
          <h2 className="mb-12 text-center text-white border-b border-white border-opacity-10 pb-4">Explore how ideas are doing in the market</h2>
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
      <Footer />
    </>
  )
};

export default ViewTokens;
