import { VFC, useEffect } from 'react';
import './App.css';

import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { AppDispatch } from './stores/app/store';
import RouteComponent from './components/route/Route';

import { setIsAuth, resetIsAuth } from './stores/slices/auth/authSlice';

import {
  fetchProfStart,
  fetchProfEnd,
  fetchAsyncGetMyProf,
  selectIsLoadingProf,
} from './stores/slices/profile/profileSlice';

const App: VFC = () => {
  const dispatch: AppDispatch = useDispatch();
  const isLoadingProf = useSelector(selectIsLoadingProf);

  useEffect(() => {
    const fetchDataLoader = async () => {
      dispatch(setIsAuth());
      dispatch(fetchProfStart());
      const result = await dispatch(fetchAsyncGetMyProf());
      if (fetchAsyncGetMyProf.rejected.match(result)) {
        dispatch(resetIsAuth());
        dispatch(fetchProfEnd());
        return;
      }
      dispatch(fetchProfEnd());
    };
    fetchDataLoader().catch((e) => {
      console.log(e);
    });
  }, [dispatch]);

  return (
    <div className="App">
      <div className="main">
        {!isLoadingProf ? <RouteComponent /> : <CircularProgress />}
      </div>
    </div>
  );
};

export default App;
