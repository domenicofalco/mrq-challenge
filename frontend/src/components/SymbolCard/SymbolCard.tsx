import './symbolCard.css';
import { memo, useEffect, useRef, useState } from 'react';
import { ReactComponent as CompanyIcon } from '@/assets/company.svg';
import { ReactComponent as IndustryIcon } from '@/assets/industry.svg';
import { ReactComponent as MarketCapIcon } from '@/assets/market_cap.svg';
import { useAppSelector } from '@/hooks/redux';
import ListItem from '@/components/ListItem';
import { store } from '@/store';
import activeCardSlice from '@/store/activeCardSlice';
import { selectShowCardInfo } from '@/store/dashboardOptionsSlice';

type SymbolCardProps = {
  id: string;
  price: number;
};

type realTimeTrend = "POSITIVE" | "NEGATIVE" | "NEUTRAL";

const SymbolCard = memo(({ id, price }: SymbolCardProps) => {
  const symbolId = useAppSelector((state) => state.activeCard.activeCardId);
  const showCardInfo = useAppSelector(selectShowCardInfo);

  const onClick = (id: string) => {
    store.dispatch(
      activeCardSlice.actions.updateActiveCard({
        activeCardId: id === symbolId ? null : id,
      })
    );
  };

  const { trend, companyName, industry, marketCap } = useAppSelector(
    (state) => state.stocks.entities[id]
  );
  const [shakeEffect, setShakeEffect] = useState<boolean>(false);
  const [realTimeTrend, setRealTimeTrend] = useState<realTimeTrend>("NEUTRAL");
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

    const priceDiffPerc =
      ((price - prevPrice.current) / prevPrice.current) * 100;

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

  const handleOnClick = () => {
    onClick(id);
  };

  const priceFormatter = Intl.NumberFormat("en", { notation: "compact" });
  let billion = priceFormatter.format(marketCap);

  let symbolCardTransition = "symbolCard--default";
  if (symbolId) {
    symbolCardTransition =
      symbolId === id ? "symbolCard--focusin" : "symbolCard--focusout";
  }

  let shakeEffectClass = shakeEffect ? "symbolCard--shake" : "";

  let trendClass = "symbolCard--neutral";
  if (realTimeTrend === "POSITIVE") {
    trendClass = "symbolCard--positive";
  } else if (realTimeTrend === "NEGATIVE") {
    trendClass = "symbolCard--negative";
  }

  return (
    <div
      onClick={handleOnClick}
      className={`symbolCard ${symbolCardTransition} ${shakeEffectClass} ${trendClass}`}
    >
      <div className="symbolCard__header">
        {id} -{" "}
        {trend && (
          <img
            className="symbolCard__trend"
            src={`${trend?.toLocaleLowerCase()}.png`}
          />
        )}
      </div>
      <div className="symbolCard__price">
        <span className="symbolCard__label">Price:</span>
        <span className="symbolCard__amount">
          {price ? `$${price?.toFixed(0)}` : "--"}
        </span>
      </div>
      {showCardInfo && 
        <>
          <ListItem Icon={<CompanyIcon />} label={companyName} />
          <ListItem Icon={<IndustryIcon />} label={industry} />
          <ListItem Icon={<MarketCapIcon />} label={`$${billion}`} />
        </>
      }
    </div>
  );
});

export default SymbolCard;
