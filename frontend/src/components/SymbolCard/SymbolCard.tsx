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
import SymbolCardPresentation from '../SymbolCardPresentation';
import SymbolCardHeader from '../SymbolCardHeader';
import usePriceChange from '@/hooks/usePriceChange';

type SymbolCardProps = {
  id: string;
  price: number;
};

const SymbolCard = memo(({ id, price }: SymbolCardProps) => {
  const { shakeEffect, realTimeTrend } = usePriceChange(price);
  
  const selectedCardId = useAppSelector((state) => state.activeCard.activeCardId);
  const showCardInfo = useAppSelector(selectShowCardInfo);
  const { trend, companyName, industry, marketCap } = useAppSelector(
    (state) => state.stocks.entities[id]
  );

  const onClick = (id: string) => {
    store.dispatch(
      activeCardSlice.actions.updateActiveCard({
        activeCardId: id === selectedCardId ? null : id,
      })
    );
  };  

  const handleOnClick = () => {
    onClick(id);
  };

  const CompanyIconMemo = useMemo(() => <CompanyIcon />, []);
  const IndustryIconMemo = useMemo(() => <IndustryIcon />, []);
  const MarketCapIconMemo = useMemo(() => <MarketCapIcon />, []);

  return (
    <SymbolCardPresentation
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
    </SymbolCardPresentation>
  );
});

export default SymbolCard;
