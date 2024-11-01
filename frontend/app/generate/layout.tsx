import { ReactNode } from "react";
import { Header } from "@/common/components/organisms";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Create website mockups with AI and launch ideas with unique tokens',
  alternates: {
    canonical: '/generate',
  },
}

export default function Layout ({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}
