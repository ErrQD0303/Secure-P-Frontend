import { SVGProps } from "react";

const SvgComponent = ({
  hasNotification = false,
  fill = "#fff",
  stroke = "#0093D0",
  ...props
}: JSX.IntrinsicAttributes &
  SVGProps<SVGSVGElement> & { hasNotification: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill={fill}
      d="M8.682 21.835A3.632 3.632 0 0 0 12 24c1.48 0 2.755-.891 3.318-2.165H8.682ZM20.788 20.426H3.212a.716.716 0 0 1-.706-.55.683.683 0 0 1 .376-.777c.07-.046.602-.417 1.135-1.543C4.995 15.49 5.2 12.58 5.2 10.501c0-3.75 3.05-6.8 6.8-6.8a6.807 6.807 0 0 1 6.8 6.8c0 2.078.205 4.989 1.183 7.055.533 1.126 1.064 1.497 1.135 1.543a.683.683 0 0 1 .376.778.716.716 0 0 1-.706.55Zm.338-1.322Z"
    />
    {hasNotification && (
      <circle
        cx={18}
        cy={8}
        r={5}
        fill="#FCB034"
        stroke={stroke}
        strokeWidth={2}
      />
    )}
  </svg>
);
export default SvgComponent;
