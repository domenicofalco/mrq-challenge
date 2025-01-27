import usePriceChange from '@/hooks/usePriceChange';
import './symbolCardPresentation.css';
import { RealTimeTrend } from '@/lib/types/realeTimeTrendTypes';

type SymbolCardProps = {
  id: string;
  selectedCardId: string | null;
  price: number;
  onClick: (id: string) => void;
  children: React.ReactNode;
};

const SymbolCardPresentation = ({ id, selectedCardId, price, onClick, children }: SymbolCardProps) => {
  const { shakeEffect, realTimeTrend } = usePriceChange(price);
  
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
      onClick={() => onClick(id)}
      className={`symbolCardPresentation ${activeTransition} ${shakeTransition} ${trendTransition}`}
    >
      {children}
    </div>
  );
};

export default SymbolCardPresentation;
