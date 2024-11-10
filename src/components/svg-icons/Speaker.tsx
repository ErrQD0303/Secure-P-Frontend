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
      <path d="M19.156.87a.75.75 0 0 0-.716-.052L10.336 4.5H5.25a5.25 5.25 0 1 0 0 10.5h5.087l8.1 3.683A.75.75 0 0 0 19.5 18V1.5a.75.75 0 0 0-.344-.63ZM21 6.75v6a3 3 0 0 0 0-6ZM9.94 16.5H5.607l2.54 6.247a1.998 1.998 0 0 0 3.707-1.49L9.94 16.5Z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgComponent;
