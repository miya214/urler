import { VFC } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PostURLField from './PostURLField';

import { PostListItemName, PostListItemText } from './PostsElements';

interface POST {
  id: string;
  url: string;
  name: string;
  text: string;
  folder: string;
}

const PostListItem: VFC<{ post: POST }> = ({ post }) => (
  <Accordion sx={{ borderBottom: '1px solid #a7a7a7' }}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
      sx={{ width: '100%' }}
    >
      <PostListItemName>{post.name}</PostListItemName>
    </AccordionSummary>
    <AccordionDetails>
      <PostURLField url={post.url} />
      <PostListItemText>{post.text}</PostListItemText>
    </AccordionDetails>
  </Accordion>
);

export default PostListItem;
