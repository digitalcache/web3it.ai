import { LinkStyled } from "@/common/components/atoms";
import { IdeaType } from "@/common/types";
import Image from "next/image";
import { ArrowUpRight } from 'lucide-react';
import { OwnerType } from "./types";
import { ethers } from "ethers";

export const TokenCard = ({
  idea,
  owners,
}: {
  idea: IdeaType;
  owners: Array<OwnerType> | []
}) => {
  const fundingRaised = idea?.fundingRaised ? ethers.formatUnits(idea.fundingRaised, 'ether') : 0
  return (
    <div className="bg-gradient-to-r lg:max-w-[360px] from-indigo-500 to-purple-500 p-4 h-auto rounded-2xl shadow-lg">
      <div className="flex flex-col gap-2 ">
        <div className="bg-white rounded-lg">
          <Image
            src={idea.tokenImageUrl}
            alt={idea.name}
            quality={30}
            className="w-full rounded-lg"
            width={300}
            height={300}
          />
        </div>
        <div className="flex-1">
          <div className="flex gap-2 items-start justify-between">
            <div className="text-neutral-200 font-semibold">{idea.name}</div>
            <div className="flex justify-end mt-1">
              <div className="bg-white rounded-full text-xs px-2 py-1/2 font-bold">
                <span className="bg-gradient-to-b from-indigo-500 to-purple-500 text-transparent bg-clip-text">
                  {idea.symbol}
                </span>
              </div>
            </div>
          </div>
          <div className="text-neutral-300 font-medium text-xs mt-1">
            {idea.description.replaceAll('$comma$', ',')}
          </div>
          <div className="flex gap-1 mt-1 flex-wrap">
            {idea.categories.split('/').map((category, index) => (
              <div key={index} className="bg-white rounded-full text-xs px-2 py-1/2 font-semibold">
                <span className="bg-gradient-to-b from-indigo-500 to-purple-500 text-transparent bg-clip-text">
                  {category}
                </span>
              </div>
            ))}
          </div>
          <div className="text-neutral-300 text-xs mt-2 flex items-center justify-between">
            Created by:{" "}
            <LinkStyled
              href={`https://amoy.polygonscan.com/address/${idea.creatorAddress}`}
              target="_blank"
              className="!px-0 !text-xs ml-2 hover:underline"
            >
              {idea.creatorAddress.slice(2, 7)}
            </LinkStyled>
          </div>
          <div className="text-neutral-300 text-xs flex items-center justify-between">
            Token address:{" "}
            <LinkStyled
              href={`https://amoy.polygonscan.com/address/${idea.tokenAddress}`}
              target="_blank"
              className="!px-0 !text-xs ml-2 hover:underline"
            >
              {idea.tokenAddress.slice(2, 7)}
            </LinkStyled>
          </div>
          <div className="text-neutral-300 text-xs flex items-center justify-between">
            Funding raised:{" "}
            <div className="ml-2">{fundingRaised ? parseFloat(fundingRaised).toFixed(4) : 0} MATIC</div>
          </div>
          <LinkStyled
            className="!px-0 !text-xs flex items-center justify-end mt-1 -mr-2"
            href={idea.productUrl}
            target="_blank"
          >
            Visit website
            <ArrowUpRight height={16} />
          </LinkStyled>
        </div>
      </div>
      {owners?.length ? (
        <div className="border-t border-gray-200/30 mt-2">
          <div className="text-neutral-200 text-sm font-semibold mb-2 mt-2">
            Stakeholders
          </div>
          {owners.map((owner, index: number) => {
            return (
              <div
                key={owner.owner_address}
                className="flex justify-between gap-2"
              >
                <LinkStyled
                  href={`https://amoy.polygonscan.com/address/${owner.owner_address}`}
                  target="_blank"
                  className="!px-0 !text-sm hover:underline"
                >
                  {index + 1}. {owner.owner_address.slice(2, 7)}
                </LinkStyled>
                <span className="text-neutral-300 text-sm">
                  {parseFloat(owner.percentage_relative_to_total_supply).toFixed(2)}%
                </span>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};