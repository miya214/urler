import { VFC, ChangeEvent } from 'react';

import { SearchField } from './InputElements';

const SearchBox: VFC<{
  changeEvent: (e: ChangeEvent<HTMLInputElement>) => void;
}> = ({ changeEvent }) => (
  <SearchField
    id="outlined-search"
    variant="outlined"
    label="検索ワード"
    type="search"
    color="primary"
    onChange={changeEvent}
  />
);

export default SearchBox;
