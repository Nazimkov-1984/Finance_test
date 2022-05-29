import Favorite from "./favorite/Favorite";
import "./Header.css";

const Header: React.FC = () => {
  return (
    <header className="header">
      <img
        className="mainLogo"
        src={require("../../assets/icon/stats.png").default}
        alt="Main logo"
      />
      <h1 className="headerTitle">Finance test task</h1>
      <Favorite />
    </header>
  );
};
export default Header;
