import React, { useEffect } from "react";

interface PageScrollSpyProps {
  pixelsToBottom: number;
  scrollEvent: (closeToBottom: boolean) => void;
}

function PageScrollSpy({ pixelsToBottom, scrollEvent }: PageScrollSpyProps) {
  useEffect(() => {
    const onScroll = () => {
      const { scrollHeight, clientHeight } = document.documentElement;
      if (scrollHeight === clientHeight) {
        scrollEvent(true);
        return;
      }

      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;

      const height = scrollHeight - clientHeight;

      if (height - winScroll < pixelsToBottom) {
        scrollEvent(true);
        return;
      }

      scrollEvent(false);
    };

    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [pixelsToBottom, scrollEvent]);
  return <></>;
}

export default PageScrollSpy;
