// frontend/src/hooks/useAutoscroll.js
import { useEffect, useRef } from 'react';

export const useAutoScroll = (dependency) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [dependency]);

  return bottomRef;
};
