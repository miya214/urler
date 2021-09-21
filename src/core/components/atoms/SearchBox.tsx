import { VFC, ChangeEvent, FormEvent } from 'react';
import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';

const SearchBox: VFC<{
  changeEvent: (e: ChangeEvent<HTMLInputElement>) => void;
}> = ({ changeEvent }) => (
  <TextField
    id="filled-search"
    label="検索"
    type="search"
    variant="filled"
    onChange={changeEvent}
  />
);

export default SearchBox;
