import { useState, useRef, useEffect } from 'react';
import { realTimeTrend } from '@/lib/types/realeTimeTrendTypes';

const useRealTimeTrend = (initialState: realTimeTrend) => {
  const [realTimeTrend, setRealTimeTrend] = useState<realTimeTrend>(initialState);
  return { realTimeTrend, setRealTimeTrend };
};

export default useRealTimeTrend;
