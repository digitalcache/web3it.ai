'use client'
import React, { 
  useState, useEffect,
} from 'react';
import { ethers } from 'ethers'
import { abi } from '@/utils/abi'
import { 
  BentoGrid, 
  BentoGridItem,
} from "@/common/components/molecules/bentoGrid";
import { Footer } from '@/common/components/organisms';
import { Loader } from '@/common/components/atoms';
import { routes } from '@/common/routes';
import { navigate } from '../actions';

const ViewTokens = () => {
  const [cards, setCards] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const serialize = (obj: any) => {
    const str = [];
    for (const p in obj) {
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    }
    return str.join("&");
  }

  useEffect(() => {
    const fetchMemeTokens = async () => {
      try {
        const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL)
        const contract = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '', abi, provider);
        const memeTokens = await contract.getAllMemeTokens();
        setCards(
          memeTokens.map((token: any) => ({
            name: token.name,
            symbol: token.symbol,
            description: token.description,
            tokenImageUrl: token.tokenImageUrl,
            fundingRaised: ethers.formatUnits(token.fundingRaised, 'ether'), // Format the fundingRaised from Wei to Ether
            tokenAddress: token.tokenAddress,
            creatorAddress: token.creatorAddress,
          })),
        );
      } catch (error) {
        console.error('Error fetching meme tokens:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMemeTokens();
  }, []);


  const navigateToTokenDetail = async (card: any) => {
    navigate(routes.projectDetailPath.replace('%subdomain%', 'client1').replace('%query%', serialize(card)))
  };


  return (
    <>
      <div className="min-h-screen pt-48 pb-12">
        <h2 className="text-3xl font-bold mb-8 text-center text-white">Ongoing Projects</h2>
        {loading ? (
          <Loader />
        ) : (
          <BentoGrid className="max-w-4xl mx-auto">
            {cards.map((item: any, i: number) => (
              <BentoGridItem
                key={i}
                card={item}
                className={i === 3 || i === 6 ? "md:col-span-2" : ""}
                navigateToTokenDetail={navigateToTokenDetail}
              />
            ))}
          </BentoGrid>
        )}
      </div>
      <Footer />
    </>
  )
};

export default ViewTokens;
