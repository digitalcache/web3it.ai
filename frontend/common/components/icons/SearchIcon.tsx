import type { SVGProps } from "react";

export const SearchIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="currentColor"
    {...props}
  >
    <path
      fill="url(#a_search)"
      d="M23.354 23.354a2.155 2.155 0 0 1-3.076 0L16.624 19.7a12.124 12.124 0 0 0 3.076-3.076l3.654 3.654a2.154 2.154 0 0 1 0 3.076Z"
    />
    <path
      fill="url(#b_search)"
      d="M9.817 0a9.817 9.817 0 1 0 0 19.634A9.817 9.817 0 0 0 9.817 0Zm0 5.454a4.363 4.363 0 0 0-4.363 4.363 1.09 1.09 0 1 1-2.182 0 6.551 6.551 0 0 1 6.545-6.545 1.09 1.09 0 1 1 0 2.182Z"
    />
    <defs>
      <linearGradient
        id="a_search"
        x1={12}
        x2={12}
        y1={0}
        y2={24}
        gradientUnits="userSpaceOnUse"
      >
        <stop />
        <stop offset={1} />
      </linearGradient>
      <linearGradient
        id="b_search"
        x1={12}
        x2={12}
        y1={0}
        y2={24}
        gradientUnits="userSpaceOnUse"
      >
        <stop />
        <stop offset={1} />
      </linearGradient>
    </defs>
  </svg>
)
