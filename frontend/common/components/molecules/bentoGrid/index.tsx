import { cn } from "@/utils/helpers";
import Image from "next/image";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  card,
  imageAbsolute,
  navigateToTokenDetail,
  imageHeight,
}: {
  className?: string;
  card?: any;
  imageAbsolute: boolean;
  imageHeight: string;
  navigateToTokenDetail: (card: any) => void;
}) => {
  return (
    <button
      onClick={() => navigateToTokenDetail(card)}
      className={cn(
        "rounded-2xl group/bento relative overflow-hidden hover:shadow-xl transition duration-200 text-left bg-[#080b25] justify-between pb-4 border border-white/[0.2] flex flex-col space-y-4",
        className,
      )}
    >
      <Image
        src={card.tokenImageUrl}
        alt={card.symbol}
        width={400}
        height={400}
        className={` object-cover ${imageAbsolute ? `absolute w-full h-[${imageHeight}px]` : `w-full h-[200px] lg:h-[458px]`}`}
      />
      <div className={`${imageAbsolute ? "group-hover/bento:bg-opacity-50 h-[100px] w-full absolute bg-black bg-opacity-100 backdrop-blur-sm bottom-0 left-0" : ""}`}></div>
      <div className={`group-hover/bento:translate-x-2 transition duration-200 px-4 z-10 ${imageAbsolute ? "absolute bottom-4 left-0 w-full opacity-80 group-hover/bento:opacity-100" : ""}`}>
        <div className="font-bold text-neutral-600 max-w-[180px] whitespace-nowrap text-ellipsis overflow-hidden dark:text-neutral-200 mb-2 mt-2">
          {card.creatorAddress}
        </div>
        <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
          {card.description}
        </div>
        <div className="bg-gradient-to-b from-indigo-500 to-purple-500 text-transparent bg-clip-text text-sm font-medium mt-2">{card.symbol}</div>
      </div>
      <div className='w-1/2 h-[40px] left-1/2 absolute -translate-x-1/2 bottom-0 translate-y-1/2 bg-gray-200 blur-[60px] bg-opacity-40 rounded-full' />
    </button>
  );
};
