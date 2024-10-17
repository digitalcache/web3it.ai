'use client'
import { Address } from 'viem';
import { useRouter } from 'next/navigation';
import { ContractFunctions } from '@/common/constants';
import { 
  useAccount, 
  useConnect, 
  useWriteContract,
} from 'wagmi';
import { injected } from 'wagmi/connectors'
import {
  Controller, SubmitHandler, useForm, 
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Footer } from '@/common/components/organisms';
import { Input } from '@/common/components/molecules';
import abi from '@/utils/abis/ideaFactory.json'
import { Button } from '@/common/components/atoms';
import { tokenSchema } from './validationSchema';
import { TokenDTO } from './types';
import { routes } from '@/common/routes';

const TokenCreate = () => {
  const router = useRouter()
  const { connect } = useConnect()
  const {
    isConnected,
  } = useAccount()

  const {
    handleSubmit, 
    control,
    reset, 
    formState: { 
      isValid,
    },
  } = useForm<TokenDTO>({
    resolver: yupResolver(tokenSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      ticker: '',
      imageUrl: '',
      description: '',
      website: '',
      twitter: '',
    },
  });

  const { 
    writeContract,
  } = useWriteContract()

  const onSubmit: SubmitHandler<TokenDTO> = async (data) => {
    if (!isConnected) {
      connect({ connector: injected() })
      return
    }
    if (isConnected) {
      await writeContract({
        abi,
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as Address,
        functionName: ContractFunctions.createIdeaToken,
        args: [
          data.name,
          data.ticker,
          data.imageUrl,
          data.description,
          data.website,
          data.twitter || '',
        ],
      })
      reset()
      router.push(routes.viewProjectsPath)
    }
  };
  return (
    <div>
      <div className="min-h-screen pt-20 md:pt-32 pb-12 relative overflow-hidden">
        <div className="top-0 left-0 -translate-x-1/2 -translate-y-1/2 -z-[15] absolute w-[300px] md:w-[800px] h-[300px] md:h-[800px] blur-[200px] rounded-full bg-opacity-30 bg-purple-500"></div>
        <div className="bottom-0 right-0 translate-x-1/2 translate-y-1/2 -z-[15] absolute w-[300px] md:w-[800px] h-[300px] md:h-[800px] blur-[200px] rounded-full bg-opacity-30 bg-purple-500"></div>
        <div className='container mx-auto flex flex-col items-center px-4 md:px-0'>
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center text-white">Create token</h2>
          <h2 className="mb-12 max-w-[400px] text-center text-white border-b w-full border-white border-opacity-10 pb-4">Register your product by creating a token and try to give as much details as possible about your idea</h2>
          <form onSubmit={handleSubmit(onSubmit)} className='max-w-[800px] relative bg-gradient-to-r overflow-hidden from-indigo-500 to-purple-500 w-full rounded-2xl pt-8 flex flex-col gap-4'>
            <div className='bg-gradient-to-t from-white to-transparent backdrop-blur-3xl blur-[200px] absolute bottom-0 left-0 w-full h-[400px] -z-[0]'></div>
            <div className="px-4 md:px-8 relative flex gap-4 flex-col md:gap-2 md:flex-row">
              <Controller
                name="name"
                control={control}
                rules={{ required: true }}
                render={({
                  field, fieldState, 
                }) => {
                  const { error } = fieldState;
                  const {
                    ref, ...fieldProperties
                  } = field;
                  return (
                    <Input
                      id={field.name}
                      labelText="Product name"
                      placeholder="Web3It.AI"
                      error={!!error}
                      errorMessage={error?.message}
                      {...fieldProperties}
                      width="w-full"
                    />
                  )
                }}
              />
              <Controller
                name="ticker"
                control={control}
                rules={{ required: true }}
                render={({
                  field, fieldState, 
                }) => {
                  const { error } = fieldState;
                  const {
                    ref, ...fieldProperties
                  } = field;
                  return (
                    <Input
                      id={field.name}
                      labelText="Ticker name"
                      placeholder="Ticker"
                      error={!!error}
                      errorMessage={error?.message}
                      {...fieldProperties}
                      width="w-full"
                    />
                  )
                }}
              />
            </div>
            <div className="px-4 md:px-8 relative">
              <Controller
                name="imageUrl"
                control={control}
                rules={{ required: true }}
                render={({
                  field, fieldState, 
                }) => {
                  const { error } = fieldState;
                  const {
                    ref, ...fieldProperties
                  } = field;
                  return (
                    <Input
                      id={field.name}
                      labelText="Image"
                      placeholder="https://image.coo/file.jpg"
                      error={!!error}
                      errorMessage={error?.message}
                      {...fieldProperties}
                      width="w-full"
                    />
                  )
                }}
              />
            </div>
            <div className="px-4 md:px-8 relative">
              <Controller
                name="description"
                control={control}
                rules={{ required: true }}
                render={({
                  field, fieldState, 
                }) => {
                  const { error } = fieldState;
                  const {
                    ref, ...fieldProperties
                  } = field;
                  return (
                    <Input
                      id={field.name}
                      labelText="Description"
                      placeholder="Describe your idea"
                      error={!!error}
                      errorMessage={error?.message}
                      {...fieldProperties}
                      width="w-full"
                    />
                  )
                }}
              />
            </div>
            <div className="px-4 md:px-8 relative flex gap-4 flex-col md:gap-2 md:flex-row">
              <Controller
                name="website"
                control={control}
                rules={{ required: true }}
                render={({
                  field, fieldState, 
                }) => {
                  const { error } = fieldState;
                  const {
                    ref, ...fieldProperties
                  } = field;
                  return (
                    <Input
                      id={field.name}
                      labelText="Website"
                      placeholder="https://web3it.ai"
                      error={!!error}
                      errorMessage={error?.message}
                      {...fieldProperties}
                      width="w-full"
                    />
                  )
                }}
              />
              <Controller
                name="twitter"
                control={control}
                rules={{ required: true }}
                render={({
                  field, fieldState, 
                }) => {
                  const { error } = fieldState;
                  const {
                    ref, ...fieldProperties
                  } = field;
                  return (
                    <Input
                      id={field.name}
                      labelText="X (Optional)"
                      placeholder="https://x.com/justweb3it"
                      error={!!error}
                      errorMessage={error?.message}
                      {...fieldProperties}
                      width="w-full"
                    />
                  )
                }}
              />
            </div>
            <div className='flex px-4 md:px-0 justify-center mt-12 pb-8 relative'>
              <Button
                size="md" 
                type='submit'
                variant="primary" 
                disabled={!isValid}
                className="transition-all w-full md:w-auto duration-150 disabled:bg-space-cadet/40 bg-space-cadet hover:bg-space-cadet/80 font-semibold"
              >
              Register your product
              </Button>
            </div>
          </form>
        </div>
      </div>
      
      {/* <div className="app">
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
      </div> */}
      <Footer />
    </div>
    
  )
};

export default TokenCreate;
