import { ConnectButton as RainbowConnect } from '@rainbow-me/rainbowkit';
import { ChevronDown } from 'lucide-react'; 
import Image from 'next/image';
import { Button } from '../button';
import { useMemo } from 'react';

export const ConnectButton = () => {
  const avatarGradient = useMemo(() => {
    const colorArr = [
      "linear-gradient(-225deg, #00c3ff 0%, #ffff1c 100%)",
      "linear-gradient(-225deg, #A770EF 0%, #CF8BF3 50% , #FDB99B 100%)",
      "linear-gradient(-225deg, #FDFC47 0%, #24FE41 100%)",
      "linear-gradient(-225deg, #12c2e9 0%, #c471ed 50%, #f64f59 100%)",
      "linear-gradient(-225deg, #00c6ff 0%, #0072ff 100%)",
    ];
    return colorArr[Math.floor(Math.random() * colorArr.length)];
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
                    <span className='rounded-full flex justify-center items-center bg-white p-0.5'>
                      {account.ensAvatar ? (
                        <Image src={account.ensAvatar} alt="avatar" width={20} height={20} />
                      ) : (
                        <div className='h-5 w-5 rounded-full' style={{ background: avatarGradient }}>
                        </div>
                      )}
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