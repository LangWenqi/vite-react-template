
import { useEffect, useRef } from 'react';
import { useLocation } from '@reach/router';

type T_ScrollCb = () => void;
 
const useScrollTop = (scrollCb: T_ScrollCb) => {
  const location = useLocation();
  const timerRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(null);
  const scrollCbRef = useRef(scrollCb);

  useEffect(() => {
    timerRef.current = requestAnimationFrame(() => {
      scrollCbRef.current();
    })
    return () => {
      if (timerRef.current) {
        cancelAnimationFrame(timerRef.current);
      }
    }
  }, [location.pathname])

}
export { useScrollTop }
