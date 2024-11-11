import * as React from "react";
const SvgComponent = (
  props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    fill="none"
    {...props}
  >
    <path
      fill="#5E6A78"
      d="M7 0C3.15 0 0 3.15 0 7s3.15 7 7 7 7-3.15 7-7-3.15-7-7-7Zm.875 10.5h-1.75V6.125h1.75V10.5ZM7 5.25c-.525 0-.875-.35-.875-.875S6.475 3.5 7 3.5s.875.35.875.875-.35.875-.875.875Z"
    />
  </svg>
);
export default SvgComponent;
