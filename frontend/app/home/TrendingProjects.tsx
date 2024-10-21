'use client'
import { useMemo } from 'react';
import { Address } from 'viem';
import { routes } from '@/common/routes';
import { 
  useReadContract,
} from 'wagmi';
import { Masonry } from "masonic";
import { ContractFunctions } from '@/common/constants';
import { 
  IdeasType,
} from '@/common/types';
import {
  Button, Loader,
} from '@/common/components/atoms';
import { useRouter } from 'next/navigation';
import { Token } from '@/common/components/molecules';
import { useWindowDimensions } from '@/common/hooks/useWindowDimensions';
import abi from '@/utils/abis/ideaFactory.json'

export const TrendingProjects = () => {
  const router = useRouter()

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
      if (windowSize === 'mobile') {
        return ideaTokens.toReversed().slice(0, 3)
      }
      return ideaTokens.toReversed().slice(0, 8)
    }
    return []
  }, [ideaTokens, windowSize])


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
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <div className='flex justify-between border-b border-white border-opacity-10 mb-12 pb-4'>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Trending Ideas</h2>
          <Button size="md" onClick={() => router.push(routes.viewProjectsPath)} variant="secondary" className="ring-1 ring-white ring-inset hover:ring-0 from-indigo-500 to-purple-500 hover:bg-gradient-to-r font-semibold">
            View all
          </Button>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="">
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
    </section>
  );
};
