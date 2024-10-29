'use client'
import { Button } from "@/common/components/atoms"
import lang from "@/common/lang"
import { routes } from "@/common/routes"
import {
  PackagePlus,
  PiggyBank,
} from "lucide-react"
import { useRouter } from "next/navigation"

const { homePage: homePageCopy } = lang


export const CreateProject = () => {
  const router = useRouter()
  return (
    <>
      <Button
        size="md"
        onClick={() => router.push(routes.newIdeaPath)}
        variant="primary"
        className="transition-all gap-2 duration-150 hover:from-indigo-500/70 hover:to-purple-500/70 bg-gradient-to-r from-indigo-500 to-purple-500 font-medium"
      >
        {homePageCopy.fundButtonLabel}
        <PiggyBank strokeWidth={1.5} />
      </Button>
      <Button
        onClick={() => router.push(routes.createProjectPath)}
        size="md"
        variant="secondary"
        className="ring-1 ring-white gap-2 ring-inset hover:ring-0 from-indigo-500 to-purple-500 hover:bg-gradient-to-r font-medium"
      >
        {homePageCopy.generateButtonLabel}
        <PackagePlus strokeWidth={1.5} />
      </Button>
    </>
  )
}
