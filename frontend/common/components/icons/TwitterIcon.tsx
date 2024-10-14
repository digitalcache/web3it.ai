import type { SVGProps } from "react";

export const TwitterIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="currentColor"
    {...props}
  >
    <path
      fill="url(#a_twitter)"
      d="M32 16c0-8.83-7.17-16-16-16S0 7.17 0 16s7.17 16 16 16 16-7.17 16-16Z"
    />
    <path
      className="group-hover:fill-white fill-black"
      fillRule="evenodd"
      d="M12.883 23.246c7.08 0 10.951-5.867 10.951-10.951 0-.168 0-.335-.008-.495a7.901 7.901 0 0 0 1.924-1.995 7.829 7.829 0 0 1-2.211.606A3.849 3.849 0 0 0 25.23 8.28a7.79 7.79 0 0 1-2.442.935 3.85 3.85 0 0 0-6.657 2.634c0 .303.032.598.103.878a10.92 10.92 0 0 1-7.934-4.023 3.858 3.858 0 0 0-.519 1.932 3.83 3.83 0 0 0 1.716 3.2 3.78 3.78 0 0 1-1.74-.479v.048a3.853 3.853 0 0 0 3.09 3.776 3.833 3.833 0 0 1-1.74.063 3.843 3.843 0 0 0 3.591 2.675A7.74 7.74 0 0 1 7 21.506a10.724 10.724 0 0 0 5.883 1.74Z"
      clipRule="evenodd"
    />
    <defs>
      <linearGradient
        id="a_twitter"
        x1={16}
        x2={16}
        y1={0}
        y2={32}
        gradientUnits="userSpaceOnUse"
      >
        <stop />
        <stop offset={1} />
      </linearGradient>
    </defs>
  </svg>
)
