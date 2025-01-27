import './symbolCardHeader.css';
import { memo } from 'react';
import { useAppSelector } from '@/hooks/redux';

type SymbolCardHeaderProps = {
  id: string;
  trend: string | null;
};

const SymbolCardHeader = memo(({ id, trend }: SymbolCardHeaderProps) => {
  return (
    <div className="symbolCardHeader">
      {id} -{" "}
      {trend && (
        <img
          className="symbolCardHeader__trend"
          src={`${trend?.toLocaleLowerCase()}.png`}
        />
      )}
    </div>
  );
});

export default SymbolCardHeader;
