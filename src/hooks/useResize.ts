
import { useEffect, useRef } from 'react';

type T_ScrollCb = () => void;
 
const useResize = (resizeCb: T_ScrollCb) => {
  const timerRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(null);
  const resizeCbRef = useRef(resizeCb);

  const resizeCallBack = () => {
    timerRef.current && cancelAnimationFrame(timerRef.current);
    timerRef.current = requestAnimationFrame(() => {
      resizeCbRef.current();
    })
  }

  useEffect(() => {
    window.addEventListener('resize', resizeCallBack);
    resizeCallBack();
    return () => {
      timerRef.current && cancelAnimationFrame(timerRef.current);
      window.removeEventListener('resize', resizeCallBack);
    }
  }, [])

}
export { useResize }
