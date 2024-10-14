'use client'
import {
  useState,
  useEffect,
  useMemo,
} from 'react';
import { ethers } from 'ethers'
import { abi } from '@/utils/abi'
import { routes } from '@/common/routes';
import { serialize } from '@/utils/helpers';
import {
  Button, Loader,
} from '@/common/components/atoms';
import { useRouter } from 'next/navigation';
import { navigate } from '../actions';
import { BentoGrid } from '@/common/components/molecules';
import { BentoGridItem } from '@/common/components/molecules/bentoGrid';
import { Carousel } from '@/common/components/organisms';

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

  const navigateToTokenDetail = async (card: any) => {
    navigate(routes.projectDetailPath.replace('%subdomain%', 'client1').replace('%query%', serialize(card)))
  };

  const reactCards = useMemo(() => {
    if (cards) {
      return cards.map((card: any) => (
        <BentoGridItem key={card.src} card={card} navigateToTokenDetail={navigateToTokenDetail}  imageHeight='150' imageAbsolute={false} />
      ));
    }
    return []
  }, [cards])

  return (
    <section className="py-12 px-4">
      {loading && <Loader />}
      <div className="container mx-auto">
        <div className='flex justify-between border-b border-white border-opacity-10 mb-12 pb-4'>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Trending Ideas</h2>
          <Button size="md" onClick={() => router.push(routes.viewProjectsPath)} variant="secondary" className="ring-1 ring-white ring-inset hover:ring-0 from-indigo-500 to-purple-500 hover:bg-gradient-to-r">
            View all
          </Button>
        </div>
        <div className="hidden md:block">
          <BentoGrid>
            {cards.map((item: any, i: number) => {
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
          {!loading && <Carousel items={reactCards} />}
        </div>
      </div>
    </section>
  );
};
