import logo from "./../../assets/star-wars-logo.png";
import { NavbarStyled, StarWarsLogo } from "./styles";

function Navbar() {
  return (
    <NavbarStyled>
      <StarWarsLogo src={logo} alt="clone star wars" width="100" height="100" />
    </NavbarStyled>
  );
}

export default Navbar;
