'use client'
import {
  useMemo,
} from 'react';
import { Address } from 'viem';
import { routes } from '@/common/routes';
import { serialize } from '@/utils/helpers';
import { 
  useReadContract,
} from 'wagmi';
import abi from '@/utils/abis/ideaFactory.json'
import { ContractFunctions } from '@/common/constants';
import { 
  IdeasType,
  IdeaType, 
} from '@/common/types';
import {
  Button, Loader,
} from '@/common/components/atoms';
import { useRouter } from 'next/navigation';
import { BentoGrid } from '@/common/components/molecules';
import { BentoGridItem } from '@/common/components/molecules/bentoGrid';
import { Carousel } from '@/common/components/organisms';
import { navigate } from '../actions';

export const TrendingProjects = () => {
  const router = useRouter()

  const { 
    data: ideaTokens, 
    isLoading,
  } = useReadContract({
    abi,
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as Address,
    functionName: ContractFunctions.getIdeas,
  })

  const ideas = ideaTokens as IdeasType

  const navigateToTokenDetail = async (card: any) => {
    navigate(routes.projectDetailPath.replace('%subdomain%', 'client1').replace('%query%', serialize(card)))
  };

  const reactCards = useMemo(() => {
    if (ideas?.length) {
      return ideas.map((card: IdeaType) => (
        <BentoGridItem key={card.tokenAddress} card={card} navigateToTokenDetail={navigateToTokenDetail}  imageHeight='150' imageAbsolute={false} />
      ));
    }
    return []
  }, [ideas])

  return (
    <section className="py-12 px-4">
      {isLoading && <Loader />}
      <div className="container mx-auto">
        <div className='flex justify-between border-b border-white border-opacity-10 mb-12 pb-4'>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Trending Ideas</h2>
          <Button size="md" onClick={() => router.push(routes.viewProjectsPath)} variant="secondary" className="ring-1 ring-white ring-inset hover:ring-0 from-indigo-500 to-purple-500 hover:bg-gradient-to-r font-semibold">
            View all
          </Button>
        </div>
        <div className="hidden md:block">
          <BentoGrid>
            {ideas?.length && ideas.map((item: IdeaType, i: number) => {
              if (i >= 5) {
                return null
              }
              return (
                <BentoGridItem
                  key={i}
                  card={item}
                  imageAbsolute={true}
                  className={`${i === 3 || i === 6 ? "md:col-span-2" : ""}`}
                  navigateToTokenDetail={navigateToTokenDetail}
                  imageHeight='170'
                />
              )
            })}
          </BentoGrid>
        </div>
        <div className='md:hidden'>
          {!isLoading && <Carousel items={reactCards} />}
        </div>
      </div>
    </section>
  );
};
