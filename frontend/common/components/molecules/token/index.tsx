import { IdeaType } from "@/common/types";
import { cn } from "@/utils/helpers";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { SubdomainType } from "@/middleware";
import { routes } from '@/common/routes';
import { navigate } from '@/app/actions';
import { createClient } from '@/common/utils/supabase/client';
import { LinkStyled } from "../../atoms";

export const Token = ({
  data,
}: {
  data: IdeaType;
}) => {
  const supabase = createClient();

  const navigateToTokenDetail = async (card: IdeaType) => {
    const { data: subdomains } = await supabase.from('Subdomains').select('*')
    if (subdomains?.length) {
      const subdomainData = subdomains.find((d: SubdomainType) => d.address.toLowerCase() === card.tokenAddress.toLowerCase())
      if (subdomainData) {
        navigate(routes.projectDetailPath.replace('%subdomain%', subdomainData.subdomain))
      }
    }
  };
  return (
    <button
      onClick={() => navigateToTokenDetail(data)}
      className={cn(
        "rounded-2xl group h-auto max-w-full relative overflow-hidden hover:shadow-xl transition duration-200 text-left justify-between bg-black flex flex-col",
      )}
    >
      <div className="shadow-lg flex justify-center items-center w-full">
        <Image
          src={data.tokenImageUrl}
          alt={data.symbol}
          width={400}
          height={200}
          quality={60}
          className={`h-auto w-full`}
        />
      </div>
      <div className={`transition duration-200 px-2 xl:px-4 z-10 relative pb-3`}>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r overflow-hidden from-indigo-500 to-purple-500 -z-30"></div>
        <div className='bg-gradient-to-b from-white to-transparent backdrop-blur-3xl blur-[200px] absolute bottom-0 left-0 w-full h-full -z-20'></div>
        <div className="flex justify-between flex-1 mt-2 items-center">
          <div className="flex text-neutral-200 justify-between w-full items-center">
            <div className="font-semibold mr-1">
              {data.name}
            </div>
          </div>
          <div className="bg-white rounded-full text-sm px-2 py-1/2 font-bold">
            <span className="bg-gradient-to-b from-indigo-500 to-purple-500 text-transparent bg-clip-text">
              {data.symbol}
            </span>
          </div>
        </div>
        <div className="text-neutral-300 text-xs line-clamp-4 mt-2">
          {data.description}
        </div>
        <div className="flex justify-between mt-2 items-center">
          {data.productUrl ? (
            <LinkStyled className="!px-0 !text-sm flex items-center" href={data.productUrl} target="_blank">
              Explore here
              <ArrowUpRight height={16}/>
            </LinkStyled>
          ) : <div></div>}
          <div className="flex gap-2 items-end text-gray-300">
            <span className="text-sm">Raised:</span>
            <span className="text-sm text-neutral-200 font-semibold">{data.fundingRaised || 0} MATIC</span>
          </div>
        </div>
      </div>
    </button>
  );
};
