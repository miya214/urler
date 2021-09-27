import { VFC, ChangeEvent, FormEvent } from 'react';
import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';
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
