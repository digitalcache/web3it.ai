const ProcessStep = ({ 
  number, 
  title, 
  description,
}: any) => (
  <div className="text-center">
    <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
      {number}
    </div>
    <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

export const DevelopmentProcess = () => {
  const steps = [
    { 
      title: "Ideation", 
      description: "Develop your web3 project idea",
    },
    { 
      title: "AI Assistance", 
      description: "Use Claude AI for frontend development",
    },
    { 
      title: "Crowdfunding", 
      description: "List your project for investment",
    },
    { 
      title: "Development", 
      description: "Build and iterate on your project",
    },
  ];
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-white border-b border-white border-opacity-10 pb-4">Development Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <ProcessStep key={index} number={index + 1} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
};
