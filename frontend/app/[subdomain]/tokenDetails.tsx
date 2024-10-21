'use client'

import { 
  useEffect, 
  useState,
} from 'react';
import { Address } from 'viem';
import dayjs from 'dayjs';
import { ContractFunctions } from '@/common/constants';
import { 
  useReadContract,
} from 'wagmi';
import { IdeaType } from '@/common/types';
import { 
  LinkStyled, Loader,
} from '@/common/components/atoms';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import ideaAbi from '@/utils/abis/ideaFactory.json'

type OwnerType = {
  balance: string;
  balance_formatted: string;
  is_contract: boolean;
  owner_address: string;
  owner_address_label: string;
  percentage_relative_to_total_supply: string;
  usd_value: string;
}

type TransferType = {
  address: string;
  block_hash: string;
  block_timestamp: string;
  from_address: string;
  to_address: string;
  token_decimals: 18;
  token_name: string;
  transaction_hash: string;
  value: string;
  value_decimal: string;
}

export const TokenDetails = ({
  tokenAddress,
} : {
  tokenAddress: string;
}) => {
  const [owners, setOwners] = useState<Array<OwnerType>>([]);
  const [transfers, setTransfers] = useState<Array<TransferType>>([]);
  const [tokenInfoLoading, setTokenInfoLoading] = useState(true);
  const maxSupply = parseInt('800000');

  const { 
    data: ideaToken, 
    isLoading,
  } = useReadContract({
    abi: ideaAbi,
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as Address,
    functionName: ContractFunctions.getIdea,
    args: [tokenAddress],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ownersResponse = await fetch(
          `https://deep-index.moralis.io/api/v2.2/erc20/${tokenAddress}/owners?chain=polygon amoy&order=DESC`,
          {
            headers: {
              accept: 'application/json',
              'X-API-Key': process.env.NEXT_PUBLIC_X_API_KEY || '',
            },
          },
        );
        const ownersData = await ownersResponse.json();
        setOwners(ownersData.result || []);

        const transfersResponse = await fetch(
          `https://deep-index.moralis.io/api/v2.2/erc20/${tokenAddress}/transfers?chain=polygon amoy&order=DESC`,
          {
            headers: {
              accept: 'application/json',
              'X-API-Key': process.env.NEXT_PUBLIC_X_API_KEY || '',
            },
          },
        );

        const transfersData = await transfersResponse.json();
        setTransfers(transfersData.result || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setTokenInfoLoading(false);
      }
    };

    fetchData();
  }, [tokenAddress, maxSupply]);

  const idea = ideaToken as IdeaType
  return (
    <>
      {isLoading || !idea || tokenInfoLoading ? (
        <Loader />
      ) : (
        <div className="container mx-auto flex flex-col-reverse md:flex-row gap-8 pt-24 px-4 md:px-0 md:pt-32 pb-12">
          <div className="md:w-4/5 flex flex-col gap-4">
            <div className="hidden md:block rounded-2xl overflow-hidden w-full">
              <Image
                src={`https://api.apiflash.com/v1/urltoimage?access_key=490dad84ce6c4aa2aa74a3f4a97fd34a&wait_until=page_loaded&url=${idea.productUrl}`}
                // src={`https://image.thum.io/get/maxAge/12/width/1872/png/noanimate/fullpage/wait/3/${idea.productUrl}`}
                quality={100}
                className="w-full h-auto"
                width={1200}
                height={800}
                alt={idea.name}
              />
            </div>
            <div>
              <div className="mb-2 mt-8 text-neutral-200 font-semibold text:lg md:text-xl">
                Check out ongoing trades on {idea.name}
              </div>
              <table className="w-full text-sm text-left text-gray-400 rtl:text-right rounded-xl overflow-hidden">
                <thead className="text-xs bg-gray-700 text-gray-400 ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Account
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Value
                    </th>
                    <th scope="col" className="hidden md:block px-6 py-3">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Transaction
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transfers.map((transfer) => (
                    <tr className="odd:bg-gray-900 text-sm even:bg-gray-800 border-b border-gray-700" key={transfer.from_address}>
                      <th
                        scope="row"
                        className="px-6 py-4 whitespace-nowrap font-normal"
                      >
                        {transfer.from_address.slice(2, 7)}
                      </th>
                      <th className="px-6 py-4 font-normal">{parseFloat(transfer.value_decimal).toFixed(0)}</th>
                      <th className="hidden md:block px-6 py-4 font-normal">{dayjs(transfer.block_timestamp).format('DD MMM YY')}</th>
                      <th className="px-6 py-4 font-medium hover:underline">
                        <a className="text-white" href={`https://amoy.polygonscan.com/tx/${transfer.transaction_hash}`} target="_blank" rel="noopener noreferrer">
                          {transfer.transaction_hash.slice(2, 7)}
                        </a>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex flex-col-reverse md:flex-col gap-4">
            {/* <div className="bg-violets-are-blue rounded-2xl p-4">
              buy or sell
            </div> */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4 h-auto rounded-2xl shadow-lg">
              <div className="flex gap-2 items-start">
                <Image
                  src={idea.tokenImageUrl}
                  alt={idea.name}
                  className="w-32 rounded-lg"
                  width={300}
                  height={300}
                />
                <div className='flex-1'>
                  <div className="flex gap-2 items-center justify-between">
                    <div className="text-neutral-200 font-semibold">
                      {idea.name}
                    </div>
                    <div className="bg-white rounded-full text-sm px-2 py-1/2 font-bold">
                      <span className="bg-gradient-to-b from-indigo-500 to-purple-500 text-transparent bg-clip-text">
                        {idea.symbol}
                      </span>
                    </div>
                  </div>
                  <div className="text-neutral-300 text-xs flex items-center">
                    Created by:{" "}
                    <LinkStyled
                      href={`https://amoy.polygonscan.com/address/${idea.creatorAddress}`}
                      target="_blank"
                      className="!px-0 !text-xs ml-2 hover:underline"
                    >
                      {idea.creatorAddress.slice(2, 7)}
                    </LinkStyled>
                  </div>
                  <div className="text-neutral-300 text-xs flex items-center">
                    Token address:{" "}
                    <LinkStyled
                      href={`https://amoy.polygonscan.com/address/${idea.tokenAddress}`}
                      target="_blank"
                      className="!px-0 !text-xs ml-2 hover:underline"
                    >
                      {idea.tokenAddress.slice(2, 7)}
                    </LinkStyled>
                  </div>
                  <div className="text-neutral-300 text-xs flex items-center">
                    Funding raised:{" "}
                    <div className="ml-2">{idea.fundingRaised || 0} MATIC</div>
                  </div>
                  <LinkStyled
                    className="!px-0 !text-xs flex items-center mt-1"
                    href={idea.productUrl}
                    target="_blank"
                  >
                    Visit website
                    <ArrowUpRight height={16} />
                  </LinkStyled>
                  <hr className="border-gray-200/30 my-1" />
                  <div className="text-neutral-300 text-xs mt-1 max-w-[200px]">
                    {idea.description}
                  </div>
                </div>
              </div>
              <div>
                <div className="text-neutral-200 text-sm font-semibold mb-2">
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
                        {owner.percentage_relative_to_total_supply}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}