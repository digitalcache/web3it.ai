import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers'
import { abi } from '@/utils/abi'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { routes } from '@/common/routes';
import { serialize } from '@/utils/helpers';
import { Button } from '@/common/components/atoms';

const ProjectCard = (card: any) => {
  const url = routes.projectDetailPath.replace('%id%', card.tokenAddress).replace('%query%', serialize(card))
  return (
    <Link href={url} className="bg-[#2C2C39] border-[#4D4C5A] border rounded-lg overflow-hidden p-4">
      <img src={card.tokenImageUrl} alt={card.name} className="w-full h-48 object-cover rounded-lg" />
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2 text-white max-w-full whitespace-nowrap text-ellipsis overflow-hidden">{card.creatorAddress}</h3>
        <p className="text-gray-300">{card.description}</p>
        <p className="text-gray-300">Funding Raised: {card.fundingRaised}</p>
        <p className="text-gray-300">{card.name} (ticker: {card.symbol})</p>
      </div>
    </Link>
  )
};

export const TrendingProjects = () => {
  const [cards, setCards] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter()

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
          }))
        );
      } catch (error) {
        console.error('Error fetching meme tokens:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMemeTokens();
  }, []);

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <div className='flex justify-between items-center border-b border-white border-opacity-10 mb-12 pb-4'>
          <h2 className="text-3xl font-bold mb-8 text-white">Trending Projects</h2>
          <Button size="md" onClick={() => router.push(routes.viewProjectsPath)} variant="secondary" className="ring-1 ring-white ring-inset hover:ring-0 from-indigo-500 to-purple-500 hover:bg-gradient-to-r">
            View all
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading && (
            <>
              <ProjectCard name="Loading..." symbol="Loading..." description="Loading..." tokenImageUrl="https://via.placeholder.com/300" fundingRaised="Loading..." tokenAddress="Loading..." creatorAddress="Loading..." />
              <ProjectCard name="Loading..." symbol="Loading..." description="Loading..." tokenImageUrl="https://via.placeholder.com/300" fundingRaised="Loading..." tokenAddress="Loading..." creatorAddress="Loading..." />
              <ProjectCard name="Loading..." symbol="Loading..." description="Loading..." tokenImageUrl="https://via.placeholder.com/300" fundingRaised="Loading..." tokenAddress="Loading..." creatorAddress="Loading..." />
              <ProjectCard name="Loading..." symbol="Loading..." description="Loading..." tokenImageUrl="https://via.placeholder.com/300" fundingRaised="Loading..." tokenAddress="Loading..." creatorAddress="Loading..." />
            </>
          )}
          {cards.map((card: any, index: number) => {
            if (index >= 4) {
              return null
            }
            return (
              <ProjectCard key={index} {...card} />
            )
          })}
        </div>
      </div>
    </section>
  );
};
