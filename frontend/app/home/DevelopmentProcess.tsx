'use client'
import { Timeline } from "@/common/components/molecules";

export const DevelopmentProcess = () => {
  const data = [
    {
      title: "Ideation",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
          Develop your web3 project idea
          </p>
        </div>
      ),
    },
    {
      title: "AI Assistance",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            You can use get creative with your prompts and translate text to working app using Claude AI
          </p>
        </div>
      ),
    },
    {
      title: "Crowdfunding",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
            List down by creating a token for your project so other's can view and buy tokens
          </p>
        </div>
      ),
    },
    {
      title: "Strategize",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
            Get support on how to get your networking and marketing top of the line.
          </p>
        </div>
      ),
    },
  ];
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-white border-b border-white border-opacity-10 pb-4">Development Process</h2>
        <Timeline data={data} />
      </div>
    </section>
  );
};
