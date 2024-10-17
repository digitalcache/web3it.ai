'use client'
import {
  useEffect,
  useState,
} from "react";
import Link from "next/link";
import { routes } from "@/common/routes";
import { useRouter } from "next/navigation";
import {
  LogoIcon,
  SearchIcon,
} from "../../icons";
import { 
  ConnectButton, 
  LinkStyled,
} from "../../atoms";
import { Button } from "../../atoms/button";

export const Header = ({
  links,
} : {
  links: boolean
}) => {
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [navbarOpened, setNavbarOpened] = useState(false)

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

  const openNavbar = () => {
    setNavbarOpened(!navbarOpened)
  }

  const openPage = (value: string) => {
    setNavbarOpened(false)
    if (value) {
      router.push(value)
    }
  }
  return (
    <nav className={`fixed top-0 left-0 right-0 z-[70] transition-all px-4 duration-150 ${isScrolled ? "bg-yankees-blue bg-opacity-50 backdrop-blur-sm" : ""} ${navbarOpened ? "bg-yankees-blue bg-opacity-70 backdrop-blur-sm h-screen" : ""}`}>
      <div className="container mx-auto py-3 flex items-center justify-between">
        <Link href={routes.homePath} className="">
          <LogoIcon />
        </Link>
        <div className="hidden md:flex justify-center items-center space-x-4 flex-1 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
          <LinkStyled href={routes.viewProjectsPath}>Ideas</LinkStyled>
          <LinkStyled href={"#"}>Team</LinkStyled>
          <LinkStyled href={"#"}>About Us</LinkStyled>
        </div>
        {links && (
          <>
            <div className="flex lg:mr-0 gap-4">
              <div className="text-white flex justify-center items-center md:mr-4 cursor-pointer group">
                <SearchIcon className="buttonWithGradient" />
              </div>
              <ConnectButton />
              {/* <ConnectButton accountStatus="avatar" chainStatus="icon" /> */}
              {/* <Button size="sm" variant="secondary" className="hidden lg:block ring-1 py-2 ring-white ring-inset hover:ring-0 from-indigo-500 to-purple-500 hover:bg-gradient-to-r font-semibold">
                Connect wallet
              </Button> */}
              <div className={`lg:hidden`}>
                <div className={`${navbarOpened ? "rotate-90" : "rotate-0"} relative inline-block h-[20px] w-[20px] cursor-pointer [transition:all_0.3s_cubic-bezier(0.4,_0.01,_0.165,_0.99)]`}>
                  <button onClick={openNavbar} type="button" className={`w-[18px] h-[18px] relative block -mt-[10px] ${navbarOpened ? "ml-0.5" : "mx-[auto]"}  mb-[0] top-2/4`}>
                    <div className={`w-[22px] h-0.5 block relative bg-white pointer-events-none ${navbarOpened ? "[transition:all_0.4s_cubic-bezier(0.4,_0.01,_0.165,_0.99)] delay-200 translate-y-[4px] rotate-45" : "[transition:all_0.3s_cubic-bezier(0.4,_0.01,_0.165,_0.99)] delay-[0ms] translate-y-0 rotate-0"}`}></div>
                    <div className={`w-[22px] h-0.5 block relative bg-white pointer-events-none ${navbarOpened ? "[transition:all_0.4s_cubic-bezier(0.4,_0.01,_0.165,_0.99)] delay-200 translate-y-[3px] -rotate-45" : "[transition:all_0.3s_cubic-bezier(0.4,_0.01,_0.165,_0.99)] delay-[0ms] translate-y-[6px] rotate-0"}`}></div>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className={`absolute top-1/2 -translate-y-full h-auto left-0 w-full flex items-center justify-center flex-col`}>
        <ul className={`${navbarOpened ? "" : "hidden"} w-full pt-0 pb-[0] [list-style:none] px-4`}>
          <li className={`flex justify-center ${navbarOpened ? "scale-100 translate-y-0 opacity-100" : "scale-[1.15] -translate-y-[30px] opacity-0"} delay-[210ms] mt-[5px] [transition:transform_0.5s_cubic-bezier(0.4,_0.01,_0.165,_0.99),_opacity_0.6s_cubic-bezier(0.4,_0.01,_0.165,_0.99)]`}>
            <Button variant="primary" size="sm" type="button" onClick={() => openPage(routes.createProjectPath)} className="transition-all duration-150 hover:from-indigo-500/90 hover:to-purple-500/90 bg-gradient-to-r from-indigo-500 to-purple-500 w-full max-w-[400px]">Develop</Button>
          </li>
          <li className={`flex justify-center ${navbarOpened ? "scale-100 translate-y-0 opacity-100" : "scale-[1.15] -translate-y-[30px] opacity-0"} delay-[210ms] mt-4 [transition:transform_0.5s_cubic-bezier(0.4,_0.01,_0.165,_0.99),_opacity_0.6s_cubic-bezier(0.4,_0.01,_0.165,_0.99)]`}>
            <Button variant="primary" size="sm" type="button" onClick={() => openPage(routes.viewProjectsPath)} className="transition-all duration-150 hover:from-indigo-500/90 hover:to-purple-500/90 bg-gradient-to-r from-indigo-500 to-purple-500 w-full max-w-[400px]">Ideas</Button>
          </li>
          <li className={`flex justify-center ${navbarOpened ? "scale-100 translate-y-0 opacity-100" : "scale-[1.15] -translate-y-[30px] opacity-0"} delay-[140ms]  mt-4 [transition:transform_0.5s_cubic-bezier(0.4,_0.01,_0.165,_0.99),_opacity_0.6s_cubic-bezier(0.4,_0.01,_0.165,_0.99)]`}>
            <Button variant="primary" size="sm" type="button" onClick={() => openPage("")} className="transition-all duration-150 hover:from-indigo-500/90 hover:to-purple-500/90 bg-gradient-to-r from-indigo-500 to-purple-500 w-full max-w-[400px]">Team</Button>
          </li>
          <li className={`flex justify-center ${navbarOpened ? "scale-100 translate-y-0 opacity-100" : "scale-[1.15] -translate-y-[30px] opacity-0"} delay-[70ms] mt-4 [transition:transform_0.5s_cubic-bezier(0.4,_0.01,_0.165,_0.99),_opacity_0.6s_cubic-bezier(0.4,_0.01,_0.165,_0.99)]`}>
            <Button variant="primary" size="sm" type="button" onClick={() => openPage("")} className="transition-all duration-150 hover:from-indigo-500/90 hover:to-purple-500/90 bg-gradient-to-r from-indigo-500 to-purple-500 w-full max-w-[400px]">About us</Button>
          </li>
        </ul>
      </div>
    </nav>
  );
};
