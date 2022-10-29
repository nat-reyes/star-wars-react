import styled from "styled-components";
import defaultTheme from "../../styles/commons";
import { Spinner } from "@styled-icons/fa-solid/Spinner";

export const TableTitle = styled.h1`
  font-family: Copperplate, Papyrus, fantasy;
  font-size: 3.5rem;
  display: flex;
  justify-content: center;
`;

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 2rem;
  margin-bottom: 2rem;
  background-color: #fff;
  box-shadow: 0px 0px 5px 0px rgb(197, 197, 197);
  border-radius: 4px;
  height: 4rem;
  padding: 5px;
`;

export const StyledSpan = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin: 1rem;
`;

export const InputContainer = styled.div`
  margin-top: 1rem;
  border-radius: 5px;
`;

export const InputStyled = styled.input`
  height: 1.2rem;
  border: 1px solid black;
  border-radius: 0.2rem;
`;

export const SelectStyled = styled.select`
  height: 1.6rem;
  padding: 0.2rem;
  width: 8rem;
  border: 1px solid black;
  border-radius: 0.2rem;
  font-size: 0.9rem;
  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;

export const Loading = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 8rem;
  background-color: ${({ theme }) => theme.colors.backgroundWhite};
`;

Loading.defaultProps = { theme: defaultTheme };

export const SpinnerLoading = styled(Spinner)`
  height: 24px;
  width: 24px;
`;
