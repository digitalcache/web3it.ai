import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime"
import { IdeaType } from "@/common/types";
import lang from '@/common/lang';
import { TransferType } from './types';

const { ideaPage: ideaPageCopy } = lang

dayjs.extend(relativeTime)

export const TradeTable = ({
  idea,
  transfers,
}: {
  idea: IdeaType;
  transfers: Array<TransferType> | [];
}) => {
  return (
    <div>
      <div className="mb-2 md:mt-4 text-neutral-100 font-semibold text:lg lg:text-xl">
        {ideaPageCopy.checkTransHeading} {idea?.name}
      </div>
      <table className="w-full text-sm text-left text-gray-400 rtl:text-right rounded-xl overflow-hidden">
        <thead className="text-xs bg-purple-700 text-white">
          <tr>
            <th scope="col" className="px-6 py-3 font-semibold">
              {ideaPageCopy.transactionsTable.columnOne}
            </th>
            <th scope="col" className="px-6 py-3 font-semibold">
              {ideaPageCopy.transactionsTable.columnTwo}
            </th>
            <th scope="col" className="hidden lg:block px-6 py-3 font-semibold">
              {ideaPageCopy.transactionsTable.columnThree}
            </th>
            <th scope="col" className="px-6 py-3 font-semibold">
              {ideaPageCopy.transactionsTable.columnFour}
            </th>
          </tr>
        </thead>
        <tbody>
          {transfers?.length ? transfers.map((transfer) => (
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
                  href={`https://polygonscan.com//address/${transfer.to_address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {transfer.to_address.slice(2, 7)}
                </a>
              </th>
              <th className="px-6 py-4 font-normal">
                {parseFloat(transfer.value_decimal).toFixed(0)}
              </th>
              <th className="hidden lg:block px-6 py-4 font-normal first-letter:capitalize">
                {dayjs().to(dayjs(transfer.block_timestamp))}
              </th>
              <th className="px-6 py-4 font-medium hover:underline">
                <a
                  className="text-white"
                  href={`https://polygonscan.com/tx/${transfer.transaction_hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {transfer.transaction_hash.slice(2, 7)}
                </a>
              </th>
            </tr>
          )) : null}
        </tbody>
      </table>
    </div>
  );
};
