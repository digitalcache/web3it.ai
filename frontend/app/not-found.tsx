
import React from 'react'
import Link from 'next/link'
import { routes } from '@/common/routes'
import lang from '@/common/lang';

const {
  notFound: notFoundCopy,
} = lang

export default function NotFound () {
  return (
    <div className="min-h-screen w-full px-4 md:px-16 flex items-center justify-center py-8 pt-16 md:pt-48">
      <div className=" flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg ">
        <video src="/404.webm" width={373} height={163} autoPlay loop muted className='mb-4'/>
        <p className="text-xl md:text-2xl font-semibold tracking-wider text-white mt-4 text-center text-text-dark">{notFoundCopy.heading}</p>
        <p className="text-xs md:text-base text-gray-500 mt-4 text-center">{notFoundCopy.subHeading1}</p>
        <p className="text-xs md:text-base text-gray-500 pb-4 border-b-2 text-center">{notFoundCopy.subHeading2}</p>
        <Link href={routes.homePath} className="flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-gray-100 font-medium px-4 py-2 mt-6 rounded-xl transition duration-150" title="Return Home">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path>
          </svg>
          {notFoundCopy.buttonTitle}
        </Link>
      </div>
    </div>
  )
}
