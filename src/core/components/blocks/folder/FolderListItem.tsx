import { VFC } from 'react';
import FolderIcon from '@mui/icons-material/Folder';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import { FListItem, FListItemText, FolderAvatar } from './FolderElements';

interface FOLDER {
  id: string;
  user: string;
  name: string;
  public: boolean;
  posts_add: string;
  favorite: string[] | null;
}

const FolderListItem: VFC<{ folder: FOLDER }> = ({ folder }) => (
  <FListItem>
    <ListItemAvatar>
      <FolderAvatar>
        <FolderIcon />
      </FolderAvatar>
    </ListItemAvatar>
    <FListItemText primary={folder.name} secondary={folder.posts_add} />
  </FListItem>
);

export default FolderListItem;
