import {
  useState,
} from 'react';
import { PlaceholderAndVanishInput } from '@/common/components/atoms';
import { MultiStepLoader } from '@/common/components/molecules';

export const Prompt = ({

}) => {
  const [loading, setLoading] = useState(false);
  const placeholders = [
    "Create the next Decentralized Social Media Platform",
    "Create an AI-Driven Marketplace for Digital Assets",
    "Create a DAO Management Platform",
    "Create a Blockchain-Based E-Learning Platform",
    "Create a Smart Contract Development Assistant",
  ];

  const loadingStates = [
    {
      text: "Idea Conceptualization",
    },
    {
      text: "Planning and Design",
    },
    {
      text: "Choosing the Technology Stack",
    },
    {
      text: "Setting Up the Development Environment",
    },
    {
      text: "Developing the Frontend",
    },
    {
      text: "Developing the Backend",
    },
    {
      text: "Integration and Testing",
    },
    {
      text: "Optimizing and Deploying",
    },
  ];

  const handleChange = () => {
  }
  const onSubmit = () => {
    setLoading(true)
  }
  return (
    <div className='mt-8 w-full max-w-[640px]'>
      <MultiStepLoader
        loadingStates={loadingStates}
        loading={loading}
        duration={2000}
      />
      <PlaceholderAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </div>
  )
}
