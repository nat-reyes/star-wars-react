import styled from "styled-components";
import defaultTheme from "../../styles/commons";

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border: 0px;
`;

Container.defaultProps = {
  theme: defaultTheme,
};

export const TableWrapper = styled.div`
  position: relative;
`;

export const StyledTable = styled.table`
  width: 100%;
  thead {
    width: 20%;
    tr {
      box-shadow: none;
      background: ${({ theme }) => theme.colors.secondary};
      border-bottom: 1px solid ${({ theme }) => theme.colors.textOnBackground};
      th {
        border-right: 0px;
        text-align: start;
        color: ${({ theme }) => theme.colors.textOnSecondary};
        height: 30px;
        user-select: none;
        position: relative;
        padding: 0px 10px;
      }
    }
  }

  tbody {
    border-bottom: 1px solid ${({ theme }) => theme.colors.textOnBackground};
    tr {
      background: ${({ theme }) => theme.colors.backgroundWhite};
      td {
        border: 0px;
        height: 50px;
        padding: 0px 10px;
      }
    }
  }
`;

StyledTable.defaultProps = { theme: defaultTheme };

export const Loading = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 8rem;
  background-color: ${({ theme }) => theme.colors.backgroundWhite};
`;

Loading.defaultProps = { theme: defaultTheme };

export const NoData = styled.span`
  background-color: ${({ theme }) => theme.colors.background};
  padding: 10px 20px;
  margin: 20px 0px;
  max-width: 125px;
  text-align: center;
`;

NoData.defaultProps = { theme: defaultTheme };

export const NoDataWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 120px;
`;
