import {
  useState,
} from 'react';
import { PlaceholderAndVanishInput } from '@/common/components/atoms';
import { MultiStepLoader } from '@/common/components/molecules';
import {
  promptLoadingStates,
  promptPlaceholders,
} from '@/common/constants';
import toast from 'react-hot-toast';
import { generate } from '../actions';
import { IntefaceAIDTO } from './types';
import lang from '@/common/lang';
// import aiResponse from '@/utils/ai_sample_response.json';

const { generateIdea: generateIdeaCopy } = lang

export const Prompt = ({
  setGeneratedIdea,
} : {
  setGeneratedIdea: (value: IntefaceAIDTO) => void;
}) => {
  const [input, setInput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (value: string) => {
    setInput(value)
  }
  const handleSubmit = async () => {
    if (input?.length) {
      try {
        setIsGenerating(true)
        // setGeneratedIdea(aiResponse)
        const res = await generate(input);
        setGeneratedIdea({
          ideaName: res.ideaName,
          ideaDescription: res.ideaDescription || '',
          ideaLandingPage: res.ideaLandingPage || '',
          ideaLogo: res.ideaLogo || '',
          ideaTicker: res.ideaTicker || '',
        })
      } catch (error) {
        toast.error(generateIdeaCopy.generateError)
        console.error(error)
      } finally {
        setIsGenerating(false)
      }
    }
  }
  return (
    <div className='mt-8 w-full max-w-[640px]'>
      <MultiStepLoader
        loadingStates={promptLoadingStates}
        loading={isGenerating}
        duration={2000}
      />
      <PlaceholderAndVanishInput
        placeholders={promptPlaceholders}
        onChange={handleInputChange}
        input={input}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
