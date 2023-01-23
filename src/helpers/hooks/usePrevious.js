import { useEffect, useRef } from 'react';

export const usePrevious = (value) => {
  const ref = useRef(value);

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};
