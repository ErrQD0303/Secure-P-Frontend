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
      d="M14 5.25v-3.5H0v3.5c.963 0 1.75.787 1.75 1.75S.963 8.75 0 8.75v3.5h14v-3.5c-.963 0-1.75-.787-1.75-1.75s.787-1.75 1.75-1.75Zm-4.375 3.5h-5.25v-3.5h5.25v3.5Z"
    />
  </svg>
);
export default SvgComponent;
