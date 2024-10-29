'use client'
import lang from "@/common/lang"
import { routes } from "@/common/routes"
import {
  PackagePlus,
  PiggyBank,
} from "lucide-react"
import Link from "next/link"

const { homePage: homePageCopy } = lang

export const CreateProject = () => {
  return (
    <>
      <Link href={routes.newIdeaPath} prefetch={true}
        className={`flex items-center justify-center text-white rounded-xl outline-none px-4 py-3 text-base
        disabled:cursor-not-allowed ease-in-out transition-all gap-2 duration-150 hover:from-indigo-500/70
        hover:to-purple-500/70 bg-gradient-to-r from-indigo-500 to-purple-500 font-medium`}
      >
        {homePageCopy.fundButtonLabel}
        <PiggyBank strokeWidth={1.5} />
      </Link>
      <Link href={routes.createProjectPath} prefetch={true}
        className={`flex items-center justify-center text-white rounded-xl outline-none
        transition-all duration-150 ease-in-out px-4 py-3 font-medium text-base ring-1 ring-white
        gap-2 ring-inset hover:ring-0 from-indigo-500 to-purple-500 hover:bg-gradient-to-r`}
      >
        {homePageCopy.generateButtonLabel}
        <PackagePlus strokeWidth={1.5} />
      </Link>
    </>
  )
}
