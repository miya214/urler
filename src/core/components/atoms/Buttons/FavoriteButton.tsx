import { VFC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { IconButton } from '@material-ui/core';
import { amber } from '@mui/material/colors';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

import { AppDispatch } from '../../../stores/app/store';

import {
  resetIsAuth,
  setAuthErrorMessage,
} from '../../../stores/slices/auth/authSlice';

import { selectMyProfile } from '../../../stores/slices/profile/profileSlice';

import {
  selectIsLoadingFavorite,
  fetchFavoriteStart,
  fetchFavoriteEnd,
  fetchAsyncPostFavorite,
} from '../../../stores/slices/folder/folderSlice';

import {
  setInfoMessage,
  setIsExistInfoMessage,
  resetIsExistInfoMessage,
} from '../../../stores/slices/message/messageSlice';

import Loading from '../Loader';

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
    dispatch(resetIsExistInfoMessage());
    const result = await dispatch(fetchAsyncPostFavorite(id));
    if (fetchAsyncPostFavorite.rejected.match(result)) {
      dispatch(
        setAuthErrorMessage(
          'アクセストークンの有効期限が切れました。再ログインしてください'
        )
      );
      dispatch(resetIsAuth());
    }
    if (fetchAsyncPostFavorite.fulfilled.match(result)) {
      dispatch(resetIsExistInfoMessage());
      setIsFavorite(!isFavorite);
      dispatch(fetchFavoriteEnd());
      if (isFavorite) {
        dispatch(setInfoMessage('お気に入りを解除しました'));
      } else {
        dispatch(setInfoMessage('お気に入りに登録しました'));
      }
      dispatch(setIsExistInfoMessage());
    }
  };

  return (
    <>
      {!isLoadingFavorite ? (
        <IconButton
          type="button"
          component="button"
          onClick={clickFavoriteIcon}
        >
          {isFavorite ? (
            <StarIcon sx={{ color: amber[300] }} />
          ) : (
            <StarBorderIcon sx={{ color: amber[300] }} />
          )}
        </IconButton>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default FavoriteButton;
