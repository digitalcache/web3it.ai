'use client'
import {
  useEffect,
  useState,
} from "react";
import { routes } from "@/common/routes";
import { PackageSearch } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  LogoIcon,
} from "../../icons";
import {
  ConnectButton,
  Button,
} from "../../atoms";
import { SearchIdeas } from "../searchIdeas";

export const Header = () => {
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [navbarOpened, setNavbarOpened] = useState(false)
  const [searchEnabled, setSearchEnabled] = useState(false)

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

  // const openNavbar = () => {
  //   setNavbarOpened(!navbarOpened)
  // }

  const openPage = (value: string) => {
    setNavbarOpened(false)
    if (value) {
      router.push(value)
    }
  }
  return (
    <>
      <SearchIdeas
        searchEnabled={searchEnabled}
        setSearchEnabled={setSearchEnabled}
      />
      <nav className={`fixed top-0 left-0 right-0 z-[70] transition-all px-4 duration-150 ${isScrolled ? "bg-yankees-blue bg-opacity-50 backdrop-blur-sm" : ""} ${navbarOpened ? "bg-yankees-blue bg-opacity-70 backdrop-blur-sm h-screen" : ""}`}>
        <div className="container mx-auto py-3 flex items-center justify-between">
          <Link href={routes.homePath} prefetch={true} replace className="flex md:gap-2 items-center text-white font-semibold md:text-xl">
            <LogoIcon className="scale-75 md:scale-100"/>
            <span className="text-white">Web3It.AI</span>
          </Link>
          <>
            <div className="flex lg:mr-0 gap-4 items-center">
              {/* <button onClick={() => setSearchEnabled(true)} className="text-white flex justify-center items-center md:mr-4 cursor-pointer group">
                <SearchIcon className="buttonWithGradient" />
              </button> */}
              <Button size="sm" onClick={() => setSearchEnabled(true)} variant="secondary" className="flex gap-2 py-1 !px-2 md:!px-4 md:py-2.5 hover:!text-indigo-400">
                <PackageSearch width={32} height={32} className="w-6 h-6 md:w-8 md:h-8" strokeWidth={1.5} />
              </Button>
              <ConnectButton />
              {/* <div className={`lg:hidden`}>
                <div className={`${navbarOpened ? "rotate-90" : "rotate-0"} relative inline-block h-[20px] w-[20px] cursor-pointer [transition:all_0.3s_cubic-bezier(0.4,_0.01,_0.165,_0.99)]`}>
                  <button onClick={openNavbar} type="button" className={`w-[18px] h-[18px] relative block -mt-[10px] ${navbarOpened ? "ml-0.5" : "mx-[auto]"}  mb-[0] top-2/4`}>
                    <div className={`w-[22px] h-0.5 block relative bg-white pointer-events-none ${navbarOpened ? "[transition:all_0.4s_cubic-bezier(0.4,_0.01,_0.165,_0.99)] delay-200 translate-y-[4px] rotate-45" : "[transition:all_0.3s_cubic-bezier(0.4,_0.01,_0.165,_0.99)] delay-[0ms] translate-y-0 rotate-0"}`}></div>
                    <div className={`w-[22px] h-0.5 block relative bg-white pointer-events-none ${navbarOpened ? "[transition:all_0.4s_cubic-bezier(0.4,_0.01,_0.165,_0.99)] delay-200 translate-y-[3px] -rotate-45" : "[transition:all_0.3s_cubic-bezier(0.4,_0.01,_0.165,_0.99)] delay-[0ms] translate-y-[6px] rotate-0"}`}></div>
                  </button>
                </div>
              </div> */}
            </div>
          </>
        </div>

        <div className={`absolute top-1/2 -translate-y-full h-auto left-0 w-full flex items-center justify-center flex-col`}>
          <ul className={`${navbarOpened ? "" : "hidden"} w-full pt-0 pb-[0] [list-style:none] px-4`}>
            <li className={`flex justify-center ${navbarOpened ? "scale-100 translate-y-0 opacity-100" : "scale-[1.15] -translate-y-[30px] opacity-0"} delay-[210ms] mt-[5px] [transition:transform_0.5s_cubic-bezier(0.4,_0.01,_0.165,_0.99),_opacity_0.6s_cubic-bezier(0.4,_0.01,_0.165,_0.99)]`}>
              <Button variant="primary" size="sm" type="button" onClick={() => openPage(routes.createProjectPath)} className="transition-all duration-150 hover:from-indigo-500/70 hover:to-purple-500/70 bg-gradient-to-r from-indigo-500 to-purple-500 w-full max-w-[400px]">Develop</Button>
            </li>
            <li className={`flex justify-center ${navbarOpened ? "scale-100 translate-y-0 opacity-100" : "scale-[1.15] -translate-y-[30px] opacity-0"} delay-[210ms] mt-4 [transition:transform_0.5s_cubic-bezier(0.4,_0.01,_0.165,_0.99),_opacity_0.6s_cubic-bezier(0.4,_0.01,_0.165,_0.99)]`}>
              <Button variant="primary" size="sm" type="button" onClick={() => openPage(routes.viewProjectsPath)} className="transition-all duration-150 hover:from-indigo-500/70 hover:to-purple-500/70 bg-gradient-to-r from-indigo-500 to-purple-500 w-full max-w-[400px]">Ideas</Button>
            </li>
            <li className={`flex justify-center ${navbarOpened ? "scale-100 translate-y-0 opacity-100" : "scale-[1.15] -translate-y-[30px] opacity-0"} delay-[140ms]  mt-4 [transition:transform_0.5s_cubic-bezier(0.4,_0.01,_0.165,_0.99),_opacity_0.6s_cubic-bezier(0.4,_0.01,_0.165,_0.99)]`}>
              <Button variant="primary" size="sm" type="button" onClick={() => openPage("")} className="transition-all duration-150 hover:from-indigo-500/70 hover:to-purple-500/70 bg-gradient-to-r from-indigo-500 to-purple-500 w-full max-w-[400px]">Team</Button>
            </li>
            <li className={`flex justify-center ${navbarOpened ? "scale-100 translate-y-0 opacity-100" : "scale-[1.15] -translate-y-[30px] opacity-0"} delay-[70ms] mt-4 [transition:transform_0.5s_cubic-bezier(0.4,_0.01,_0.165,_0.99),_opacity_0.6s_cubic-bezier(0.4,_0.01,_0.165,_0.99)]`}>
              <Button variant="primary" size="sm" type="button" onClick={() => openPage("")} className="transition-all duration-150 hover:from-indigo-500/70 hover:to-purple-500/70 bg-gradient-to-r from-indigo-500 to-purple-500 w-full max-w-[400px]">About us</Button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};
