import { useEffect } from 'react';

// https://dev.to/adrianbdesigns/custom-react-hooks-useeventlistener-1kp
export const useEventListener = (target, type, listener, ...options) => {
  useEffect(
    () => {
      const targetIsRef = target.hasOwnProperty("current");
      const currentTarget = targetIsRef ? target.current : target;
      if (currentTarget)
        currentTarget.addEventListener(type, listener, ...options);
      return () => {
        if (currentTarget)
          currentTarget.removeEventListener(type, listener, ...options);
      };
    },
    [target, type, listener, options]
  );
};



