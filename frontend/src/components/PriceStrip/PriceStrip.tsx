import './priceStrip.css';

type PriceStripProps = {
  price: number | null;
};

const PriceStrip = ({ price }: PriceStripProps) => {
  return (
    <div className="priceStrip">
      <span className="priceStrip__label">Price:</span>
      <span className="priceStrip__amount">
        {price ? `$${parseFloat(price.toFixed(1))}` : "--"}
      </span>
    </div>
  );
};

export default PriceStrip;
