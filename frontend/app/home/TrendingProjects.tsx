'use client'
import { Address } from 'viem';
import { routes } from '@/common/routes';
import { serialize } from '@/utils/helpers';
import { 
  useReadContract,
} from 'wagmi';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
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
import { navigate } from '../actions';
import { Token } from '@/common/components/molecules';

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

  const navigateToTokenDetail = async (card: IdeaType) => {
    navigate(routes.projectDetailPath.replace('%subdomain%', 'client1').replace('%query%', serialize(card)))
  };

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
        <div className="">
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 
              350: 1, 
              480: 2,
              769: 3, 
              1120: 4,
            }}
          >
            <Masonry gutter="16px">
              {ideas && ideas.length && ideas.map((token: IdeaType, index: number) => {
                if (index >= 10) {
                  return null
                }
                return (
                  <Token
                    key={token.tokenAddress}
                    card={token}
                    navigateToTokenDetail={navigateToTokenDetail}
                  />
                )
              })}
             
            </Masonry>
          </ResponsiveMasonry>
        </div>
      </div>
    </section>
  );
};
