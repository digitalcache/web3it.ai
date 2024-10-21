import { createClient } from '@/common/utils/supabase/client';
import { readContract } from '@wagmi/core'
import { Metadata } from 'next';
import { config } from '@/config';
import { Address } from 'viem';
import { ContractFunctions } from '@/common/constants';
import NotFound from '../not-found';
import { TokenDetails } from './tokenDetails';
import ideaAbi from '@/utils/abis/ideaFactory.json'
import { IdeaType } from '@/common/types';

export async function generateMetadata ({ params } : {
  params: {
    subdomain: string;
  }
}): Promise<Metadata> {
  const supabase = createClient();
  const { data: subdomains } = await supabase.from('Subdomains').select('*')
  if (subdomains?.length) {
    const subdomainData = subdomains.find((d) => d.subdomain === params.subdomain)
    if (subdomainData?.address) {
      const ideaToken = await readContract(config, {
        abi: ideaAbi,
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as Address,
        functionName: ContractFunctions.getIdea,
        args: [subdomainData.address],
      });
      const idea = ideaToken as IdeaType
      return {
        title: `Web3It.AI | ${idea.name}`,
        description: `${idea.description}`,
      }
    }
  }
  return {}
}


const TokenDetail = async ({ params } : {
  params: {
    subdomain: string;
  }
}) => {
  const supabase = createClient();
  const { data: subdomains } = await supabase.from('Subdomains').select('*')

  if (subdomains?.length) {
    const subdomainData = subdomains.find((d) => d.subdomain === params.subdomain)
    if (subdomainData?.address) {
      return (
        <TokenDetails tokenAddress={subdomainData.address} />
      )
    }
  }
  return <NotFound />

  

  // const { 
  //   writeContractAsync,
  // } = useWriteContract()

  // const idea = ideaToken as IdeaType

  // const [owners, setOwners] = useState<any>([]);
  // const [transfers, setTransfers] = useState<any>([]);
  // const [loading, setLoading] = useState(true);
  // const [totalSupply, setTotalSupply] = useState(0);
  // const [remainingTokens, setRemainingTokens] = useState(0);
  // const [purchaseAmount, setPurchaseAmount] = useState('');
  // const [cost, setCost] = useState('0');
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const router = useRouter()

  // const fundingRaised = idea?.fundingRaised ? parseFloat(idea.fundingRaised.replace(' ETH', '')) : 0;
  // const fundingGoal = 20;
  // const maxSupply = parseInt('800000');
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {

  //       const ownersResponse = await fetch(
  //         `https://deep-index.moralis.io/api/v2.2/erc20/${'0x4DD9291Efc26fDAd0F870155f0886c1a8d2f3666'}/owners?chain=polygon amoy&order=DESC`,
  //         {
  //           headers: {
  //             accept: 'application/json',
  //             'X-API-Key': process.env.NEXT_PUBLIC_X_API_KEY || '',
  //           },
  //         },
  //       );
  //       const ownersData = await ownersResponse.json();
  //       setOwners(ownersData.result || []);

  //       // `https://deep-index.moralis.io/api/v2.2/erc20/${tokenAddress}/transfers?chain=sepolia&order=DESC`,

  //       const transfersResponse = await fetch(
  //         `https://deep-index.moralis.io/api/v2.2/erc20/0x4DD9291Efc26fDAd0F870155f0886c1a8d2f3666/transfers?chain=polygon amoy&order=DESC`,
  //         {
  //           headers: {
  //             accept: 'application/json',
  //             'X-API-Key': process.env.NEXT_PUBLIC_X_API_KEY || '',
  //           },
  //         },
  //       );

  //       const transfersData = await transfersResponse.json();
        
  //       setTransfers(transfersData.result || []);
        
  //       // Fetch total supply
  //       const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);
  //       const contract = new ethers.Contract('0x4DD9291Efc26fDAd0F870155f0886c1a8d2f3666' as string, tokenAbi, provider);
  //       const totalSupplyResponse = await contract.totalSupply();
  //       const totalSupplyFormatted = parseInt(ethers.formatUnits(totalSupplyResponse, 'ether')) - 200000;
  //       setTotalSupply(totalSupplyFormatted);

  //       // // Calculate remaining tokens
  //       setRemainingTokens(maxSupply - totalSupplyFormatted);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [tokenAddress, maxSupply]);

  // const fundingRaisedPercentage = (fundingRaised / fundingGoal) * 100;
  // const valueAfterTwentyThousandInEther: any = ethers.formatUnits(maxSupply - 200000, 'ether')
  // const totalSupplyPercentage = ((totalSupply - 200000) / valueAfterTwentyThousandInEther) * 100;

  // const getCost = async () => {
  //   if (!purchaseAmount) {
  //     return;
  //   }

  //   try {
  //     const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);
  //     const contract = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '', ideaAbi, provider);
  //     const costInWei = await contract.calculateCost(totalSupply, purchaseAmount); // Replace with actual function
  //     setCost(ethers.formatUnits(costInWei, 'ether'));
  //     setIsModalOpen(true); // Open the modal
  //   } catch (error) {
  //     console.error('Error calculating cost:', error);
  //   }
  // };

  // // Function to handle purchase
  // const handlePurchase = async () => {
  //   try {

  //     await writeContractAsync({
  //       abi: ideaAbi,
  //       address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as Address,
  //       functionName: ContractFunctions.buyToken,
  //       args: [
  //         '0x4DD9291Efc26fDAd0F870155f0886c1a8d2f3666',
  //         purchaseAmount,
  //       ],
  //     })

  //     // const win = window as any
  //     // const provider = new ethers.BrowserProvider(win.ethereum);
  //     // const signer = await provider.getSigner();
  //     // const contract = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '', abi, signer);
  //     // console.log("here", contract)
      
  //     // const transaction = await contract.buyIdeaToken('0xb739c297c20b0fff91839f015f3aff2e65f6b4f5', purchaseAmount, {
  //     //   value: ethers.parseUnits(cost, 'ether'),
  //     // });
  //     // const receipt = await transaction.wait();
  //     // console.log("here", receipt)

  //     // alert(`Transaction successful! Hash: ${receipt.hash}`);
  //     // setIsModalOpen(false);
  //   } catch (error) {
  //   }
  // };


  return (
    <>
      {/* <div className="token-detail-container">
        <nav className="navbar">
          <a href="#" className="nav-link">[moralis]</a>
          <a href="#" className="nav-link">[docs]</a>
          <button className="nav-button">[connect wallet]</button>
        </nav>

        <h3 className="start-new-coin" onClick={() => router.push('/')}>[go back]</h3>

        <div className="token-details-section">

          <div className="token-details">
            <h2>Token Detail for {idea.name}</h2>
            <Image
              src={idea.tokenImageUrl}
              alt={idea.symbol}
              width={400}
              height={400}
              className="token-detail-image"
            />
            <p><strong>Creator Address:</strong> {idea.creatorAddress}</p>
            <p><strong>Token Address:</strong> {idea.tokenAddress}</p>
            <p><strong>Funding Raised:</strong> {idea.fundingRaised}</p>
            <p><strong>Token Symbol:</strong> {idea.symbol}</p>
            <p><strong>Description:</strong> {idea.description}</p>
          </div>

          <div className="right-column">
            <div className="progress-bars">
              <div className="progress-container">
                <p><strong>Bonding Curve Progress:</strong> {fundingRaised} / {fundingGoal} ETH</p>
                <div className="progress-bar">
                  <div className="progress" style={{ width: `${fundingRaisedPercentage}%` }}></div>
                </div>
                <p>When the market cap reaches {fundingGoal} ETH, all the liquidity from the bonding curve will be deposited into Uniswap, and the LP tokens will be burned. Progression increases as the price goes up.</p>
              </div>

              <div className="progress-container">
                <p><strong>Remaining Tokens Available for Sale:</strong> {remainingTokens} / 800,000</p>
                <div className="progress-bar">
                  <div className="progress" style={{ width: `${totalSupplyPercentage}%` }}></div>
                </div>
              </div>
            </div>


            <div className="buy-tokens">
              <h3>Buy Tokens</h3>
              <input
                type="number"
                placeholder="Enter amount of tokens to buy"
                value={purchaseAmount}
                onChange={(e) => setPurchaseAmount(e.target.value)}
                className="buy-input"
              />
              <button onClick={getCost} className="buy-button">Purchase</button>
            </div>
          </div>
        </div>


        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h4>Confirm Purchase</h4>
              <p>Cost of {purchaseAmount} tokens: {cost} ETH</p>
              <button onClick={handlePurchase} className="confirm-button">Confirm</button>
              <button onClick={() => setIsModalOpen(false)} className="cancel-button">Cancel</button>
            </div>
          </div>
        )}


        <h3>Owners</h3>
        {loading ? (
          <p>Loading owners...</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Owner Address</th>
                <th>Percentage of Total Supply</th>
              </tr>
            </thead>
            <tbody>
              {owners.map((owner: any, index: number) => (
                <tr key={index}>
                  <td>{owner.owner_address}</td>
                  <td>{owner.percentage_relative_to_total_supply}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <h3>Transfers</h3>
        {loading ? (
          <p>Loading transfers...</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>From Address</th>
                <th>To Address</th>
                <th>Value (ETH)</th>
                <th>Transaction Hash</th>
              </tr>
            </thead>
            <tbody>
              {transfers.map((transfer: any, index: number) => (
                <tr key={index}>
                  <td>{transfer.from_address}</td>
                  <td>{transfer.to_address}</td>
                  <td>{transfer.value_decimal}</td>
                  <td><a style={{ color: "white" }} href={`https://sepolia.etherscan.io/tx/${transfer.transaction_hash}`} target="_blank" rel="noopener noreferrer">{transfer.transaction_hash}</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div> */}
    </>
  )
};

export default TokenDetail;
