import { VFC } from 'react';

import FolderIcon from '@mui/icons-material/Folder';

import ListItemAvatar from '@mui/material/ListItemAvatar';

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
