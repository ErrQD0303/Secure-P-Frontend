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
    <g clipPath="url(#a)">
      <path
        fill={innerFill ?? "#5E6A78"}
        d="M0 12c.003 1.364.24 2.716.7 4H13v-3l5 4-5 4v-3H1.624A11.983 11.983 0 0 0 23.3 8H11v3L6 7l5-4v3h11.376A11.99 11.99 0 0 0 0 12Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 24V0h24v24z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgComponent;
