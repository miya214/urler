import { VFC } from 'react';

import { red } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import FavoriteButton from '../../atoms/Buttons/FavoriteButton';
import {
  FolderDetailInfoWrapper,
  FolderDetailInfoData,
  FolderDetailInfoDataTitle,
  FolderDetailInfoButtons,
  FolderDetailInfoDataText,
} from './FolderElements';

interface FOLDER {
  id: string;
  user: string;
  name: string;
  public: boolean;
  posts_add: string;
  favorite: string[];
}

const FolderDetailInfo: VFC<{
  folder: FOLDER;
  user: string;
  openEditFolder: () => void;
  openDeleteFolder: () => void;
}> = ({ folder, user, openEditFolder, openDeleteFolder }) => (
  <FolderDetailInfoWrapper>
    <FolderDetailInfoData>
      <FolderDetailInfoDataTitle>{folder.name}</FolderDetailInfoDataTitle>
      <FolderDetailInfoDataText>User: {folder.user}</FolderDetailInfoDataText>
      <FolderDetailInfoDataText>
        作成日: {folder.posts_add}
      </FolderDetailInfoDataText>
    </FolderDetailInfoData>
    <FolderDetailInfoButtons>
      <FavoriteButton id={folder.id} favorite={folder.favorite} />
      {folder.user === user && (
        <>
          <IconButton aria-label="edit" size="large" onClick={openEditFolder}>
            <EditOutlinedIcon fontSize="inherit" sx={{ color: '#79bd9a' }} />
          </IconButton>
          <IconButton
            aria-label="delete"
            size="large"
            onClick={openDeleteFolder}
          >
            <DeleteForeverOutlinedIcon
              fontSize="inherit"
              sx={{ color: red[300] }}
            />
          </IconButton>
        </>
      )}
    </FolderDetailInfoButtons>
  </FolderDetailInfoWrapper>
);

export default FolderDetailInfo;
