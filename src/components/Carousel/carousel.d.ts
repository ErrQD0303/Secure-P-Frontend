import { BoxProps } from "@mui/material";

export type CarouselSettings = {
  spacing?: number;
  showSlides?: number;
  speed?: number;
  autoPlay?: boolean;
  infinity?: boolean;
  pauseOnHover?: boolean;
  duplicates?: number;
  disableTransition?: boolean;
  centerMode?: boolean;
  defaultValue?: number;
  value?: number;
  onChange?: (slide: number, slideNormal: number) => void;
  transitionDelayTime?: number;
};

export type CarouselProps = Omit<BoxProps, keyof CarouselSettings> &
  CarouselSettings & {
    renderNext?: (props: { disabled: boolean }) => React.JSX.Element;
    renderPrev?: (props: { disabled: boolean }) => React.JSX.Element;
    arrows?: boolean;
    renderDot?: (props: {
      index: number;
      selected: boolean;
    }) => React.JSX.Element;
    dots?: boolean;
  };

export type ObjectAssignType = { [key: string]: unknown };
