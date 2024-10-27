'use client'
import { Button } from "@/common/components/atoms"
import { routes } from "@/common/routes"
import { 
  PackagePlus, 
  PiggyBank,
} from "lucide-react"
import { useRouter } from "next/navigation"

export const CreateProject = () => {
  const router = useRouter()
  return (
    <>
      <Button 
        size="md" 
        onClick={() => router.push(routes.newIdeaPath)} 
        variant="primary" 
        className="transition-all gap-2 duration-150 hover:from-indigo-500/90 hover:to-purple-500/90 bg-gradient-to-r from-indigo-500 to-purple-500 font-semibold"
      >
        Fund existing project
        <PiggyBank />
      </Button>
      <Button 
        onClick={() => router.push(routes.createProjectPath)} 
        size="md" 
        variant="secondary" 
        className="ring-1 ring-white gap-2 ring-inset hover:ring-0 from-indigo-500 to-purple-500 hover:bg-gradient-to-r font-semibold"
      >
        Develop a new idea
        <PackagePlus />
      </Button>
    </>
  )
}
