import { Box, SxProps, Theme } from "@mui/material";
import { CarouselProps, ObjectAssignType } from "./carousel.d";
import clsx from "clsx";
import React from "react";
import useCarousel from "./useCarousel";
import { objectsAssign } from "./shared/object";
import { carouselClasses } from "./carouselClasses";

// Deep merge two objects, the two object will be merged into the first one

const sxStyles: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  boxSizing: "border-box",

  [`& .${carouselClasses.content}`]: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },

  [`& .${carouselClasses.list}`]: {
    width: "100%",
    whiteSpace: "nowrap",
    overflow: "hidden",

    [`& .${carouselClasses.item}`]: {
      display: "inline-block",
      boxSizing: "border-box",

      "&:last-child": {
        marginRight: 0,
      },
      [`&.${carouselClasses.hidden}`]: {
        opacity: 0,
        visibility: "hidden",
      },
      [`&.${carouselClasses.center}`]: {},
    },
  },
  [`& .${carouselClasses.dots}`]: {
    marginTop: 3,
  },
};

function Carousel({
  children,
  className,
  sx = {},
  renderNext,
  renderPrev,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  arrows: arrowsRaw = true,
  renderDot,
  dots: dotsRaw,
  showSlides = 3,
  onChange,
  ...props
}: CarouselProps) {
  //props.infinity
  const duplicates = props.duplicates || (props.infinity ? 3 : 1);

  const rows = React.Children.toArray(children);
  const size = rows.length * duplicates;
  const dots = typeof dotsRaw === "undefined" ? size > showSlides : dotsRaw;
  const arrows = size > showSlides;

  const carousel = useCarousel(rows, {
    ...props,
    showSlides,
    onChange,
  });

  let next: JSX.Element | null = null;
  let prev: JSX.Element | null = null;

  if (renderNext && arrows) {
    next = renderNext({
      disabled: carousel.hiddenNextArrow,
    });
    next = React.cloneElement(next, {
      ...next.props,
      onClick: carousel.nextSlide,
      className: clsx(
        carouselClasses.arrow,
        { [carouselClasses.arrowDisabled]: carousel.hiddenNextArrow },
        carouselClasses.arrowNext,
        next.props.className
      ),
    });
  }
  if (renderPrev && arrows) {
    prev = renderPrev({
      disabled: carousel.hiddenPrevArrow,
    });
    prev = React.cloneElement(prev, {
      ...prev.props,
      onClick: carousel.prevSlide,
      className: clsx(
        carouselClasses.arrow,
        { [carouselClasses.arrowDisabled]: carousel.hiddenPrevArrow },
        carouselClasses.arrowPrev,
        prev.props.className
      ),
    });
  }
  const getDot = (i: number) => {
    let el: JSX.Element | null = null;

    if (renderDot && dots) {
      const offset =
        props.centerMode && !props.infinity ? Math.floor(showSlides / 2) : 0;

      el = renderDot({
        selected: props.centerMode
          ? (i + offset) % rows.length === carousel.centerIndex % rows.length
          : i === carousel.slide,
        index: i + offset,
      });
      el = React.cloneElement(el, {
        ...el.props,
        onClick: () => carousel.toSlide(i),
        className: clsx(carouselClasses.dot, el.props.className),
        "data-slide": i + offset,
      });
    }

    return el;
  };

  const rootSx = React.useMemo(() => {
    if (!sx) {
      return sxStyles;
    }
    if (typeof sx === "object") {
      const res = objectsAssign(
        sxStyles as ObjectAssignType,
        sx as ObjectAssignType
      );
      return res;
    }

    return (theme: Theme) => {
      const res = objectsAssign(
        sxStyles as ObjectAssignType,
        sx(theme) as ObjectAssignType
      );
      return res;
    };
  }, [sx]);

  return (
    <Box
      {...carousel.rootProps}
      {...props}
      className={clsx(carouselClasses.root, className)}
      sx={rootSx as unknown as SxProps<Theme>}
    >
      <Box className={carouselClasses.content}>
        {prev}
        <Box {...carousel.listProps}>
          {new Array(size).fill(0).map((_, i) => {
            return carousel.renderItem(i);
          })}
        </Box>
        {next}
      </Box>
      {dots && renderDot && (
        <Box className={carouselClasses.dots}>
          {new Array(
            rows.length -
              (!props.centerMode || props.infinity ? 0 : showSlides - 1)
          )
            .fill(0)
            .map((_, i) => (
              <React.Fragment key={`carousel-dot-${i}`}>
                {getDot(i)}
              </React.Fragment>
            ))}
        </Box>
      )}
    </Box>
  );
}

export default Carousel;
