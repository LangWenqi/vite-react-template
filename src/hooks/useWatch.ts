
import { useEffect, useRef } from 'react';
type Config = {
  immediate: boolean;
};
type T_EffectCb = (prevDeps: any[], onInvalidate: T_OnInvalidateRef) => void;
type T_EffectClearCb = () => void;
type T_OnInvalidateRef = (fuc: T_EffectClearCb) => void;

const useWatch = (deps: any[], effectCb: T_EffectCb, config: Config = { immediate: false }) => {
  const isFirstRef = useRef<boolean>(true);
  const stop = useRef<boolean>(false);
  const prevDeps = useRef<any[]>(deps);
  const effectClearRef = useRef<T_EffectClearCb | null>(null);
  const onInvalidateRef = useRef<T_OnInvalidateRef>((fuc: T_EffectClearCb) => {
    effectClearRef.current = fuc;
  });
  useEffect(() => {
    if (!stop.current) {
      if (config.immediate || !isFirstRef.current) {
        effectCb(prevDeps.current, onInvalidateRef.current);
      }
      prevDeps.current = deps;
      return () => {
        if (effectClearRef.current) {
          // 获取deps为上一次deps
          effectClearRef.current();
        }
        isFirstRef.current = false;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return () => {
    stop.current = true;
  };
}
export { useWatch }
