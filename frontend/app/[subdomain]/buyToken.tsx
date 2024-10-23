import { 
  useState,
} from "react";
import { Button } from "@/common/components/atoms";
import { Input } from "@/common/components/molecules";
import { IdeaType } from "@/common/types";
import { 
  useAccount, useConnect, useWriteContract,
} from "wagmi";
import { injected } from 'wagmi/connectors'
import { Progress } from "@/common/components/molecules";
import { ethers } from "ethers";
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
import { 
  Get_Owners_Dto, 
  Get_Transfers_Dto,
} from "./types";
import ideaAbi from '@/utils/abis/ideaFactory.json'

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
  const fundingRaised = idea ? parseInt(ethers.formatUnits(idea.fundingRaised, 'ether'))  : 0;
  const fundingGoal = 24;
  const maxSupply = parseInt('1000000');

  const totalSupply = idea ? parseInt(ethers.formatUnits(idea.tokenCurrentSupply, 'ether')) : 0;
  const remainingTokens = idea ? maxSupply - totalSupply : 0
  const fundingRaisedPercentage = (fundingRaised / fundingGoal) * 100;

  const getCost = async () => {
    if (!purchaseAmount && purchaseAmount < 0) {
      return;
    }
    if (purchaseAmount > remainingTokens) {
      toast.error(`Limited tokens. Please enter less than ${remainingTokens}`)
      return
    }
    try {
      setTokenInfoLoading(true)
      const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);
      const contract = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '', ideaAbi, provider);
      const costInWei = await contract.calculateCost(totalSupply, purchaseAmount);
      setCostWei(costInWei)
      setCost(ethers.formatUnits(costInWei, 'ether'));
      setIsModalOpen(true);
    } catch (error) {
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
        toast.success(`Congratulations! You have purchased ${purchaseAmount} ${idea.symbol}`)
        await mutateTransfers()
        await mutateOwners()
        await mutateIdea()
      } catch (error) {
        toast.error("Purchase did not complete. Error occurred. Please try again!")
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
    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-4">
      <div className="mb-4">
        <div className="text-neutral-200 text-sm font-semibold mb-2 mt-2 flex justify-between items-center">
          <span>Bonding curve progress</span>
          <span className="text-sm font-semibold">{fundingRaised}/{fundingGoal} MATIC</span>
        </div>
        <div>
          <Progress value={fundingRaisedPercentage} />
        </div>
        <div className="text-neutral-300 text-xs mt-1 max-w-[300px]">
          When the market cap reaches {fundingGoal} ETH, all the liquidity from the bonding
          curve will be deposited into Uniswap, and the LP tokens will be
          burned. Progression increases as the price goes up.
        </div>
      </div>
      <Input
        id="token_amount"
        name="token_amount"
        type="number"
        min={1}
        max={remainingTokens}
        labelText={`Buy tokens for ${idea?.name}`}
        placeholder="Enter amount of tokens to buy"
        value={`${purchaseAmount ? purchaseAmount : ''}`}
        onKeyDown={handleKeyDown}
        onChange={(e) => setPurchaseAmount(parseInt(e.target.value ? e.target.value : '0'))}
        width="w-full"
      />
      <div className="text-neutral-300 mt-1 text-xs flex items-center">
        Available tokens: <div className="ml-2">{remainingTokens}/{maxSupply}</div>
      </div>
      <Modal>
        <ModalTrigger setIsModalOpen={setIsModalOpen} disabled={purchaseAmount <= 0} onClick={getCost}>
            Purchase
        </ModalTrigger>
        <ModalBody isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
          <ModalContent>
            <h4 className="text-white font-bold text-xl md:text-2xl ml-6 pt-4">Confirm purchase</h4>
            <div className="text-center font-semibold md:text-xl text-white mt-16 flex gap-2 flex-col md:flex-row items-center justify-center">
              <span>You need to pay</span>
              <div className="bg-white rounded-full px-2 py-1/2 font-black">
                <span className="bg-gradient-to-b from-indigo-500 to-purple-500 text-transparent bg-clip-text">
                  {cost}
                </span>
              </div>
              <span>MATIC for {purchaseAmount}</span>
              <div className="bg-white rounded-full px-2 py-1/2 font-black">
                <span className="bg-gradient-to-b from-indigo-500 to-purple-500 text-transparent bg-clip-text">
                  {idea?.symbol}
                </span>
              </div>
            </div>
            <p className="text-neutral-200 mt-8 md:mt-4 text-center text-xs md:text-sm">Ensure you have enough funds in your account</p>
          </ModalContent>
          <ModalFooter className="gap-4 pb-6">
            <Button 
              size="md" 
              variant="primary" 
              onClick={handlePurchase}
              className="transition-all duration-150 hover:from-indigo-500/90 hover:to-purple-500/90 bg-gradient-to-r from-indigo-500 to-purple-500 font-semibold"
            >
                Buy now
            </Button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
};
