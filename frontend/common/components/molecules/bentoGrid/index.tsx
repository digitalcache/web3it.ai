import { cn } from "@/utils/helpers";

 
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
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
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
  navigateToTokenDetail,
}: {
  className?: string;
  card?: any;
  navigateToTokenDetail: (card: any) => void;
}) => {
  return (
    <button
      onClick={navigateToTokenDetail}
      className={cn(
        "row-span-1 rounded-xl group/bento relative hover:shadow-xl transition duration-200 text-left shadow-input dark:shadow-none p-4 bg-gray-800 border border-white/[0.2] justify-between flex flex-col space-y-4",
        className,
      )}
    >
      <img 
        src={card.tokenImageUrl} 
        className="w-full max-h-[160px] object-cover rounded-lg"
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
    </button>
  );
};