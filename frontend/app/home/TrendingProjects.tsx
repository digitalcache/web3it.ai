'use client'

import { routes } from '@/common/routes';
import { Masonry } from "masonic";
import {
  Button, Loader,
} from '@/common/components/atoms';
import { Boxes } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Token } from '@/common/components/molecules';
import lang from '@/common/lang';
import { useGetIdeas } from './useGetIdeas';

const { homePage: homePageCopy } = lang

export const TrendingProjects = () => {
  const router = useRouter()
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
              <Button size="sm" onClick={() => router.push(routes.viewProjectsPath)} variant="secondary" className="flex gap-2 py-1 !px-2 md:!px-4 md:py-2.5 hover:!text-indigo-400">
                <Boxes width={32} height={32} className="w-6 h-6 md:w-8 md:h-8" strokeWidth={1} />
              </Button>
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
