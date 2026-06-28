import { useEffect } from "react";

export function useInfiniteScroll(callback: () => void, enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) callback();
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [callback, enabled]);
}
