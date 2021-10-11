import { VFC, ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { selectActiveIndex } from '../../../stores/slices/bar/barSlice';

import {
  MainHeaderItemWrapper,
  MainHeaderLeftItems,
  MainHeaderTitle,
} from './MainElements';

import { SidebarData } from '../bar/SidebarData';

const MainHeader: VFC<{
  title: string;
  isHistory: boolean;
  buttonElem: ReactElement | null;
}> = ({ title, isHistory, buttonElem }) => {
  const history = useHistory();
  const activeIndex = useSelector(selectActiveIndex);

  return (
    <MainHeaderItemWrapper>
      <MainHeaderLeftItems>
        {isHistory && (
          <IconButton
            aria-label="back"
            onClick={() => {
              history.push(SidebarData[activeIndex].path);
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        )}
        <MainHeaderTitle>{title}</MainHeaderTitle>
      </MainHeaderLeftItems>
      {buttonElem}
    </MainHeaderItemWrapper>
  );
};
// const MainHeader: VFC<{
//   title: string;
//   isHistory: boolean;
//   buttonText: string;
//   clickOpenModalFunc: () => void;
// }> = ({ title, isHistory, buttonText, clickOpenModalFunc }) => {
//   const history = useHistory();
//   const activeIndex = useSelector(selectActiveIndex);

//   return (
//     <MainHeaderItemWrapper>
//       <MainHeaderLeftItems>
//         {isHistory && (
//           <IconButton
//             aria-label="back"
//             onClick={() => {
//               history.push(SidebarData[activeIndex].path);
//             }}
//           >
//             <ArrowBackIcon />
//           </IconButton>
//         )}
//         <MainHeaderTitle>{title}</MainHeaderTitle>
//       </MainHeaderLeftItems>
//       <OpenModalBtn onClick={clickOpenModalFunc}>{buttonText}</OpenModalBtn>
//     </MainHeaderItemWrapper>
//   );
// };

export default MainHeader;
