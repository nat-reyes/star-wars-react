import { Container, TableWrapper, StyledTable } from "./styles";
import PropTypes from "prop-types";
function Table({ columns, data, manual, pageCount }) {
  const getItemValue = (item, columnName) => item[columnName];

  const renderFieldData = (item) =>
    columns.map((column, idx) => (
      <td key={idx}> {getItemValue(item, column?.index)}</td>
    ));

  return (
    <Container>
      <TableWrapper>
        <StyledTable>
          <thead>
            <tr>
              {columns.map((column, idx) => (
                <th key={idx}>{column?.Header || "no data"}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.length &&
              data.map((item, idx) => {
                return (
                  <tr key={idx}>
                    {columns.map((column, idx) => (
                      <td key={idx}>{getItemValue(item, column?.index)}</td>
                    ))}
                  </tr>
                );
              })}
          </tbody>
        </StyledTable>
      </TableWrapper>
    </Container>
  );
}

Table.defaultProps = {
  columns: PropTypes.arrayOf(PropTypes.shape({})),
  data: PropTypes.arrayOf(PropTypes.shape({})),
};
export default Table;
