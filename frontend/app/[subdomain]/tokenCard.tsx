import { LinkStyled } from "@/common/components/atoms";
import { IdeaType } from "@/common/types";
import Image from "next/image";
import { ArrowUpRight } from 'lucide-react';
import { ethers } from "ethers";
import { TokenXIcon } from "@/common/components/icons";
import lang from "@/common/lang";
import { OwnerType } from "./types";

const { ideaPage: ideaPageCopy } = lang

export const TokenCard = ({
  idea,
  owners,
}: {
  idea: IdeaType;
  owners: Array<OwnerType> | []
}) => {
  const fundingRaised = idea?.fundingRaised ? ethers.formatUnits(idea.fundingRaised, 'ether') : 0
  return (
    <div className="bg-gradient-to-tl lg:max-w-[360px] from-indigo-500/90 to-purple-500/90 p-4 h-auto rounded-2xl shadow-lg">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <Image
            src={idea.tokenImageUrl}
            alt={idea.name}
            quality={30}
            width={300}
            height={300}
            className={`h-8 w-auto`}
          />
          <div className="flex justify-end mt-1">
            <div className="bg-white rounded-full text-xs px-2 py-1/2 font-semibold">
              <span className="bg-gradient-to-b from-indigo-500 to-purple-500 text-transparent bg-clip-text">
                {idea.symbol}
              </span>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex gap-2 items-start justify-between">
            <div className="text-neutral-200 text-xl font-semibold">{idea.name}</div>
          </div>
          <h1 className="text-neutral-300 font-medium text-xs mt-1">
            {idea.description.replaceAll('$comma$', ',')}
          </h1>
          <div className="flex gap-1 mt-1 flex-wrap">
            {idea.categories.split('/').map((category, index) => (
              <div key={index} className="bg-white rounded-full text-xs px-2 py-1/2 font-semibold">
                <span className="bg-gradient-to-b from-indigo-500 to-purple-500 text-transparent bg-clip-text">
                  {category}
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-between gap-2 mt-2">
            <div className="text-neutral-300 text-xs flex flex-col">
              {ideaPageCopy.createdBy}{" "}
              <LinkStyled
                href={`https://unichain-sepolia.blockscout.com/address/${idea.creatorAddress}`}
                target="_blank"
                className="!px-0 !text-xs hover:underline font-semibold"
              >
                {idea.creatorAddress.slice(2, 7)}
              </LinkStyled>
            </div>
            <div className="text-neutral-300 text-xs flex flex-col">
              {ideaPageCopy.tokenAddress}{" "}
              <LinkStyled
                href={`https://unichain-sepolia.blockscout.com/address/${idea.tokenAddress}`}
                target="_blank"
                className="!px-0 !text-xs hover:underline font-semibold"
              >
                {idea.tokenAddress.slice(2, 7)}
              </LinkStyled>
            </div>
            <div className="text-neutral-300 text-xs flex flex-col">
              {ideaPageCopy.fundingRaised}{" "}
              <div className="">
                <span className="font-semibold">{fundingRaised ? parseFloat(fundingRaised).toFixed(3).replace(/[.,]000$/, "") : 0} </span>
                {process.env.NEXT_PUBLIC_CURRENCY || ''}
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-2 gap-2">
            {idea.twitterUrl ? (
              <LinkStyled
                className="!px-0"
                href={idea.twitterUrl}
                target="_blank"
              >
                <TokenXIcon />
              </LinkStyled>
            ) : null}
            <LinkStyled
              className="!px-0 !text-xs w-max flex items-center -mr-2"
              href={idea.productUrl}
              target="_blank"
            >
              {ideaPageCopy.visitWebsite}
              <ArrowUpRight height={16} />
            </LinkStyled>
          </div>
        </div>
      </div>
      {owners?.length > 1 ? (
        <></>
        // <div className="border-t border-gray-200/30 mt-2">
        //   <div className="text-neutral-200 text-sm font-semibold mb-2 mt-2">
        //     {ideaPageCopy.stakeholders}
        //   </div>
        //   {owners.map((owner, index: number) => {
        //     if (owner.owner_address.toLowerCase() === (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '').toLowerCase()) {
        //       return null
        //     }
        //     return (
        //       <div
        //         key={owner.owner_address}
        //         className="flex justify-between gap-2"
        //       >
        //         <LinkStyled
        //           href={`https://polygonscan.com/address/${owner.owner_address}`}
        //           target="_blank"
        //           className="!px-0 !text-sm hover:underline"
        //         >
        //           {index}. {owner.owner_address.slice(2, 7)}
        //         </LinkStyled>
        //         <span className="text-neutral-300 text-sm">
        //           {parseFloat(owner.percentage_relative_to_total_supply).toFixed(2)}%
        //         </span>
        //       </div>
        //     );
        //   })}
        // </div>
      ) : null}
    </div>
  );
};
