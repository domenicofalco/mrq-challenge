import './symbolCardPresentation.css';
import { realTimeTrend } from '@/lib/types/realeTimeTrendTypes';

type SymbolCardProps = {
  id: string;
  selectedCardId: string | null;
  shakeEffect: boolean;
  realTimeTrend: realTimeTrend;
  onClick: () => void;
  children: React.ReactNode;
};

const SymbolCardPresentation = ({ id, selectedCardId, shakeEffect, onClick, realTimeTrend, children }: SymbolCardProps) => {
  let activeTransition = "symbolCardPresentation--default";
  if (selectedCardId) {
    activeTransition = selectedCardId === id ? "symbolCardPresentation--focusin" : "symbolCardPresentation--focusout";
  }
  
  let trendTransition = "symbolCardPresentation--neutral";
  if (realTimeTrend === "POSITIVE") {
    trendTransition = "symbolCardPresentation--positive";
  } else if (realTimeTrend === "NEGATIVE") {
    trendTransition = "symbolCardPresentation--negative";
  }
  
  let shakeTransition = shakeEffect ? "symbolCardPresentation--shake" : "";

  return (
    <div
      onClick={onClick}
      className={`symbolCardPresentation ${activeTransition} ${shakeTransition} ${trendTransition}`}
    >
      {children}
    </div>
  );
};

export default SymbolCardPresentation;
