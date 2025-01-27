import { useState } from 'react';

const useShakeEffect = (initialState: boolean) => {
  const [shakeEffect, setShakeEffect] = useState<boolean>(initialState);

  return { shakeEffect, setShakeEffect };
};

export default useShakeEffect;
