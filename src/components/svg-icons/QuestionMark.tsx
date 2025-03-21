import * as React from "react";
const SvgComponent = ({
  innerFill,
  ...props
}: JSX.IntrinsicAttributes &
  React.SVGProps<SVGSVGElement> & { innerFill?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={13}
    fill="none"
    {...props}
  >
    <path
      fill={innerFill ?? "#0055A5"}
      d="M11.813 6.5C11.813 3.312 9.187.687 6 .687 2.79.688.187 3.313.187 6.5A5.811 5.811 0 0 0 6 12.313c3.188 0 5.813-2.602 5.813-5.813ZM6.14 2.61c1.336 0 2.742 1.03 2.742 2.39 0 1.828-1.945 1.852-1.945 2.508v.023c0 .164-.141.282-.282.282H5.344a.27.27 0 0 1-.282-.282v-.093c0-.961.727-1.336 1.266-1.641.469-.258.774-.445.774-.797 0-.469-.61-.773-1.079-.773-.632 0-.914.304-1.335.843a.293.293 0 0 1-.399.047l-.82-.61c-.117-.093-.14-.257-.047-.398.633-.96 1.453-1.5 2.719-1.5ZM6 8.421A1.09 1.09 0 0 1 7.078 9.5c0 .61-.492 1.078-1.078 1.078A1.06 1.06 0 0 1 4.922 9.5c0-.586.469-1.078 1.078-1.078Z"
    />
  </svg>
);
export default SvgComponent;
