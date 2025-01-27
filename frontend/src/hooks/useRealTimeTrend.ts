import { useState } from 'react';
import { RealTimeTrend } from '@/lib/types/realeTimeTrendTypes';

const useRealTimeTrend = (initialState: RealTimeTrend) => {
  const [realTimeTrend, setRealTimeTrend] = useState<RealTimeTrend>(initialState);
  return { realTimeTrend, setRealTimeTrend };
};

export default useRealTimeTrend;
