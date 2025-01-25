import './symbolCard.css';
import { ReactComponent as CompanyIcon } from '@/assets/company.svg';
import { ReactComponent as IndustryIcon } from '@/assets/industry.svg';
import { ReactComponent as MarketCapIcon } from '@/assets/market_cap.svg';
import { useAppSelector } from '@/hooks/redux';
import ListItem from '@/components/ListItem';

type SymbolCardProps = {
  id: string;
  onClick: (symbolId: string) => void;
  price: number;
  activeCard: string | null;
};

const SymbolCard = ({ id, onClick, price, activeCard }: SymbolCardProps) => {
  const { trend, companyName, industry, marketCap } = useAppSelector((state) => state.stocks.entities[id]);

  const handleOnClick = () => {
    onClick(id);
  };
  
  const priceFormatter = Intl.NumberFormat('en', { notation: 'compact' });
  let billion = priceFormatter.format(marketCap);

  let symbolCardTransition = 'symbolCard--default';
  if (activeCard) {
    symbolCardTransition = activeCard === id ? 'symbolCard--focusin' : 'symbolCard--focusout';
  }

  return (
    <div onClick={handleOnClick} className={`symbolCard ${symbolCardTransition}`}>
      <div className="symbolCard__header">
        {id} - {trend && <img className="symbolCard__trend" src={`${trend?.toLocaleLowerCase()}.png`} />}
      </div>
      <div className="symbolCard__price">
        <span className="symbolCard__label">Price:</span> 
        <span className="symbolCard__amount">{price ? `$${price?.toFixed(0)}` : '--'}</span>
      </div>
      <ListItem Icon={<CompanyIcon />} label={companyName} />
      <ListItem Icon={<IndustryIcon />} label={industry} />
      <ListItem Icon={<MarketCapIcon />} label={`$${billion}`} />
    </div>
  );
};
export default SymbolCard;
