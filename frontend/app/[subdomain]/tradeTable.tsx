import dayjs from 'dayjs';
import { IdeaType } from "@/common/types";
import { TransferType } from './types';


export const TradeTable = ({ 
  idea,
  transfers,
}: { 
  idea: IdeaType;
  transfers: Array<TransferType> | [];
}) => {
  
  return (
    <div>
      <div className="mb-2 mt-2 md:mt-8 text-neutral-200 font-semibold text:lg lg:text-xl">
        Check out ongoing trades on {idea?.name}
      </div>
      <table className="w-full text-sm text-left text-gray-400 rtl:text-right rounded-xl overflow-hidden">
        <thead className="text-xs bg-purple-700 text-white">
          <tr>
            <th scope="col" className="px-6 py-3">
              Account
            </th>
            <th scope="col" className="px-6 py-3">
              Value
            </th>
            <th scope="col" className="hidden lg:block px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Transaction
            </th>
          </tr>
        </thead>
        <tbody>
          {transfers.map((transfer) => (
            <tr
              className="odd:bg-zinc-900 text-sm even:bg-zinc-800 :not(:last-child):border-b border-gray-700"
              key={transfer.transaction_hash}
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium hover:underline"
              >
                <a
                  className="text-white"
                  href={`https://amoy.polygonscan.com/address/${transfer.to_address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {transfer.to_address.slice(2, 7)}
                </a>
              </th>
              <th className="px-6 py-4 font-normal">
                {parseFloat(transfer.value_decimal).toFixed(0)}
              </th>
              <th className="hidden lg:block px-6 py-4 font-normal">
                {dayjs(transfer.block_timestamp).format("DD MMM YY")}
              </th>
              <th className="px-6 py-4 font-medium hover:underline">
                <a
                  className="text-white"
                  href={`https://amoy.polygonscan.com/tx/${transfer.transaction_hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {transfer.transaction_hash.slice(2, 7)}
                </a>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
