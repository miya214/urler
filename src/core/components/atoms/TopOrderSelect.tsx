import { VFC } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const OrderSelect: VFC<{
  selectValue: string;
  changeEvent: (e: SelectChangeEvent<string>) => void;
}> = ({ selectValue, changeEvent }) => (
  <Box sx={{ minWidth: 120 }}>
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">並べ替え</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectValue}
        label="並べ替え"
        onChange={changeEvent}
      >
        <MenuItem value="-posts_add">新しい順</MenuItem>
        <MenuItem value="posts_add">古い順</MenuItem>
      </Select>
    </FormControl>
  </Box>
);

export default OrderSelect;
