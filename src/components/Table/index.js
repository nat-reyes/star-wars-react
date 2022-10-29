import PropTypes from "prop-types";
import React, { useMemo } from "react";
import Pagination from "./Pagination";
import { Container, StyledTable, NoDataWrapper, NoData } from "./styles";

function Table({ columns, data = [], onPageChange, pagination, noData }) {
  const getItemValue = (item, columnName, request, render) => {
    const fieldValue = item[columnName];
    const itNeedsRequest = request && fieldValue;

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

  const shouldShowPagination = data?.length && pagination?.page;

  return (
    <Container>
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
            data.map((item) => {
              return (
                <tr key={item?.url}>
                  {columns.map((column) => (
                    <td key={column?.index}>
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
      {noData && (
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
export default React.memo(Table);
