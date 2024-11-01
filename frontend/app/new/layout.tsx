import { ReactNode } from "react";
import { Header } from "@/common/components/organisms";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Create new ideas and and fuel your startup ideas with blockchain crowdfunding',
  alternates: {
    canonical: '/new',
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
