import { useState } from "react";
import { v4 } from "uuid";
import { createClient } from '@/common/utils/supabase/client';
import { pinataUploadUrl } from "@/common/utils/network/endpoints";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { routes } from "@/common/routes";
import { IntefaceAIDTO } from "./types"
import lang from "@/common/lang";

const { generateIdea: { generateError } } = lang

export const useGenerateIdea = () => {
  const [isIdeaProcessing, setIsIdeaProcessing] = useState(false);
  const router = useRouter();
  const supabase = createClient();
  const handleTokenCreation = async (idea: IntefaceAIDTO) => {
    if (idea?.ideaLogo && idea?.ideaLandingPage) {
      try {
        setIsIdeaProcessing(true)
        const logoBlob = new Blob([idea.ideaLogo], {
          type: 'image/svg+xml',
        });
        const landingPageBlob = new Blob([idea.ideaLandingPage], {
          type: 'image/svg+xml',
        });

        const logoFormData = new FormData();
        const landingPageFormData = new FormData();

        const logoFile = new File([logoBlob], `${idea.ideaTicker}-logo`);
        const landingPageFile = new File([landingPageBlob], `${idea.ideaTicker}-landing-page`);

        logoFormData.set('file', logoFile);
        landingPageFormData.set('file', landingPageFile);

        const logoResponse = await fetch(pinataUploadUrl, {
          method: "POST",
          body: logoFormData,
        });
        const landingPageResponse = await fetch(pinataUploadUrl, {
          method: "POST",
          body: landingPageFormData,
        });
        const logoUrl = await logoResponse.json();
        const landingPageUrl = await landingPageResponse.json();

        const ideaData = {
          name: idea.ideaName,
          landingPage: landingPageUrl,
          logo: logoUrl,
          description: idea.ideaDescription,
          ticker: idea.ideaTicker,
          id: v4(),
        }

        await supabase
          .from('NewIdeas')
          .insert([ideaData])
          .select()
        router.push(`${routes.newIdeaPath}?ideaId=${ideaData.id}`)
      } catch (error) {
        toast.error(generateError);
      } finally {
        setIsIdeaProcessing(false);
      }
    }
  }

  return {
    handleTokenCreation,
    isIdeaProcessing,
  }
}
