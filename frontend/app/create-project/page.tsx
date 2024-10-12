'use client'

import { useEffect, useState } from "react";
import {
  Sun,
  Sunrise,
  Sunset,
} from "lucide-react";
import { BackgroundBeamsWithCollision } from "@/common/components/molecules";
import { Prompt } from "./Prompt";

export default function Home() {
  const [greeting, setGreeting] = useState("Good morning")
  useEffect(() => {
    const today = new Date()
    const curHr = today.getHours()
    if (curHr < 12) {
      setGreeting("Good morning")
    } else if (curHr < 18) {
      setGreeting("Good afternoon")
    } else {
      setGreeting("Good evening")
    }
  }, [])
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
      <BackgroundBeamsWithCollision className="absolute top-0 left-0 pointer-events-none">
        <div className="w-full"></div>
      </BackgroundBeamsWithCollision>
      <div className="pt-72 pb-12 px-4">
        <div className="container mx-auto flex justify-center flex-col items-center">
          <h2 className="text-white font-medium text-2xl flex items-center gap-2">
            {getIcon()}
            {greeting}!
          </h2>
          <Prompt />
        </div>
      </div>
    </div>
  );
}
