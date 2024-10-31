'use client'

import { routes } from '@/common/routes';
import { Masonry } from "masonic";
import {
  Loader,
} from '@/common/components/atoms';
import { Boxes } from 'lucide-react';
import { Token } from '@/common/components/molecules';
import Link from 'next/link';
import lang from '@/common/lang';
import { useGetIdeas } from './useGetIdeas';

const { homePage: homePageCopy } = lang

export const TrendingProjects = () => {
  const {
    ideas,
    isLoading,
    columnCount,
  } = useGetIdeas()
  return (
    <>
      {isLoading && <Loader />}
      {ideas.length ?
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className='flex justify-between border-b border-white border-opacity-10 mb-6 md:mb-12 pb-2 md:pb-4'>
              <h2 className="text-xl md:text-3xl font-semibold text-white">{homePageCopy.trendingIdeas}</h2>
              <Link href={routes.viewProjectsPath} prefetch={true} className="flex gap-2 text-white hover:text-indigo-400">
                <Boxes width={32} height={32} className="w-6 h-6 md:w-8 md:h-8" strokeWidth={1} />
              </Link>
            </div>
            {isLoading ? (
              <Loader />
            ) : (
              <div className="">
                <Masonry
                  columnCount={columnCount}
                  columnGutter={16}
                  rowGutter={16}
                  items={ideas}
                  render={Token}
                />
              </div>
            )}
          </div>
        </section> : null}
    </>
  );
};
