import * as React from "react";
const SvgComponent = ({
  width,
  height,
  ...props
}: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width || 14}
    height={height || 14}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M7 7a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM7 8.167c-3.938 0-5.833 2.457-5.833 3.888v.778A1.167 1.167 0 0 0 2.333 14h9.334a1.167 1.167 0 0 0 1.166-1.167v-.778c0-1.431-1.896-3.888-5.833-3.888Z"
    />
  </svg>
);
export default SvgComponent;
