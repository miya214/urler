import { VFC } from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { TopLinkBtn } from './ButtonDesign';

const TopLinkButton: VFC = () => (
  <TopLinkBtn to="/">
    <HomeIcon />
  </TopLinkBtn>
);

export default TopLinkButton;
