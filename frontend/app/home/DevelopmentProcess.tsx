'use client'
import { Timeline } from "@/common/components/molecules";
import lang from "@/common/lang";

const { homePage: homePageCopy } = lang

export const DevelopmentProcess = () => {
  const data = [
    {
      title: homePageCopy.developmentProcess.stepOneTitle,
      content: (
        <div>
          <p className="text-neutral-200 text-sm md:text-lg font-normal">
            {homePageCopy.developmentProcess.stepOneInfo}
          </p>
        </div>
      ),
    },
    {
      title: homePageCopy.developmentProcess.stepTwoTitle,
      content: (
        <div>
          <p className="text-neutral-200 text-sm md:text-lg font-normal">
            {homePageCopy.developmentProcess.stepTwoInfo}
          </p>
        </div>
      ),
    },
    {
      title: homePageCopy.developmentProcess.stepThreeTitle,
      content: (
        <div>
          <p className="text-neutral-200 text-sm md:text-lg font-normal">
            {homePageCopy.developmentProcess.stepThreeInfo}
          </p>
        </div>
      ),
    },
    {
      title: homePageCopy.developmentProcess.stepFourTitle,
      content: (
        <div>
          <p className="text-neutral-200 text-sm md:text-lg font-normal">
            {homePageCopy.developmentProcess.stepFourInfo}
          </p>
        </div>
      ),
    },
  ];
  return (
    <section className="md:py-12 px-4 md:mb-12">
      <div className="container mx-auto">
        <h2 className="text-xl md:text-3xl font-semibold mb-4 md:mb-8 text-white border-b border-white border-opacity-10 pb-2 md:pb-4">{homePageCopy.developmentProcess.heading}</h2>
        <Timeline data={data} />
      </div>
    </section>
  );
};
