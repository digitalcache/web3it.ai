import { ConnectButton as RainbowConnect } from '@rainbow-me/rainbowkit';
import { Button } from '../button';
import { ChevronDown } from 'lucide-react';

export const ConnectButton = () => {
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
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }

              return (
                <div className='flex gap-3'>
                  <button onClick={openAccountModal} className='px-3 py-2 rounded-lg text-sm text-white transition-all duration-150 hover:from-indigo-500/90 hover:to-purple-500/90 bg-gradient-to-r from-indigo-500 to-purple-500 font-semibold flex gap-2' type="button">
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ''}
                    <ChevronDown width={20} height={20} />
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