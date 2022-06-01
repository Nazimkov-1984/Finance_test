import { ReactComponent as ArrowUp } from "../../../assets/image/arrowUp.svg";
import { ReactComponent as ArrowDownBlack } from "../../../assets/image/arrowDownBlack.svg";
import { ReactComponent as ArrowDownRed } from "../../../assets/image/arrowDownRed.svg";

export enum ENUM_ARROW_COLOR {
  RED = "red",
  BLACK = "black",
  GREEN = "green",
}

interface IconArrowProps {
  color: ENUM_ARROW_COLOR;
}

const IconArrow: React.FC<IconArrowProps> = ({ color }) => {
  if (color === ENUM_ARROW_COLOR.GREEN) {
    return <ArrowUp />;
  } else if (color === ENUM_ARROW_COLOR.BLACK) {
    return <ArrowDownBlack />;
  } else {
    return <ArrowDownRed />;
  }
};

export default IconArrow;
