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
      d="M11.174.07a.438.438 0 0 0-.418-.03L6.03 2.186H3.062a3.062 3.062 0 1 0 0 6.125H6.03l4.725 2.149a.438.438 0 0 0 .62-.399V.437a.437.437 0 0 0-.2-.368ZM12.25 3.5V7a1.75 1.75 0 0 0 0-3.5ZM5.798 9.187H3.271l1.482 3.644a1.166 1.166 0 0 0 2.163-.868L5.798 9.187Z"
    />
  </svg>
);
export default SvgComponent;
