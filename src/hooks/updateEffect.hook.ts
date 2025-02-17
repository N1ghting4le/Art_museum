import { useEffect, useState, EffectCallback, DependencyList } from 'react';

const useUpdateEffect = (cb: EffectCallback, deps: DependencyList = []) => {
  const [initial, setInitial] = useState(true);

  useEffect(() => {
    if (initial) {
      setInitial(false);
    } else {
      cb();
    }
  }, deps);
};

export default useUpdateEffect;
