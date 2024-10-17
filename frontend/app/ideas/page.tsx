'use client'
import {
  Token,
} from "@/common/components/molecules/token";
import { Footer } from '@/common/components/organisms';
import { Loader } from '@/common/components/atoms';
import { Address } from 'viem';
import { routes } from '@/common/routes';
import { BackgroundBeamsWithCollision } from '@/common/components/molecules';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { 
  useReadContract,
} from 'wagmi';
import abi from '@/utils/abis/ideaFactory.json'
import { ContractFunctions } from '@/common/constants';
import { 
  IdeasType, 
  IdeaType,
} from '@/common/types';
import { navigate } from '../actions';

const ViewTokens = () => {
  const { 
    data: ideaTokens, 
    isLoading,
  } = useReadContract({
    abi,
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as Address,
    functionName: ContractFunctions.getIdeas,
  })
  const serialize = (obj: any) => {
    const str = [];
    for (const p in obj) {
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    }
    return str.join("&");
  }

  const navigateToTokenDetail = async (card: IdeaType) => {
    navigate(routes.projectDetailPath.replace('%subdomain%', 'client1').replace('%query%', serialize(card)))
  };

  const ideas = ideaTokens as IdeasType

  return (
    <>
      <div className="w-full h-full absolute top-0 left-0 pointer-events-none">
        <BackgroundBeamsWithCollision className="!h-full">
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
              <ResponsiveMasonry
                columnsCountBreakPoints={{ 
                  350: 1, 
                  480: 2,
                  769: 3, 
                  1120: 4,
                }}
              >
                <Masonry gutter="16px">
                  {ideas && ideas.length && ideas.map((token: IdeaType) => (
                    <Token
                      key={token.tokenAddress}
                      card={token}
                      navigateToTokenDetail={navigateToTokenDetail}
                    />
                  ))}
                </Masonry>
              </ResponsiveMasonry>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
};

export default ViewTokens;
