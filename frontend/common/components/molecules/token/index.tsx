import {
  useMemo,
} from "react";
import { cn } from "@/utils/helpers";
import Image from "next/image";
import { SubdomainType } from "@/middleware";
import { routes } from '@/common/routes';
import { ethers } from "ethers";
import Link from "next/link";
import { IdeaTypeWithDomain } from "@/common/types";


export const Token = ({
  data,
}: {
  data: IdeaTypeWithDomain;
}) => {

  const {
    idea,
    subdomains,
  } = data

  const fundingRaised = idea.fundingRaised ? ethers.formatUnits(idea.fundingRaised, 'ether') : 0

  const tokenLink = useMemo(() => {
    if (subdomains?.length) {
      const subdomainData = subdomains.find((d: SubdomainType) => d.address.toLowerCase() === idea.tokenAddress.toLowerCase())
      if (subdomainData) {
        return routes.projectDetailPath.replace('%subdomain%', subdomainData.subdomain)
      }
    }
    return ''
  }, [subdomains, idea])

  return (
    <Link
      href={tokenLink}
      prefetch={true}
      className={cn(
        "rounded-2xl group h-auto w-full relative overflow-hidden hover:shadow-xl transition duration-200 text-left justify-between bg-black flex flex-col",
      )}
    >
      <div className="shadow-lg bg-white flex justify-center items-center w-full">
        <Image
          src={idea.tokenImageUrl}
          alt={idea.symbol}
          width={400}
          height={200}
          quality={40}
          className={`h-auto w-full`}
        />
      </div>
      <div className={`transition duration-200 px-2 xl:px-4 z-10 relative pb-3 w-full`}>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r overflow-hidden from-indigo-500 to-purple-500 -z-30"></div>
        <div className='bg-gradient-to-b from-white to-transparent backdrop-blur-3xl blur-[200px] absolute bottom-0 left-0 w-full h-full -z-20'></div>
        <div className="flex justify-between flex-1 mt-2 items-center">
          <div className="flex text-neutral-200 justify-between w-full items-center">
            <div className="font-semibold mr-1">
              {idea.name}
            </div>
          </div>
          <div className="bg-white rounded-full text-sm px-2 py-1/2 font-bold">
            <span className="bg-gradient-to-b from-indigo-500 to-purple-500 text-transparent bg-clip-text whitespace-nowrap">
              {idea.symbol}
            </span>
          </div>
        </div>
        <div className="text-neutral-300 text-xs line-clamp-4 mt-2">
          {idea.description.replaceAll('$comma$', ',')}
        </div>
        <div className="flex justify-between mt-2 items-center">
          <div></div>
          <div className="flex gap-2 items-end text-gray-300">
            <span className="text-sm">Raised:</span>
            <span className="text-sm text-neutral-200 font-semibold">{fundingRaised ? parseFloat(fundingRaised).toFixed(4) : 0} MATIC</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
