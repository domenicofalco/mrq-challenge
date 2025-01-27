import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import SymbolCard from '../SymbolCard';
import { fetchAllStocks, selectors } from '@/store/stocksSlice';


const SymbolsGrid = () => {
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
          price={prices[id]}
        /> 
      ))}
    </>
  );
};

export default SymbolsGrid;
