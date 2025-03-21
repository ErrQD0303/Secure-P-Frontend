import Box from "@mui/material/Box";
import { CarouselSettings } from "./carousel.d";
import useMeasure from "react-use-measure";
import React from "react";
import clsx from "clsx";
import { carouselClasses } from "./carouselClasses";

function useCarousel(rows: React.ReactNode[], props: CarouselSettings) {
  const {
    showSlides = 1,
    speed = 3000,
    spacing = 0,
    autoPlay = false,
    transitionDelayTime = 10000,
    value,
    onChange,
    pauseOnHover = false,
    duplicates: rawDuplicates,
    disableTransition = false,
    centerMode: rawCenterMode,
    infinity,
    defaultValue = 0,
  } = props;
  const centerMode = showSlides === 1 ? true : rawCenterMode;

  const duplicates = rawDuplicates || (infinity ? 3 : 1);
  const size = rows.length * duplicates;
  const [containerRef, containerBounds] = useMeasure();

  const [state, setState] = React.useState(defaultValue);
  const [hovered, setHovered] = React.useState(false);
  const [isRight, setIsRight] = React.useState(true);
  const [trottleSwipe, setTrottleSwipe] = React.useState(false);
  const timeoutRef = React.useRef<null | unknown>(null);

  const slide = state;
  const slideNormal = (1000 * size + slide) % size;

  const loop = Math.ceil((slide + 1) / size) - 1;
  const visibleFrom = (size * 1000 + slide) % size;
  const visibleTo = (size * 1000 + slide + showSlides - 1) % size;
  const centerIndex =
    (size * 1000 + Math.floor(showSlides / 2) + (slide % size)) % size;
  const disableNext =
    !infinity &&
    (centerMode ? state === size - showSlides : state + 1 === size);
  const disablePrev = !infinity && state - 1 < 0;

  let intervalSet = false;

  const checkIsNotVisible = (i: number) => {
    if (!centerMode) {
      if (showSlides === 1) {
        return i !== visibleFrom;
      }
      if (visibleTo > visibleFrom) {
        return i < visibleFrom || i >= visibleTo;
      }
      if (visibleTo < visibleFrom) {
        return i < visibleFrom && i > visibleTo;
      }
    }

    return false;
  };
  const checkIsHidden = (i: number) => {
    if (disableTransition) {
      if (showSlides === 1) {
        return i !== visibleFrom;
      } else {
        return visibleTo > visibleFrom;
      }
    } else {
      if (showSlides === 1) {
        if (slideNormal === size - 1 && i === 0) {
          return false;
        }
        return (
          i !== visibleFrom &&
          i !== visibleFrom + (1 % size) &&
          i !== (visibleFrom - 1 + size * 999999) % size &&
          i !== visibleFrom + (1 % size) &&
          i !== (visibleFrom - 1 + size * 999999) % size
        );
      }
      if (visibleTo > visibleFrom) {
        if (i === size - 1 && visibleFrom === 0) {
          return false;
        }
        if (i === 0 && visibleFrom === size - showSlides) {
          return false;
        }

        return i < visibleFrom - 1 || i > visibleTo + 1;
      }
      if (visibleTo < visibleFrom) {
        return i < visibleFrom - 1 && i > visibleTo + 1;
      }
    }

    return false;
  };

  const spacingPx = spacing * 8;
  const itemWidth = Math.round(containerBounds.width / showSlides);

  React.useEffect(() => {
    if (autoPlay && !intervalSet && (pauseOnHover ? !hovered : true)) {
      const interval = setInterval(() => {
        let right = isRight;
        intervalSet = true;

        if (!infinity) {
          if (isRight && disableNext) {
            setIsRight(false);
            right = false;
          }
          if (!isRight && slide === 0) {
            setIsRight(true);
            right = true;
          }
        }

        if (size > showSlides || !centerMode) {
          const nextSlide = slide + (right ? 1 : -1);

          if (onChange) {
            onChange(nextSlide, slideNormal);
          } else {
            setState(nextSlide);
          }
        }
      }, transitionDelayTime);

      return () => {
        clearInterval(interval);
      };
    }

    return () => {};
  }, [slide, size, autoPlay, hovered, pauseOnHover, infinity, intervalSet]);
  React.useEffect(() => {
    if (typeof value !== "undefined") {
      setState(value);
    }
  }, [value, speed]);
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current as number);
      }
    };
  }, []);
  React.useEffect(() => {
    setState(defaultValue);
  }, [defaultValue]);

  const onMouseLeave = () => {
    if (hovered) {
      setHovered(false);
    }
  };
  const onMouseEnter = () => {
    if (!hovered) {
      setHovered(true);
    }
  };
  const itemProps = (i: number) => {
    const index = i % (size / duplicates);
    const item = rows[index];

    let slideTr = -slide + size * loop;
    const isNotVisible = checkIsNotVisible(i);
    const isHidden = infinity && checkIsHidden(i);

    if (infinity) {
      // const isLeft = i >= size + showSlides - Math.ceil(size / 2);
      const isLeftOld = i >= size - Math.ceil(showSlides / 2);
      // console.log(i, isLeft);
      //
      if (slideNormal < Math.ceil(showSlides / 2) && isLeftOld) {
        // if (slideNormal <= Math.floor(size / 2) && isLeft) {
        slideTr -= size;
      } else if (i + 2 < slideNormal) {
        slideTr += size;
      } else if (slideNormal < 0 && i < 2) {
        slideTr += size;
      }
    } else {
      if (!centerMode) {
        if (slideNormal > 0) {
          slideTr++;
        }
        const returnSlides = showSlides - (size - slideNormal) - 1;

        if (returnSlides > 0) {
          slideTr += returnSlides;
        }
      }
    }

    return {
      className: clsx(carouselClasses.item, {
        [carouselClasses.current]: i === slide,
        [carouselClasses.center]: centerIndex === i,
        [carouselClasses.hidden]: isHidden,
        [carouselClasses.notVisible]: isNotVisible,
      }),
      style: {
        width: itemWidth,
        // marginRight: spacingPx,
        transform: `translateX(${100 * slideTr}%)`,
        transition: !disableTransition
          ? `transform ${speed / 1000}s`
          : undefined,
        padding: spacingPx,
      },
      "data-item": i.toString(),
      "data-hidden": (isHidden ? 1 : 0).toString(),
      children: item,
    };
  };
  const rootProps = {
    onMouseLeave,
    onMouseEnter,
  };
  const listProps = {
    ref: containerRef,

    "data-current": slideNormal.toString(),
    "data-center": centerIndex.toString(),
    "data-from": visibleFrom.toString(),
    "data-to": visibleTo.toString(),
    "data-loop": loop.toString(),
    className: carouselClasses.list,
    sx: {
      margin: `-${spacingPx}px 0px`,
    },
  };

  const toSlide = (slide: number) => {
    if (!trottleSwipe || disableTransition) {
      const next = slide;

      if (!infinity) {
        if (next < 0 || next > rows.length) {
          return;
        }
      }

      setState(next);
      setTrottleSwipe(true);
      stop();
      timeoutRef.current = setTimeout(() => setTrottleSwipe(false), speed);
    }
  };
  const nextSlide = () => {
    toSlide(state + 1);
  };
  const prevSlide = () => {
    toSlide(state - 1);
  };

  return {
    rawSlide: state,
    slide: state,
    centerIndex,

    nextSlide,
    prevSlide,
    toSlide,

    rootProps,
    listProps,
    itemProps,
    renderItem: (i: number) => {
      const itemPr = itemProps(i);

      return <Box key={`item-${i}`} {...itemPr} />;
    },

    hiddenPrevArrow: disablePrev,
    hiddenNextArrow: disableNext,
  };
}

export default useCarousel;
