'use client'
import { 
  useState, 
  useEffect,
} from 'react';
import { ethers } from 'ethers'
import { abi } from '@/utils/abi'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { routes } from '@/common/routes';
import { serialize } from '@/utils/helpers';
import { 
  Button, Loader,
} from '@/common/components/atoms';

const ProjectCard = (card: any) => {
  const url = routes.projectDetailPath.replace('%id%', card.tokenAddress).replace('%query%', serialize(card))
  return (
    <Link href={url} className={"row-span-1 rounded-xl group/bento relative hover:shadow-xl transition duration-200 text-left shadow-input dark:shadow-none p-4 bg-gray-800 border border-white/[0.2] justify-between flex flex-col space-y-4"}>
      <img 
        src={card.tokenImageUrl} 
        className="w-full max-h-[250px] object-cover rounded-lg"
      />
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        <div className="font-bold text-neutral-600 max-w-[180px] whitespace-nowrap text-ellipsis overflow-hidden dark:text-neutral-200 mb-2 mt-2">
          {card.creatorAddress}
        </div>
        <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
          {card.description}
        </div>
        <div className="bg-gradient-to-b from-indigo-500 to-purple-500 text-transparent bg-clip-text text-sm font-medium mt-2">{card.symbol}</div>
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

  return (
    <section className="py-12 px-4">
      {loading && <Loader />}
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
