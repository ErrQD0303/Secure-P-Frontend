import { SVGProps } from "react";
import { JSX } from "react/jsx-runtime";

const SvgComponent = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clip-path="url(#clip0_61_7)">
      <path
        d="M12.25 0H10.5V1.75H8.75V3.5H10.5V5.25H12.25V3.5H14V1.75H12.25V0Z"
        fill="white"
      />
      <path
        d="M10.0573 6.8005C9.38493 6.5915 8.77351 6.22217 8.27567 5.72433C7.77783 5.22649 7.4085 4.61507 7.1995 3.94275C6.9791 3.23275 6.94059 2.47876 7.0875 1.75H0.875C0.642936 1.75 0.420376 1.84219 0.256282 2.00628C0.0921872 2.17038 0 2.39294 0 2.625L0 13.125C0 13.3571 0.0921872 13.5796 0.256282 13.7437C0.420376 13.9078 0.642936 14 0.875 14H11.375C11.6071 14 11.8296 13.9078 11.9937 13.7437C12.1578 13.5796 12.25 13.3571 12.25 13.125V6.9125C11.5212 7.05941 10.7672 7.0209 10.0573 6.8005ZM10.5 12.25H1.75V10.5H10.5V12.25Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_61_7">
        <rect width="14" height="14" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgComponent;
