import { VFC, useEffect, useState, MouseEvent } from 'react';
import { CircularProgress, Icon, IconButton } from '@material-ui/core';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../stores/app/store';
import { selectMyProfile } from '../../stores/slices/profile/profileSlice';

import {
  selectIsLoadingFavorite,
  fetchFavoriteStart,
  fetchFavoriteEnd,
  fetchAsyncPostFavorite,
} from '../../stores/slices/folder/folderSlice';

const FavoriteButton: VFC<{
  id: string;
  favorite: string[];
}> = ({ id, favorite }) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  const myProfile = useSelector(selectMyProfile);
  const isLoadingFavorite = useSelector(selectIsLoadingFavorite);

  useEffect(() => {
    favorite.forEach((user) => {
      if (user === myProfile.user) {
        setIsFavorite(true);
      }
    });
  }, [favorite, myProfile.user]);

  const clickFavoriteIcon = async () => {
    dispatch(fetchFavoriteStart());
    const result = await dispatch(fetchAsyncPostFavorite(id));
    setIsFavorite(!isFavorite);
    dispatch(fetchFavoriteEnd());
  };

  return (
    <>
      {!isLoadingFavorite ? (
        <IconButton
          color="primary"
          type="button"
          component="button"
          onClick={clickFavoriteIcon}
        >
          {isFavorite ? <StarIcon /> : <StarBorderIcon />}
        </IconButton>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default FavoriteButton;
