'use client'

import { routes } from '@/common/routes';
import { Masonry } from "masonic";
import {
  Button, Loader,
} from '@/common/components/atoms';
import { Boxes } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Token } from '@/common/components/molecules';
import { useGetIdeas } from './useGetIdeas';

export const TrendingProjects = () => {
  const router = useRouter()
  const {
    ideas,
    isLoading,
    columnCount,
  } = useGetIdeas()

  return (
    ideas.length ?
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className='flex justify-between border-b border-white border-opacity-10 mb-6 md:mb-12 pb-2 md:pb-4'>
            <h2 className="text-xl md:text-3xl font-bold text-white">Trending Ideas</h2>
            <Button size="sm" onClick={() => router.push(routes.viewProjectsPath)} variant="secondary" className="flex gap-2 py-1 !px-2 md:!px-4 md:py-2.5 from-indigo-500 to-purple-500 hover:bg-gradient-to-r">
              <Boxes />
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
      </section> : null
  );
};
