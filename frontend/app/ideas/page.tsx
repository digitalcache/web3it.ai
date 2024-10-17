'use client'
import {
  BentoGrid,
  BentoGridItem,
} from "@/common/components/molecules/bentoGrid";
import { Footer } from '@/common/components/organisms';
import { Loader } from '@/common/components/atoms';
import { Address } from 'viem';
import { routes } from '@/common/routes';
import { BackgroundBeamsWithCollision } from '@/common/components/molecules';
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

  const navigateToTokenDetail = async (card: any) => {
    navigate(routes.projectDetailPath.replace('%subdomain%', 'client1').replace('%query%', serialize(card)))
  };

  const ideas = ideaTokens as IdeasType

  return (
    <>
      <div className="min-h-screen pt-20 md:pt-32 pb-12">
        <BackgroundBeamsWithCollision className="absolute top-0 left-0 pointer-events-none">
          <div className="w-full"></div>
        </BackgroundBeamsWithCollision>
        <div className='container mx-auto'>
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center text-white">Current Ideas</h2>
          <h2 className="mb-12 text-center text-white border-b border-white border-opacity-10 pb-4">Explore how ideas are doing in the market</h2>
          {isLoading ? (
            <Loader />
          ) : (
            <BentoGrid className="px-4 md:px-0">
              {ideas && ideas.length && ideas.map((item: IdeaType, index: number) => (
                <BentoGridItem
                  key={item.tokenAddress}
                  card={item}
                  imageAbsolute={false}
                  imageHeight="458"
                  className={`${index === 3 || index === 6 ? "md:col-span-2" : ""} row-span-2`}
                  navigateToTokenDetail={navigateToTokenDetail}
                />
              ))}
            </BentoGrid>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
};

export default ViewTokens;
