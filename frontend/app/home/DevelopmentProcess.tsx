'use client'
import { Timeline } from "@/common/components/molecules";

export const DevelopmentProcess = () => {
  const data = [
    {
      title: "Ideation",
      content: (
        <div>
          <p className="text-neutral-200 text-sm md:text-lg font-normal">
          Conceptualize Your Web3 Idea
          </p>
        </div>
      ),
    },
    {
      title: "App Development",
      content: (
        <div>
          <p className="text-neutral-200 text-sm md:text-lg font-normal">
            Unleash your creativity with your prompts and transform text into functional applications using Claude AI
          </p>
        </div>
      ),
    },
    {
      title: "Funding",
      content: (
        <div>
          <p className="text-neutral-200 text-sm md:text-lg font-normal">
            Enhance your project's visibility by issuing a token, allowing others to discover and purchase your tokens
          </p>
        </div>
      ),
    },
    {
      title: "Strategize",
      content: (
        <div>
          <p className="text-neutral-200 text-sm md:text-lg font-normal">
            Receive guidance on enhancing your networking and marketing to achieve excellence
          </p>
        </div>
      ),
    },
  ];
  return (
    <section className="md:py-12 px-4">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-white border-b border-white border-opacity-10 pb-4">Development Process</h2>
        <Timeline data={data} />
      </div>
    </section>
  );
};
