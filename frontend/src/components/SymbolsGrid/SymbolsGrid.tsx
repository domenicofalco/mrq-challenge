import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import SymbolCard from '../SymbolCard';
import { fetchAllStocks, selectors } from '@/store/stocksSlice';

type SymbolsGridProps = {
  onSymbolClick: (symbolId: string) => void;
  activeCard: string | null;
};

const SymbolsGrid = ({ onSymbolClick, activeCard }: SymbolsGridProps) => {
  const stockSymbols = useAppSelector(selectors.selectStockIds);
  const prices = useAppSelector((state) => state.prices);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllStocks());
  }, [dispatch]);

  return (
    <>
      {stockSymbols.map((id, i) => (
        <SymbolCard 
          key={i} 
          id={id} 
          activeCard={activeCard}
          price={prices[id]} 
          onClick={onSymbolClick}
        /> 
      ))}
    </>
  );
};

export default SymbolsGrid;
