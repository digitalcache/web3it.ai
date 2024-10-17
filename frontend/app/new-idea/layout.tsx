'use client'
import { ReactNode } from "react";
import { Toaster } from "@/common/components/molecules";
import { Header } from "@/common/components/organisms";

export default function Layout ({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div>
      <Header links={true} />
      {children}
      <Toaster />
    </div>
  )
}
