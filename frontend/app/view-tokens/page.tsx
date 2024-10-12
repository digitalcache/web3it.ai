'use client'
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers'
import { abi } from '@/utils/abi'
import { useRouter } from 'next/navigation';

const ViewTokens = () => {
  const [cards, setCards] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter()

  const serialize = (obj: any) => {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }

  useEffect(() => {
    const fetchMemeTokens = async () => {
      try {
        const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL)
        const contract = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '', abi, provider);
        const memeTokens = await contract.getAllMemeTokens();
        setCards(
          memeTokens.map((token: any) => ({
            name: token.name,
            symbol: token.symbol,
            description: token.description,
            tokenImageUrl: token.tokenImageUrl,
            fundingRaised: ethers.formatUnits(token.fundingRaised, 'ether'), // Format the fundingRaised from Wei to Ether
            tokenAddress: token.tokenAddress,
            creatorAddress: token.creatorAddress,
          }))
        );
      } catch (error) {
        console.error('Error fetching meme tokens:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMemeTokens();
  }, []);

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
  };

  const navigateToTokenDetail = (card: any) => {
    router.push(`/token-detail/${card.tokenAddress}?${serialize(card)}`)
  };

  return (
    <div className="app">
      <nav className="navbar">
        <a href="#" className="nav-link">[moralis]</a>
        <a href="#" className="nav-link">[docs]</a>
        <button className="nav-button">[connect wallet]</button>
      </nav>
      <div className="card-container">
        <h3 className="start-new-coin" onClick={() => router.push('/token-create')}>[start a new coin]</h3>
        <img src="https://pump.fun/_next/image?url=%2Fking-of-the-hill.png&w=256&q=75" alt="Start a new coin" className="start-new-image"/>


        {cards.length > 0 && (
          <div className="card main-card" onClick={() => navigateToTokenDetail(cards[0])}>
            <div className="card-content">
              <img src={cards[0].tokenImageUrl} alt={cards[0].name} className="card-image"/>
              <div className="card-text">
                <h2>Created by {cards[0].creatorAddress}</h2>
                <p>Funding Raised: {cards[0].fundingRaised} ETH</p>
                <p>{cards[0].name} (ticker: {cards[0].symbol})</p>
                <p>{cards[0].description}</p>
              </div>
            </div>
          </div>
        )}

        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="search for token"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch}>Search</button>
        </div>

        <h4 style={{textAlign:"left", color:"rgb(134, 239, 172)"}}>Terminal</h4>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="card-list">

            {cards.slice(1).map((card: any, index: number) => (
              <div key={index} className="card" onClick={() => navigateToTokenDetail(card)}>
                <div className="card-content">
                  <img src={card.tokenImageUrl} alt={card.name} className="card-image"/>
                  <div className="card-text">
                    <h2>Created by {card.creatorAddress}</h2>
                    <p>Funding Raised: {card.fundingRaised} ETH</p>
                    <p>{card.name} (ticker: {card.symbol})</p>
                    <p>{card.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
};

export default ViewTokens;
