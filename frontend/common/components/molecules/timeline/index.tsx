"use client";
import {
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { 
  useEffect, useRef, useState,
} from "react";
 
interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}
 
export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
 
  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);
 
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 100%"],
  });
 
  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
 
  return (
    <div
      className="w-full"
      ref={containerRef}
    >
      <div className="mx-auto">
        <h2 className="md:text-xl mb-4 text-white font-medium max-w-4xl">
          Explore your journey with our app
        </h2>
        <p className="text-neutral-300 text-sm md:text-base">
          You can harness the power of AI to transform your ideas into a fully functional application
        </p>
      </div>
 
      <div ref={ref} className="relative mx-auto pb-12 md:pb-10">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-20 md:gap-10"
          >
            <div className="flex flex-col md:flex-row z-40 items-center top-40 self-start md:w-full lg:max-w-sm">
              <div className="h-8 absolute left-3 md:left-3 w-8 rounded-full bg-violets-are-blue flex items-center justify-center">
                <div className="h-2 w-2 rounded-full bg-white border border-blue-500 p-1.5" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-16 md:text-3xl font-bold text-neutral-300">
                {item.title}
              </h3>
            </div>
 
            <div className="relative pl-16 pr-4 md:pl-4 w-full flex flex-col justify-center">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-300">
                {item.title}
              </h3>
              {item.content}{" "}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-0 left-0 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};