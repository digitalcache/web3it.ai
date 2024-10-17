import { ConnectButton as RainbowConnect } from '@rainbow-me/rainbowkit';
import { ChevronDown } from 'lucide-react'; 
// @ts-expect-error didn't find declarations
import { createAvatar } from '@dicebear/core';
// @ts-expect-error didn't find declarations
import { pixelArt } from '@dicebear/collection';
import Image from 'next/image';
import { Button } from '../button';
import { useMemo } from 'react';

export const ConnectButton = () => {
  const avatar = useMemo(() => {
    return createAvatar(pixelArt, {
      size: 20,
    }).toDataUri();
  }, []);
  return (
    <RainbowConnect.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain;

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button size="sm" onClick={openConnectModal} variant="secondary" className="hidden lg:block ring-1 py-2 ring-white ring-inset hover:ring-0 from-indigo-500 to-purple-500 hover:bg-gradient-to-r font-semibold">
                    Connect wallet
                  </Button> 
                );
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button" className='px-4 py-3 rounded-xl bg-red-500 text-white font-semibold flex gap-1'>
                    Wrong network
                    <ChevronDown strokeWidth={3} width={20} height={20} />
                  </button>
                );
              }
              return (
                <div className='flex gap-3'>
                  <button onClick={openAccountModal} className='px-4 py-3 rounded-xl text-white transition-all duration-150 hover:from-indigo-500/90 hover:to-purple-500/90 bg-gradient-to-r from-indigo-500 to-purple-500 font-semibold flex gap-1 items-center' type="button">
                    <span className='rounded-full flex justify-center items-center bg-white p-1'>
                      <Image src={account.ensAvatar ? account.ensAvatar : avatar} alt="avatar" width={20} height={20} />
                    </span>
                    {account.displayName}
                    <ChevronDown strokeWidth={3} width={20} height={20} />
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </RainbowConnect.Custom>
  );
};