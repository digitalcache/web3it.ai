'use client'
import { ReactNode } from "react";
import { Header } from "@/common/components/organisms";
import { Toaster } from "@/common/components/molecules";

export default function Layout ({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div>
      <Header />
      {children}
      <Toaster />
    </div>
  )
}
