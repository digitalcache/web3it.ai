import {
  ChangeEvent,
  useState,
} from 'react';
import { PlaceholderAndVanishInput } from '@/common/components/atoms';
import { MultiStepLoader } from '@/common/components/molecules';
import {
  promptLoadingStates,
  promptPlaceholders,
} from '@/common/constants';
import { generate } from '../actions';
// import aiResponse from '@/utils/ai_sample_response.json';
import { IntefaceAIDTO } from './types';

export const Prompt = ({
  setGeneratedIdea,
} : {
  setGeneratedIdea: (value: IntefaceAIDTO) => void;
}) => {
  const [input, setInput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }
  const handleSubmit = async () => {
    if (input?.length) {
      try {
        setIsGenerating(true)
        // setGeneratedIdea(aiResponse)
        const res = await generate(input);
        setGeneratedIdea(res)
      } catch (error) {
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
      {/* <div className='text-neutral-500 text-right md:pr-8 text-xs mt-2'>4 attempts left</div> */}
    </div>
  )
}
