'use client'
import { Button } from "@/common/components/atoms"
import { routes } from "@/common/routes"
import { useRouter } from "next/navigation"

export const CreateProject = () => {
  const router = useRouter()
  return(
    <>
      <Button size="md" onClick={() => router.push(routes.createProjectPath)} variant="primary" className="bg-gradient-to-r from-indigo-500 to-purple-500">
        Create a project
      </Button>
      <Button onClick={() => router.push(routes.viewProjectsPath)} size="md" variant="secondary" className="ring-1 ring-white ring-inset hover:ring-0 from-indigo-500 to-purple-500 hover:bg-gradient-to-r">
        Explore projects
      </Button>
    </>
  )
}
