import * as React from "react";
const SvgComponent = ({
  innerFill,
  ...props
}: JSX.IntrinsicAttributes &
  React.SVGProps<SVGSVGElement> & { innerFill?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <g fill={innerFill ?? "#5E6A78"} clipPath="url(#a)">
      <path d="M10.65 23.25.15 3.75C-.15 3 0 2.1.75 1.65c.75-.3 1.65-.15 2.1.6l10.5 19.5c.3.75.15 1.65-.6 2.1-.75.3-1.65.15-2.1-.6ZM24 8.55c-4.2 3.75-9.3-.9-12.45 4.65l-4.8-8.55C9.9-.9 15 3.75 19.05 0L24 8.55Z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgComponent;
