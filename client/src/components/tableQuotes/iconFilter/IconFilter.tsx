import "./IconFilter.css";
import { ReactComponent as FilterIconDisable } from "../../../assets/image/filter.svg";
import { ReactComponent as FilterIconActive } from "../../../assets/image/filterActive.svg";

interface IconFilterProps {
  isAvtive: boolean;
}
const IconFilter: React.FC<IconFilterProps> = ({ isAvtive }) => {
  return (
    <div className="iconFilterWrapper">
      {isAvtive ? <FilterIconActive /> : <FilterIconDisable />}
    </div>
  );
};

export default IconFilter;
