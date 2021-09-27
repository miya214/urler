import { VFC } from 'react';
import {
  SearchResultInfoWrapper,
  SearchResultCount,
  SearchQueryParamsTexts,
  SearchQueryParamsText,
} from './MainElements';

interface QUERY_PARAMS {
  searchText: string;
  orderingText: string;
  Public: string;
}

const SearchResultInfo: VFC<{ count: number; queryparams: QUERY_PARAMS }> = ({
  count,
  queryparams,
}) => (
  <SearchResultInfoWrapper>
    <SearchResultCount>{count}</SearchResultCount>
    <SearchQueryParamsTexts>
      <SearchQueryParamsText>{queryparams.searchText}</SearchQueryParamsText>
      <SearchQueryParamsText>{queryparams.orderingText}</SearchQueryParamsText>
      <SearchQueryParamsText>{queryparams.Public}</SearchQueryParamsText>
    </SearchQueryParamsTexts>
  </SearchResultInfoWrapper>
);

export default SearchResultInfo;
