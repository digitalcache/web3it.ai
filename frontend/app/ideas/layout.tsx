'use client'
import { ReactNode } from "react";
import { Header } from "@/common/components/organisms";

export default function Layout ({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="relative">
      <Header links={true} />
      {children}
    </div>
  )
}
