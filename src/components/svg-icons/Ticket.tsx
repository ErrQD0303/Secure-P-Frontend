const Ticket = (props: object) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={27}
    height={17}
    fill="none"
    {...props}
  >
    <g
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
      filter="url(#a)"
    >
      <path d="M.141 2.144A1.83 1.83 0 0 1 1.974.31V.254h15.288v15.202H1.974c-.507 0-.959-.197-1.297-.535a1.81 1.81 0 0 1-.536-1.298v-2.51a.78.78 0 0 1 .592-.733 2.593 2.593 0 0 0 1.975-2.51A2.593 2.593 0 0 0 .733 5.358a.749.749 0 0 1-.592-.733V2.144Zm5.932 8.783A.25.25 0 0 1 6 10.75v-.25h1.5v.25a.25.25 0 0 1-.25.25h-1a.25.25 0 0 1-.177-.073Zm5.426-.177a.25.25 0 0 0 .25.25h1a.25.25 0 0 0 .25-.25v-.25h-1.5v.25Zm.54-4.87.435 1.743.379.377c.093.094.146.221.146.354V10H6V8.354c0-.133.053-.26.146-.354l.379-.377.435-1.744a.5.5 0 0 1 .485-.378h4.11a.5.5 0 0 1 .484.378Zm-.485.12H7.445L7.07 7.5h4.86L11.553 6ZM7.167 9.187a.375.375 0 1 0 .416-.623.375.375 0 0 0-.416.623Zm4.25 0a.375.375 0 1 0 .416-.624.375.375 0 0 0-.417.624ZM8.85 5.126a.75.75 0 0 1 1.3 0l.432-.25a1.25 1.25 0 0 0-2.165 0l.433.25Zm-1.572-.772.444.23a2 2 0 0 1 3.555 0l.445-.23a2.5 2.5 0 0 0-4.444 0ZM26.344 5.359a.78.78 0 0 0 .592-.733V2.144A1.83 1.83 0 0 0 25.102.31h-6.29v15.203h6.29a1.83 1.83 0 0 0 1.834-1.833v-2.482c0-.367-.254-.677-.592-.734a2.572 2.572 0 0 1-2.003-2.538c0-1.241.818-2.285 2.003-2.567Z" />
    </g>
    <defs>
      <filter
        id="a"
        width={26.795}
        height={16.259}
        x={0.141}
        y={0.254}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={1} />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.0771626 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_53_1" />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_53_1"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default Ticket;
