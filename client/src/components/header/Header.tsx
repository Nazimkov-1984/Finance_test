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
    </header>
  );
};
export default Header;
