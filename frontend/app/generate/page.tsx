'use client'
import { useState } from "react";
import {
  Sun,
  Sunrise,
  Sunset,
} from "lucide-react";
import { Transition } from "@headlessui/react";
import { ShootingStars } from "@/common/components/molecules";
import { ClaudeAIIcon } from "@/common/components/icons";
import {
  Button, Loader,
} from "@/common/components/atoms";
import { Prompt } from "./Prompt";
import { PreviewLandingPage } from "./previewLandingPage";
import { useGreeting } from "./useGreeting";
import { useGenerateIdea } from "./useGenerateIdea";
import { IntefaceAIDTO } from "./types";

export default function Home () {
  const [generatedIdea, setGeneratedIdea] = useState<IntefaceAIDTO>(null);
  const {
    greeting,
  } = useGreeting()

  const {
    handleTokenCreation,
    isIdeaProcessing,
  } = useGenerateIdea()

  const isWebsiteGenerated = Boolean(generatedIdea?.ideaLandingPage)
  const isIdeaGenerated = Boolean(generatedIdea)

  const getIcon = () => {
    if (greeting === "Good morning") {
      return <Sunrise />
    } else if (greeting === "Good afternoon") {
      return <Sun />
    } else {
      return <Sunset />
    }
  }

  return (
    <div className="min-h-screen">
      <div className="hidden md:block pointer-events-none">
        <ShootingStars />
      </div>
      {isIdeaProcessing && <Loader />}
      {!isIdeaGenerated && <div className="text-white absolute bottom-2 right-2 flex gap-1 items-center font-medium text-xs md:text-sm">powered by <ClaudeAIIcon /></div>}
      <div className={`${generatedIdea ? "pt-16" : "pt-72"} delay-300 transition-all ease-in-out duration-300 pb-12 px-4`}>
        <div className="container mx-auto flex justify-center flex-col items-center">
          <Transition
            show={!isIdeaGenerated}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <h2 className="text-white font-medium text-2xl flex items-center gap-2">
              {getIcon()}
              {greeting}!
            </h2>
          </Transition>
          {isIdeaGenerated && (
            <>
              <div className="text-neutral-300 mt-8 text-xl md:text-3xl font-semibold text-center mb-4 md:mb-6">Continue to Create Token</div>
              <Button size="md" onClick={() => handleTokenCreation(generatedIdea)} variant="primary" type="button" className="transition-all gap-2 duration-150 hover:from-indigo-500/90 hover:to-purple-500/90 bg-gradient-to-r from-indigo-500 to-purple-500 font-semibold">
                Proceed
              </Button>
              <div className="mt-5 text-sm md:text-base text-neutral-300 border-t pt-5 border-white border-opacity-10">
                Or keep enhancing the idea
              </div>
            </>
          )}
          <Prompt setGeneratedIdea={setGeneratedIdea} />
          <Transition
            show={isWebsiteGenerated}
            enter="transition-all duration-150"
            enterFrom="opacity-0 scale-0"
            enterTo="opacity-100 scale-100"
            leave="transition-all duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-0"
            className="w-full mt-8"
            style={{ perspective: "1000px" }}
          >
            <PreviewLandingPage
              image={generatedIdea?.ideaLandingPage || ''}
            />
          </Transition>
        </div>
      </div>
    </div>
  );
}
