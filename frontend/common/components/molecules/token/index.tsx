import { IdeaType } from "@/common/types";
import { cn } from "@/utils/helpers";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { LinkStyled } from "../../atoms";

export const Token = ({
  className,
  card,
  navigateToTokenDetail,
}: {
  className?: string;
  card: IdeaType;
  navigateToTokenDetail: (card: IdeaType) => void;
}) => {
  return (
    <button
      onClick={() => navigateToTokenDetail(card)}
      className={cn(
        "rounded-2xl group h-auto max-w-full relative overflow-hidden hover:shadow-xl transition duration-200 text-left justify-between bg-black flex flex-col",
        className,
      )}
    >
      <div className="shadow-lg">
        <Image
          src={card.tokenImageUrl}
          alt={card.symbol}
          width={400}
          height={400}
          className={`h-auto max-w-full`}
        />
      </div>
      <div className={`transition duration-200 px-2 xl:px-4 z-10 relative pb-3`}>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r overflow-hidden from-indigo-500 to-purple-500 -z-30"></div>
        <div className='bg-gradient-to-b from-white to-transparent backdrop-blur-3xl blur-[200px] absolute bottom-0 left-0 w-full h-full -z-20'></div>
        <div className="flex justify-between flex-1 mt-2 items-center">
          <div className="flex text-neutral-200 justify-between w-full items-center">
            <div className="font-semibold mr-1">
              {card.name}
            </div>
          </div>
          <div className="bg-white rounded-full text-sm px-2 py-1/2 font-bold">
            <span className="bg-gradient-to-b from-indigo-500 to-purple-500 text-transparent bg-clip-text">
              {card.symbol}
            </span>
          </div>
        </div>
        <div className="text-neutral-300 text-xs line-clamp-4 mt-2">
          {card.description}
        </div>
        <div className="flex justify-between mt-2 items-center">
          {card.productUrl ? (
            <LinkStyled className="!px-0 !text-sm flex items-center" href={card.productUrl} target="_blank">
              Explore here
              <ArrowUpRight height={16}/>
            </LinkStyled>
          ) : <div></div>}
          <div className="flex gap-2 items-end text-gray-300">
            <span className="text-sm">Raised:</span>
            <span className="text-sm text-neutral-200 font-semibold">{card.fundingRaised || 0} MATIC</span>
          </div>
        </div>
      </div>
    </button>
  );
};
