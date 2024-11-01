import { ReactNode } from "react";
import { Header } from "@/common/components/organisms";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Explore top ideas and grab early-stage investment opportunities on our platform.',
  alternates: {
    canonical: '/ideas',
  },
}

export default function Layout ({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="relative">
      <Header />
      {children}
    </div>
  )
}
