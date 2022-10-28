import PropTypes from "prop-types";
import {
  Wrapper,
  Page,
  ArrowLeft,
  PageDisplay,
  ArrowRight,
  ArrowContainer,
} from "./styles";
import { useState } from "react";

function Pagination({ onPageChange, pagination }) {
  const { page, pageCount, pageSize } = pagination;

  const [previousIsDisabled, setPreviousIsDisabled] = useState(page === 1);
  const [nextIsDisabled, setNextIsDisabled] = useState(
    pageSize * page > pageCount
  );

  const previousPage = () => {
    if (page === 1) return setPreviousIsDisabled(true);
    onPageChange(page - 1);
    setPreviousIsDisabled(true);
  };
  const nextPage = () => {
    if (pageSize * page > pageCount) return setNextIsDisabled(true);
    onPageChange(page + 1);
  };

  return (
    <Wrapper>
      <Page>
        <ArrowContainer disabled={previousIsDisabled}>
          <ArrowLeft onClick={previousPage} disabled={previousIsDisabled} />
        </ArrowContainer>
        <PageDisplay>{`Page: ${page}`}</PageDisplay>
        <ArrowContainer disabled={nextIsDisabled}>
          <ArrowRight onClick={nextPage} disabled={nextIsDisabled} />
        </ArrowContainer>
      </Page>
    </Wrapper>
  );
}

Pagination.propTypes = {
  onPageChange: PropTypes.func.isRequired,
};
export default Pagination;
