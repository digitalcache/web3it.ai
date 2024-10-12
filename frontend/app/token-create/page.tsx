'use client'
import React, { useState } from 'react';
import { ethers } from 'ethers'
import { abi } from '@/utils/abi'
import { useRouter } from 'next/navigation';

const TokenCreate = () => {
  const [name, setName] = useState('');
  const [ticker, setTicker] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const router = useRouter()

  const handleCreate = async () => {
    const win = window as any
    const provider = new ethers.BrowserProvider(win.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '', abi, signer);

    const transaction = await contract.createMemeToken(name, ticker, imageUrl, description, {
      value: ethers.parseUnits("0.0001", 'ether'),
    }); 
    const receipt = await transaction.wait();

    alert(`Transaction successful! Hash: ${receipt.hash}`);
    router.push('/')
  };

  return (
    <div className="app">
      <nav className="navbar">
        <a href="#" className="nav-link">[moralis]</a>
        <a href="#" className="nav-link">[docs]</a>
        <button className="nav-button">[connect wallet]</button>
      </nav>
      <div className="token-create-container">
        <h3 className="start-new-coin" onClick={() => router.push('/')}>[go back]</h3>
        <p className="info-text">MemeCoin creation fee: 0.0001 ETH</p>
        <p className="info-text">Max supply: 1 million tokens. Initial mint: 200k tokens.</p>
        <p className="info-text">If funding target of 24 ETH is met, a liquidity pool will be created on Uniswap.</p>
        <div className="input-container">
          <input
            type="text"
            placeholder="Token Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Ticker Symbol"
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
            className="input-field"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="input-field"
          />
          <button className="create-button" onClick={handleCreate}>Create MemeToken</button>
        </div>
      </div>
    </div>
  )
};

export default TokenCreate;
