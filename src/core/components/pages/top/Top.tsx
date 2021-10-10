import { VFC, useEffect, useCallback, useState, FormEvent } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
// import InfiniteScroll from 'react-infinite-scroller';
// import { CircularProgress } from '@material-ui/core';
// import Divider from '@mui/material/Divider';
// import { AppDispatch } from '../../../stores/app/store';
// import NewFolder from '../../blocks/folder/NewFolder';
// import { resetIsAuth } from '../../../stores/slices/auth/authSlice';

// import {
//   selectMyFolders,
//   selectFolders,
//   selectIsLoadingFolder,
//   selectIsSetFolder,
//   selectHasMyFolder,
//   setOpenNewFolder,
//   fetchFolderStart,
//   fetchFolderEnd,
//   fetchAsyncGetMyFolders,
//   fetchAsyncGetFolders,
//   setFolder,
//   setHasMyFolder,
//   resetMyFoldersCount,
// } from '../../../stores/slices/folder/folderSlice';
// import {
//   resetPostsCount,
//   setIsExistPosts,
// } from '../../../stores/slices/post/postSlice';

// import { setActiveIndex } from '../../../stores/slices/bar/barSlice';

// import SearchBox from '../../atoms/Input/SearchBox';
// import PublicSelect from '../../atoms/Input/PublicSelect';
// import OrderSelect from '../../atoms/OrderSelect';
// import {
//   MainBody,
//   FolderSection,
//   SearchSection,
//   SearchContent,
//   SearchFieldWrapper,
//   NotFoundText,
//   LoadingWrapper,
// } from '../../blocks/main/MainElements';
// import FolderList from '../../blocks/folder/FolderList';
// import FolderListItem from '../../blocks/folder/FolderListItem';
// import { FolderItemLink } from '../../blocks/folder/FolderElements';
// import SearchButton from '../../atoms/Buttons/SearchButton';
// import Loading from '../../atoms/Loader';
// import MainHeader from '../../blocks/main/MainHeader';

// const TopPage: VFC = () => {
//   const hasMyFolder = useSelector(selectHasMyFolder);
//   const dispatch: AppDispatch = useDispatch();

//   const [searchText, setSearchText] = useState<string>('');
//   const [orderingText, setOrderingText] = useState<string>('');
//   const [Public, setPublic] = useState<string>('');
//   const isSetfolder = useSelector(selectIsSetFolder);
//   const myfolders = useSelector(selectMyFolders);
//   const isLoadingFolder = useSelector(selectIsLoadingFolder);

//   const [hasMore, setHasMore] = useState<boolean>(true);

//   useEffect(() => {
//     dispatch(setActiveIndex(0));
//   }, [dispatch]);

//   const loadMore = async (page: number) => {
//     const nextUrl = myfolders.next;
//     if (!nextUrl && myfolders.count !== 0) {
//       setHasMore(false);
//       return;
//     }

//     const result = await dispatch(
//       fetchAsyncGetMyFolders({
//         url: nextUrl,
//         search: '',
//         ordering: '',
//         public: '',
//       })
//     );
//     if (fetchAsyncGetMyFolders.rejected.match(result)) {
//       dispatch(resetIsAuth());
//     }
//   };

//   const searchFolder = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setHasMore(true);
//     dispatch(setHasMyFolder());
//     dispatch(fetchFolderStart());
//     dispatch(resetMyFoldersCount());
//     const result = await dispatch(
//       fetchAsyncGetMyFolders({
//         url: '',
//         search: searchText,
//         ordering: orderingText,
//         public: Public,
//       })
//     );
//     if (fetchAsyncGetMyFolders.rejected.match(result)) {
//       dispatch(resetIsAuth());
//     }
//     dispatch(fetchFolderEnd());
//   };

//   const foldersList = (
//     <FolderList>
//       {myfolders.results.map((folder) => (
//         <FolderItemLink
//           key={folder.id}
//           to={`/folder/${folder.id}`}
//           onClick={() => {
//             dispatch(resetPostsCount());
//             dispatch(
//               setFolder({
//                 id: folder.id,
//                 user: folder.user,
//                 name: folder.name,
//                 public: folder.public,
//                 posts_add: folder.posts_add,
//                 favorite: folder.favorite,
//               })
//             );

//             dispatch(setIsExistPosts());
//           }}
//         >
//           <FolderListItem folder={folder} />
//           <Divider />
//         </FolderItemLink>
//       ))}
//     </FolderList>
//   );

//   const loader = (
//     <LoadingWrapper className="loader" key={0}>
//       <Loading />
//     </LoadingWrapper>
//   );

//   return (
//     <>
//       <NewFolder />
//       <MainHeader
//         title="トップ"
//         isHistory={false}
//         path=""
//         buttonText="作成"
//         clickOpenModalFunc={() => {
//           dispatch(setOpenNewFolder());
//         }}
//       />
//       <MainBody>
//         <SearchSection>
//           <SearchContent>
//             <SearchFieldWrapper>
//               <form onSubmit={(e) => searchFolder(e)}>
//                 <SearchBox changeEvent={(e) => setSearchText(e.target.value)} />
//                 <PublicSelect
//                   checkedNot={() => setPublic('')}
//                   checkedPublic={() => setPublic('true')}
//                   checkedPrivate={() => setPublic('false')}
//                 />
//                 <OrderSelect
//                   selectValue={orderingText}
//                   changeEvent={(e) => setOrderingText(e.target.value)}
//                 />
//                 <SearchButton ButtonText="検索" />
//               </form>
//             </SearchFieldWrapper>
//           </SearchContent>
//         </SearchSection>
//         <FolderSection>
//           {!isLoadingFolder ? (
//             hasMyFolder ? (
//               <InfiniteScroll
//                 loadMore={loadMore}
//                 hasMore={hasMore}
//                 loader={loader}
//               >
//                 {foldersList}
//               </InfiniteScroll>
//             ) : (
//               <NotFoundText>フォルダが見つかりませんでした。</NotFoundText>
//             )
//           ) : (
//             <LoadingWrapper>
//               <Loading />
//             </LoadingWrapper>
//           )}
//         </FolderSection>
//       </MainBody>
//     </>
//   );
// };

// export default TopPage;
