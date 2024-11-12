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
    <g fill="#5E6A78" clipPath="url(#a)">
      <path d="M4.667 14a.577.577 0 0 1-.34-.11L.245 10.975A.583.583 0 0 1 0 10.5V.583A.583.583 0 0 1 .583 0c.227 0 .692.364.768.419l3.655 2.614a.583.583 0 0 1 .244.476v9.908a.583.583 0 0 1-.583.583ZM6.417 7.583v3.5h1.75a.583.583 0 0 0 .583-.583V7.583H6.417ZM6.417 3.51v.573H8.75v-3.5A.583.583 0 0 0 8.167 0H2.77l2.917 2.086a1.757 1.757 0 0 1 .729 1.423Z" />
      <path d="m14 5.833-3.5-2.916V5.25H6.417v1.167H10.5V8.75L14 5.833Z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h14v14H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgComponent;
