import Link from "next/link"
import { ReactNode } from "react";

export const LinkStyled = ({
  href,
  children,
} : {
  href: string;
  children: ReactNode;
}) => {
  return (
    <Link href={href} className="text-gray-300 hover:text-white hover:font-medium px-4">{children}</Link>
  )
}
