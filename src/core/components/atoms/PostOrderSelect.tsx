import { VFC } from 'react';

import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
} from '@mui/material';

const PostOrderSelect: VFC<{
  selectValue: string;
  changeEvent: (e: SelectChangeEvent<string>) => void;
}> = ({ selectValue, changeEvent }) => (
  <Box sx={{ minWidth: 120 }}>
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">並び替え</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectValue}
        label="order"
        onChange={changeEvent}
      >
        <MenuItem value="name">50音順</MenuItem>
        <MenuItem value="-name">50音順(逆順)</MenuItem>
      </Select>
    </FormControl>
  </Box>
);

export default PostOrderSelect;
