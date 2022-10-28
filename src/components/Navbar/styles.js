import styled from "styled-components";

import defaultTheme from "../../styles/commons";

export const NavbarStyled = styled.nav`
  height: 6rem;
  background: ${({ theme }) => theme.colors.navBarBackgroundColor};
  gap: 50rem;
`;

NavbarStyled.defaultProps = {
  theme: defaultTheme,
};

export const StarWarsLogo = styled.img`
  margin-left: 2rem;s
`;
