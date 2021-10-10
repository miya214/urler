import { VFC, useEffect } from 'react';
import './App.css';

import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from './stores/app/store';
import RouteComponent from './components/route/Route';

import {
  setIsAuth,
  resetIsAuth,
  setAuthErrorMessage,
} from './stores/slices/auth/authSlice';

import {
  fetchProfStart,
  fetchProfEnd,
  fetchAsyncGetMyProf,
  selectIsLoadingProf,
} from './stores/slices/profile/profileSlice';

import {
  fetchFolderStart,
  fetchFolderEnd,
  fetchAsyncGetMyFolders,
} from './stores/slices/folder/folderSlice';

import LoadingScreen from './components/blocks/LoadingScreen/LoadingScreen';

const App: VFC = () => {
  const dispatch: AppDispatch = useDispatch();
  const isLoadingProf = useSelector(selectIsLoadingProf);

  useEffect(() => {
    const fetchDataLoader = async () => {
      dispatch(setIsAuth());
      dispatch(fetchProfStart());
      const result = await dispatch(fetchAsyncGetMyProf());
      if (fetchAsyncGetMyProf.rejected.match(result)) {
        if (!localStorage.ajt) {
          dispatch(
            setAuthErrorMessage(
              'ログインまたはアカウントの作成を行ってください'
            )
          );
        } else {
          dispatch(
            setAuthErrorMessage(
              'アクセストークンの有効期限が切れています。再ログインしてください'
            )
          );
        }
        dispatch(resetIsAuth());
        dispatch(fetchProfEnd());
        return;
      }
      if (fetchAsyncGetMyProf.fulfilled.match(result)) {
        dispatch(fetchFolderStart());
        await dispatch(fetchAsyncGetMyFolders());
        dispatch(fetchFolderEnd());
      }
      dispatch(fetchProfEnd());
    };
    fetchDataLoader().catch((e) => {
      console.log(e);
    });
  }, [dispatch]);

  return (
    <div className="App">
      {!isLoadingProf ? <RouteComponent /> : <LoadingScreen />}
    </div>
  );
};

export default App;
