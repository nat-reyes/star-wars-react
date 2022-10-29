import PropTypes from "prop-types";

import Pagination from "./Pagination";
import {
  Container,
  StyledTable,
  Loading,
  SpinnerLoading,
  NoDataWrapper,
  NoData,
} from "./styles";
import { capitalize } from "../../utils/formatFields";

function Table({
  columns,
  data = [],
  onPageChange,
  pagination,
  isLoading,
  noData,
}) {
  const getItemValue = (item, columnName, request, render) => {
    const fieldValue = item[columnName];

    const itNeedsRequest = request && fieldValue;
    console.log(render);
    if (itNeedsRequest) {
      if (Array.isArray(fieldValue)) {
        return fieldValue?.length
          ? fieldValue.map((field) => {
              const cellValue = request(field);
              return render ? render(cellValue) : "no data";
            })
          : "No data";
      }
      const cellValue = request(fieldValue);
      return render ? render(cellValue) : "No data";
    }

    return render ? render(item[columnName]) : "No data";
  };

  const shouldShowPagination = data?.length && pagination?.page && !isLoading;

  return (
    <Container>
      {isLoading && (
        <Loading>
          <SpinnerLoading />
        </Loading>
      )}
      {!isLoading && (
        <StyledTable>
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column?.index}
                  data-test-id={column?.index}
                  width={column?.width}
                >
                  {column?.Header || "no data"}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {!!data?.length &&
              data.map((item, idx) => {
                return (
                  <tr key={idx}>
                    {columns.map((column, idx) => (
                      <td key={idx}>
                        {getItemValue(
                          item,
                          column?.index,
                          column?.request,
                          column?.render
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })}
          </tbody>
        </StyledTable>
      )}
      {!isLoading && noData && (
        <NoDataWrapper>
          <NoData>No data</NoData>
        </NoDataWrapper>
      )}
      {!!shouldShowPagination && (
        <Pagination onPageChange={onPageChange} pagination={pagination} />
      )}
    </Container>
  );
}

Table.defaultProps = {
  columns: PropTypes.arrayOf(PropTypes.shape({})),
  data: PropTypes.arrayOf(PropTypes.shape({})),
};
export default Table;
