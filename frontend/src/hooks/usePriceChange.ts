import { useRef, useEffect } from 'react';
import useShakeEffect from './useShake';
import useRealTimeTrend from './useRealTimeTrend';

const usePriceChange = (price: number) => {
  const { shakeEffect, setShakeEffect } = useShakeEffect(false);
  const { realTimeTrend, setRealTimeTrend } = useRealTimeTrend("NEUTRAL");
  const prevPrice = useRef(price);

  const resetEffects = () => {
    setShakeEffect(false);
    setRealTimeTrend("NEUTRAL");
  };

  useEffect(() => {
    if (
      realTimeTrend === "POSITIVE" ||
      realTimeTrend === "NEGATIVE" ||
      shakeEffect
    ) {
      setTimeout(() => {
        resetEffects();
      }, 1000);
    }
  }, [realTimeTrend, shakeEffect]);

  useEffect(() => {
    resetEffects();

    const priceDiffPerc = ((price - prevPrice.current) / prevPrice.current) * 100;

    if (priceDiffPerc > 0) {
      setRealTimeTrend("POSITIVE");

      if (priceDiffPerc > 25) {
        setShakeEffect(true);
      }
    } else if (priceDiffPerc < 0) {
      setRealTimeTrend("NEGATIVE");
    }

    prevPrice.current = price;
  }, [price]);

  return { shakeEffect, realTimeTrend };
};

export default usePriceChange;
