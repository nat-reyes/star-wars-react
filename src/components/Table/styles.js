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
      background: ${({ theme }) => theme.colors.foreground};
      border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
      th {
        border-right: 0px;
        text-align: start;
        color: ${({ theme }) => theme.colors.secondaryText};
        height: 30px;
        user-select: none;
        position: relative;
        padding: 0px 10px;
      }
    }
  }

  tbody {
    border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
    tr {
      background: ${({ theme }) => theme.colors.cardBackground};
      td {
        border: 0px;
        height: 50px;
        padding: 0px 10px;
      }
    }
  }
`;

StyledTable.defaultProps = { theme: defaultTheme };
