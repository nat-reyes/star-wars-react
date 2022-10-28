import { ArrowCircleLeft } from "@styled-icons/evaicons-solid/ArrowCircleLeft";
import { ArrowCircleRight } from "@styled-icons/evaicons-solid/ArrowCircleRight";
import styled from "styled-components";

import defaultTheme from "../../../styles/commons";

export const ArrowLeft = styled(ArrowCircleLeft)``;

export const ArrowRight = styled(ArrowCircleRight)``;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 10px;
  align-items: center;
  color: ${({ theme }) => theme.colors.primaryText};
`;

Wrapper.defaultProps = {
  theme: defaultTheme,
};

export const Page = styled.div`
  display: grid;
  grid-template-columns: repeat(3, min-content);
  column-gap: 5px;
  align-items: center;
  margin-right: 5px;
`;

export const ArrowContainer = styled.div`
  height: 24px;
  width: 24px;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.primaryText};
  text-align: center;
  border-radius: 50%;
  &:hover {
    background: ${({ theme }) => theme.button.hover};
  }
  pointer-events: ${({ disabled }) => (disabled ? "not-allowed" : "unset")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

export const PageDisplay = styled.span`
  white-space: nowrap;
  margin-top: 0.5rem;
`;

ArrowContainer.defaultProps = {
  theme: defaultTheme,
};

ArrowLeft.defaultProps = {
  theme: defaultTheme,
};

ArrowRight.defaultProps = {
  theme: defaultTheme,
};
