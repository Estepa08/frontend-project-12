import { useEffect } from 'react';

const useModalAutoFocus = (inputRef, isOpen, delay = 100) => {
  useEffect(() => {
    if (isOpen) {
      const timeoutId = setTimeout(() => inputRef.current?.focus(), delay);
      return () => clearTimeout(timeoutId);
    }
  }, [isOpen, inputRef, delay]);
};

export default useModalAutoFocus;
