import { VFC } from 'react';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import DirectionsIcon from '@mui/icons-material/Directions';

const PostURLField: VFC<{ url: string }> = ({ url }) => (
  <Paper
    component="form"
    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
  >
    <InputBase
      sx={{ ml: 1, flex: 1 }}
      value={url}
      inputProps={{ readOnly: true, 'aria-label': 'url' }}
    />
    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
    <a href={url} target="_blank" rel="noopener noreferrer">
      <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
        <DirectionsIcon />
      </IconButton>
    </a>
  </Paper>
);

export default PostURLField;
