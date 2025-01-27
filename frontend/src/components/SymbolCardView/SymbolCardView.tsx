import './symbolCardView.css';
import { memo } from 'react';
import { realTimeTrend } from '@/lib/types/realeTimeTrendTypes';

type SymbolCardProps = {
  id: string;
  selectedCardId: string | null;
  shakeEffect: boolean;
  realTimeTrend: realTimeTrend;
  onClick: () => void;
  children: React.ReactNode;
};

const SymbolCardView = ({ id, selectedCardId, shakeEffect, onClick, realTimeTrend, children }: SymbolCardProps) => {
  let activeTransition = "symbolCardView--default";
  if (selectedCardId) {
    activeTransition = selectedCardId === id ? "symbolCardView--focusin" : "symbolCardView--focusout";
  }
  
  let trendTransition = "symbolCardView--neutral";
  if (realTimeTrend === "POSITIVE") {
    trendTransition = "symbolCardView--positive";
  } else if (realTimeTrend === "NEGATIVE") {
    trendTransition = "symbolCardView--negative";
  }
  
  let shakeTransition = shakeEffect ? "symbolCardView--shake" : "";

  return (
    <div
      onClick={onClick}
      className={`symbolCardView ${activeTransition} ${shakeTransition} ${trendTransition}`}
    >
      {children}
    </div>
  );
};

export default SymbolCardView;
