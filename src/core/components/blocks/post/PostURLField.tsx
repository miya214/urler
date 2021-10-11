import { VFC } from 'react';

import { Paper, InputBase, Divider, IconButton } from '@mui/material';
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
