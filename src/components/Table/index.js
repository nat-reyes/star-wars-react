import PropTypes from "prop-types";
import React from "react";
import Pagination from "./Pagination";
import { Container, StyledTable, NoDataWrapper, NoData } from "./styles";

/**
 * Table component
 * @param columns
 * @param data
 * @param onPageChange
 * @param pagination
 * @param noData
 * @param isSearching
 */
function Table({
  columns,
  data = [],
  onPageChange,
  pagination,
  noData,
  isSearching,
}) {
  const validateIfFieldNeedsRequest = (isArray, request, fieldValue) => {
    const checkArray = () => {
      if (isArray) {
        return fieldValue.some((field) => field.includes("https"));
      }

      if (typeof fieldValue === "string") {
        return fieldValue.includes("https");
      }
      return false;
    };

    return request && checkArray();
  };
  const getItemValue = (item, columnName, request, render) => {
    const fieldValue = item[columnName];
    const isArray = Array.isArray(fieldValue);

    const itNeedsRequest = validateIfFieldNeedsRequest(
      isArray,
      request,
      fieldValue
    );

    const itemAlreadyRequested =
      isSearching?.length > 1 &&
      isSearching.find((item) => {
        if (isArray) {
          return fieldValue?.some((field) => field === item?.itemId);
        }
        return item?.itemId === fieldValue;
      });

    if (itemAlreadyRequested?.state) {
      return;
    }

    if (itNeedsRequest) {
      if (isArray) {
        return fieldValue?.length
          ? fieldValue.map((field) => {
              const cellValue = request(field, item?.url);
              return render ? render(cellValue) : "no data";
            })
          : "No data";
      }
      const cellValue = request(fieldValue, item?.url);
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
