'use client'
import {
  useEffect,
  useState,
} from "react";
import Link from "next/link";
import { routes } from "@/common/routes";
import { useRouter } from "next/navigation";
import { LogoIcon } from "../../icons";
import { LinkStyled } from "../../atoms";
import { Button } from "../../atoms/button";
import { Search } from "lucide-react";

export const Header = ({
  links,
} : {
  links: boolean
}) => {
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)

  const handleScroll = () => {
    if (window.pageYOffset >= 50) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
  }
  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all px-4 duration-150 ${isScrolled ? "bg-[#1D2144] bg-opacity-70 backdrop-blur-sm" : ""}`}>
      <div className="container mx-auto py-3 flex items-center justify-between">
        <Link href={routes.homePath} className="">
          <LogoIcon />
        </Link>
        {links && (
          <>
            <div className="hidden md:flex justify-center items-center space-x-4 flex-1">
              <LinkStyled href={routes.viewProjectsPath}>Ideas</LinkStyled>
              <LinkStyled href={"#"}>Team</LinkStyled>
              <LinkStyled href={"#"}>About Us</LinkStyled>
            </div>
            <div className="flex">
              <div className="text-white flex justify-center items-center md:mr-4 cursor-pointer">
                <Search />
              </div>
              <Button onClick={() => router.push(routes.createProjectPath)} size="sm" variant="secondary" className="hidden lg:block ring-1 ring-white ring-inset hover:ring-0 from-indigo-500 to-purple-500 hover:bg-gradient-to-r">
                Develop a new idea
              </Button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};
