import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { ReactComponent as CompanyIcon } from '@/assets/company.svg';
import { ReactComponent as IndustryIcon } from '@/assets/industry.svg';
import { ReactComponent as MarketCapIcon } from '@/assets/market_cap.svg';
import { useAppSelector } from '@/hooks/redux';
import ListItem from '@/components/ListItem';
import { store } from '@/store';
import activeCardSlice from '@/store/activeCardSlice';
import { selectShowCardInfo } from '@/store/dashboardOptionsSlice';
import PriceStrip from '@/components/PriceStrip';
import { priceFormatter } from '@/utils/priceFormatter';
import { realTimeTrend } from '@/lib/types/realeTimeTrendTypes';
import SymbolCardView from '../SymbolCardView';
import SymbolCardHeader from '../SymbolCardHeader';

type SymbolCardProps = {
  id: string;
  price: number;
};

const SymbolCard = memo(({ id, price }: SymbolCardProps) => {
  const selectedCardId = useAppSelector((state) => state.activeCard.activeCardId);
  const showCardInfo = useAppSelector(selectShowCardInfo);

  const onClick = (id: string) => {
    store.dispatch(
      activeCardSlice.actions.updateActiveCard({
        activeCardId: id === selectedCardId ? null : id,
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

  const CompanyIconMemo = useMemo(() => <CompanyIcon />, []);
  const IndustryIconMemo = useMemo(() => <IndustryIcon />, []);
  const MarketCapIconMemo = useMemo(() => <MarketCapIcon />, []);

  return (
    <SymbolCardView
      id={id}
      selectedCardId={selectedCardId}
      shakeEffect={shakeEffect}
      realTimeTrend={realTimeTrend}
      onClick={handleOnClick}
    >
      <SymbolCardHeader id={id} trend={trend} />
      <PriceStrip price={price} />
      {showCardInfo && 
        <>
          <ListItem Icon={CompanyIconMemo} label={companyName} />
          <ListItem Icon={IndustryIconMemo} label={industry} />
          <ListItem Icon={MarketCapIconMemo} label={`$${priceFormatter(marketCap)}`} />
        </>
      }
    </SymbolCardView>
  );
});

export default SymbolCard;
