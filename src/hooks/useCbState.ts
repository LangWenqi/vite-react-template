
import { useEffect, useState, useRef } from 'react';
 
type T_Cb<T> = (nextData: T, prevData: T) => void;

type T_Set<T> = (data: T, callback?: T_Cb<T>) => void;
 
const useCbState = <T> (originData: T): [T, T_Set<T>] => {

  const cbRef = useRef<T_Cb<T>>();
  const prevRef = useRef<T>();

  const [data, setData] = useState<T>(originData);

  useEffect(() => {
    if (cbRef.current) {
      cbRef.current(data, prevRef.current as T);
    }
    prevRef.current = data;
  }, [data]);

  return [data, (nextData, callback) => {
    cbRef.current = callback;
    setData(nextData);
  }];
}
export { useCbState }
