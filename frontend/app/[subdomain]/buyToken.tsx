import {
  useState,
} from "react";
import { Button } from "@/common/components/atoms";
import { Input } from "@/common/components/molecules";
import { IdeaType } from "@/common/types";
import {
  useAccount,
  useConnect,
  useReadContract,
  useWriteContract,
} from "wagmi";
import { injected } from 'wagmi/connectors'
import { Progress } from "@/common/components/molecules";
import { ContractFunctions } from "@/common/constants";
import { Address } from "viem";
import toast from "react-hot-toast";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@/common/components/organisms";
import { KeyedMutator } from "swr";
import lang from "@/common/lang";
import { abbreviateNumber } from "@/utils/helpers";
import { ethers } from "ethers";
import {
  Get_Owners_Dto,
  Get_Transfers_Dto,
} from "./types";
import ideaAbi from '@/utils/abis/ideaFactory.json'

const { ideaPage: ideaPageCopy } = lang

export const BuyToken = ({
  idea,
  setTokenInfoLoading,
  tokenAddress,
  mutateTransfers,
  mutateOwners,
  mutateIdea,
} : {
  idea: IdeaType;
  setTokenInfoLoading: (value: boolean) => void;
  tokenAddress: string;
  mutateTransfers: KeyedMutator<Get_Transfers_Dto>;
  mutateOwners: KeyedMutator<Get_Owners_Dto>;
  mutateIdea: any;
}) => {
  const {
    writeContractAsync,
  } = useWriteContract()
  const { connect } = useConnect()
  const {
    isConnected,
  } = useAccount()
  const [purchaseAmount, setPurchaseAmount] = useState(0);
  const [cost, setCost] = useState('0');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [costWei, setCostWei] = useState(0)
  const fundingRaised = idea ? parseFloat(ethers.formatUnits(idea.fundingRaised, 'ether'))  : 0;
  const fundingGoal = parseFloat(process.env.NEXT_PUBLIC_TARGET_ETH || '0');
  const maxSupply = parseInt(process.env.NEXT_PUBLIC_MAX_SUPPLY || '0');

  const totalSupply = idea ? parseInt(ethers.formatUnits(idea.tokenCurrentSupply, 'ether')) : 0;
  const remainingTokens = idea ? maxSupply - totalSupply : 0
  const fundingRaisedPercentage = (fundingRaised / fundingGoal) * 100;
  const initialSupply = parseInt(process.env.NEXT_PUBLIC_INITIAL_SUPPLY || '0')
  const actualSupply = totalSupply - initialSupply
  const {
    refetch: getCostRPC,
  } = useReadContract({
    abi: ideaAbi,
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as Address,
    functionName: ContractFunctions.calculateCost,
    args: [actualSupply, purchaseAmount],
    query: {
      enabled: false,
    },
  })

  const getCost = async () => {
    if (!purchaseAmount && purchaseAmount < 0) {
      return;
    }
    if (purchaseAmount > remainingTokens) {
      toast.error(`${ideaPageCopy.limitedTokensError.replace('%amount%', remainingTokens.toString())}`)
      return
    }
    try {
      setTokenInfoLoading(true)
      const { data: costInWei } = await getCostRPC()
      setCostWei(costInWei as number)
      setCost(ethers.formatUnits(costInWei as number, 'ether'));
      setIsModalOpen(true);
    } catch (error) {
      console.error(error)
    } finally {
      setTokenInfoLoading(false)
    }
  };
  const handlePurchase = async () => {
    const purchaseAction = async () => {
      try {
        setTokenInfoLoading(true)
        await writeContractAsync({
          abi: ideaAbi,
          address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as Address,
          functionName: ContractFunctions.buyToken,
          value: BigInt(costWei),
          args: [
            tokenAddress,
            purchaseAmount,
          ],
        })
        toast.success(`${ideaPageCopy.purchaseSuccess} ${purchaseAmount} ${idea.symbol}`)
        await mutateTransfers()
        await mutateOwners()
        await mutateIdea()
        setPurchaseAmount(0)
      } catch (error) {
        toast.error(ideaPageCopy.purchaseError)
      } finally {
        setIsModalOpen(false);
        setTokenInfoLoading(false)
      }
    }
    if (!isConnected) {
      connect({
        connector: injected(),
      }, {
        onSuccess: async () => {
          await purchaseAction()
        },
      })
    } else {
      purchaseAction()
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault()
      getCost()
    }
  }
  return (
    <div className="bg-gradient-to-tl from-indigo-500/90 to-purple-500/90 shadow-lg shadow-black rounded-2xl p-4">
      <div className="mb-4">
        <div className="text-white font-semibold mb-2 flex justify-between items-center">
          <span>{ideaPageCopy.bondingCurveProgress}</span>
        </div>
        <div className="mt-3">
          <Progress value={fundingRaisedPercentage} />
          <div className="text-white w-full text-xs mt-1 font-semibold text-right">{parseFloat(`${fundingRaised}`).toFixed(3).replace(/[.,]000$/, "")}/{fundingGoal} <span className="font-normal">{process.env.NEXT_PUBLIC_CURRENCY || ''}</span></div>
        </div>
        <div className="text-neutral-200 text-xs font-medium mt-2 lg:max-w-[300px]">
          {ideaPageCopy.bondingCurveInfo.replace('%goal%', fundingGoal.toString()).replace('%currency%', process.env.NEXT_PUBLIC_CURRENCY || '')}
        </div>
      </div>
      <Input
        id="token_amount"
        name="token_amount"
        type="number"
        min={1}
        max={remainingTokens}
        labelText={`${ideaPageCopy.buyTokensFor} ${idea?.name}`}
        placeholder="Enter amount of tokens to buy"
        value={`${purchaseAmount ? purchaseAmount : ''}`}
        onKeyDown={handleKeyDown}
        onChange={(e) => setPurchaseAmount(parseInt(e.target.value ? e.target.value : '0'))}
        width="w-full"
      />
      <div className="text-white mt-1 text-xs flex items-center justify-end">
        {ideaPageCopy.availableTokens}: <div className="ml-2 font-semibold">{abbreviateNumber(remainingTokens.toString())}/{abbreviateNumber(maxSupply.toString())}</div>
      </div>
      <Modal>
        <ModalTrigger setIsModalOpen={setIsModalOpen} disabled={purchaseAmount <= 0 || purchaseAmount > remainingTokens} onClick={getCost}>
          {ideaPageCopy.purchaseLabel}
        </ModalTrigger>
        <ModalBody isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
          <ModalContent>
            <h4 className="text-white font-semibold text-xl md:text-2xl ml-6 pt-4">{ideaPageCopy.confirmPurchase}</h4>
            <div className="text-center font-medium md:text-xl text-white mt-16 flex gap-2 flex-col md:flex-row items-center justify-center">
              <span>{ideaPageCopy.youNeedToPay}</span>
              <div className="flex items-center gap-1">
                <div className="bg-white rounded-full px-3 py-1/2 font-semibold">
                  <span className="bg-gradient-to-b from-indigo-500 to-purple-500 text-transparent bg-clip-text">
                    {cost}
                  </span>
                </div>
                {process.env.NEXT_PUBLIC_CURRENCY || ''}
              </div>
              <span>{ideaPageCopy.for}</span>
              <div className="flex items-center gap-1">
                <div className="bg-white rounded-full px-3 py-1/2 font-semibold">
                  <span className="bg-gradient-to-b from-indigo-500 to-purple-500 text-transparent bg-clip-text">
                    {purchaseAmount}
                  </span>
                </div>
                {idea?.symbol}
              </div>
            </div>
            <p className="text-neutral-200 mt-8 md:mt-4 text-center text-xs md:text-sm">{ideaPageCopy.ensure}</p>
          </ModalContent>
          <ModalFooter className="gap-4 pb-6">
            <Button
              size="md"
              variant="primary"
              onClick={handlePurchase}
              className="transition-all duration-150 hover:from-indigo-500/70 hover:to-purple-500/70 bg-gradient-to-r from-indigo-500 to-purple-500 font-semibold"
            >
              {ideaPageCopy.buyNow}
            </Button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
};
