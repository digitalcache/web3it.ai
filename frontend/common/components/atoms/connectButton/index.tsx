import { ConnectButton as RainbowConnect } from '@rainbow-me/rainbowkit';
import {
  ChevronDown,
  WalletMinimal,
} from 'lucide-react';
import Image from 'next/image';
import { useMemo } from 'react';
import lang from '@/common/lang';
import { Button } from '../button';

const {
  header: {
    connectButton: connectButtonCopy,
  },
} = lang

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
                  <Button size="sm" onClick={openConnectModal} variant="secondary" className="flex gap-2 md:ring-1 py-1 !px-2 md:!px-4 md:py-2.5 ring-white ring-inset hover:ring-0 from-indigo-500 to-purple-500 hover:bg-gradient-to-r font-medium">
                    <span className='hidden md:inline'>{connectButtonCopy.connectWallet}</span>
                    <WalletMinimal />
                  </Button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button" className='px-3 md:px-4 py-2 md:py-3 rounded-xl bg-red-500 text-white font-medium flex gap-2 items-center text-xs md:text-base'>
                    {connectButtonCopy.wrongNetwork}
                    <ChevronDown strokeWidth={2.5} width={20} height={20} className='w-4 h-4 md:w-5 md:h-5' />
                  </button>
                );
              }
              return (
                <div className='flex gap-3'>
                  <button onClick={openAccountModal} className='px-3 md:px-4 py-2 md:py-3 rounded-xl text-white transition-all duration-150 hover:from-indigo-500/70 hover:to-purple-500/70 bg-gradient-to-r text-xs md:text-base from-indigo-500 to-purple-500 font-medium flex gap-2 items-center ease-in-out' type="button">
                    <span className='rounded-full flex justify-center items-center bg-white p-0.5'>
                      {account.ensAvatar ? (
                        <Image src={account.ensAvatar} alt="avatar" width={20} height={20} />
                      ) : (
                        <div className='w-4 h-4 md:w-5 md:h-5 rounded-full' style={{ background: avatarGradient }}>
                        </div>
                      )}
                    </span>
                    <span className='hidden sm:inline'>{account.displayName}</span>
                    <ChevronDown strokeWidth={2.5} width={20} height={20} className='w-4 h-4 md:w-5 md:h-5' />
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
