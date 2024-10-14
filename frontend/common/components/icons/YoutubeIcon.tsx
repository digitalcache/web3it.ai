import type { SVGProps } from "react";

export const YoutubeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    {...props}
  >
    <g fillRule="evenodd" clipPath="url(#a_youtube)" clipRule="evenodd">
      <path
        fill="url(#b_youtube)"
        d="M32 16c0-8.83-7.17-16-16-16S0 7.17 0 16s7.17 16 16 16 16-7.17 16-16Zm-8.186-6.582c.86.23 1.538.908 1.768 1.768C26 12.746 26 16 26 16s0 3.254-.418 4.814a2.505 2.505 0 0 1-1.768 1.768C22.254 23 16 23 16 23s-6.254 0-7.814-.418a2.505 2.505 0 0 1-1.768-1.768C6 19.254 6 16 6 16s0-3.254.418-4.814c.23-.86.908-1.538 1.768-1.768C9.746 9 16 9 16 9s6.254 0 7.814.418Z"
      />
      <path
        className="group-hover:fill-white fill-black"
        d="M25.582 11.187a2.505 2.505 0 0 0-1.768-1.769C22.254 9 16 9 16 9s-6.254 0-7.814.418c-.86.23-1.538.907-1.768 1.769C6 12.747 6 16 6 16s0 3.254.418 4.814c.23.86.908 1.538 1.768 1.768C9.746 23 16 23 16 23s6.254 0 7.814-.418a2.503 2.503 0 0 0 1.768-1.768C26 19.254 26 16 26 16s0-3.254-.418-4.813Z"
      />
      <path fill="url(#c_youtube)" d="M14 13v6l5.196-3L14 13Z" />
    </g>
    <defs>
      <linearGradient
        id="b_youtube"
        x1={16}
        x2={16}
        y1={0}
        y2={32}
        gradientUnits="userSpaceOnUse"
      >
        <stop />
        <stop offset={1} />
      </linearGradient>
      <linearGradient
        id="c_youtube"
        x1={16.598}
        x2={16.598}
        y1={13}
        y2={19}
        gradientUnits="userSpaceOnUse"
      >
        <stop />
        <stop offset={1} />
      </linearGradient>
    </defs>
  </svg>
)
