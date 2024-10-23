'use client'
import { useMemo } from "react";
import {
  Token,
} from "@/common/components/molecules";
import { Footer } from '@/common/components/organisms';
import { Loader } from '@/common/components/atoms';
import { Address } from 'viem';
import { BackgroundBeamsWithCollision } from '@/common/components/molecules';
import { Masonry } from "masonic";
import { 
  useReadContract,
} from 'wagmi';
import { ContractFunctions } from '@/common/constants';
import { useWindowDimensions } from "@/common/hooks/useWindowDimensions";
import { 
  IdeasType, 
} from '@/common/types';
import abi from '@/utils/abis/ideaFactory.json'

const ViewTokens = () => {
  const {
    windowSize,
  } = useWindowDimensions()

  const { 
    data: ideaTokens, 
    isLoading,
  } = useReadContract({
    abi,
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as Address,
    functionName: ContractFunctions.getIdeas,
    query: {
      refetchInterval: 10000,
    },
  })

  const ideas = useMemo<IdeasType>(() => {
    if (ideaTokens && Array.isArray(ideaTokens)) {
      return ideaTokens.toReversed()
    }
    return []
  }, [ideaTokens])
  

  const columnCount = useMemo(() => {
    if (windowSize === 'desktop') {
      return 4
    }
    if (windowSize === 'desktopLowRes') {
      return 3
    }
    if (windowSize === 'tablet') {
      return 2
    }
    return 1
  }, [windowSize])

  return (
    <>
      <div className="w-full h-full absolute top-0 left-0 pointer-events-none">
        <BackgroundBeamsWithCollision className="!h-[calc(100%-180px)]">
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
