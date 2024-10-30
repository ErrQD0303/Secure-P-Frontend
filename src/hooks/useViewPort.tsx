import { useEffect, useState } from "react";

function useViewPort() {
  const [viewPort, setViewPort] = useState({
    viewWidth: window.innerWidth,
    viewHeight: window.innerHeight,
  });

  useEffect(function () {
    const handleResize = () =>
      setViewPort({
        viewWidth: window.innerWidth,
        viewHeight: window.innerHeight,
      });

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  });

  return viewPort;
}

export default useViewPort;
