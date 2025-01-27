import SymbolsGrid from '@/components/SymbolsGrid';
import PriceChart from '@/components/PriceChart';
import DesktopInfo from './src/DesktopInfo';
import './symbolsView.css';

const SymbolsView = () => {
  return (
    <div className="symbolsView">
      <DesktopInfo/>
      <div className="symbolsView__content">
        <div className="symbolsView__chart">
          <div>
            <h3>PRICE HISTORY</h3>
          </div>
          <PriceChart />
        </div>
        <div className="symbolsView__cards">
          <SymbolsGrid />
        </div>
      </div>
    </div>
  );
};

export default SymbolsView;
