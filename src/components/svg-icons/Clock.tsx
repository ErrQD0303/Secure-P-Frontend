import { SVGProps } from "react";
import { JSX } from "react/jsx-runtime";

const SvgComponent = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={10}
    height={10}
    fill="none"
    {...props}
  >
    <g
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      clipPath="url(#a)"
    >
      <path d="M5 2.083V5h2.917" />
      <path d="M5 9.583A4.583 4.583 0 1 0 5 .417a4.583 4.583 0 0 0 0 9.166Z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h10v10H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgComponent;
