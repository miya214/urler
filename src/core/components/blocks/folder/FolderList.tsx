import { VFC, ReactNode } from 'react';

import { FList } from './FolderElements';

const FolderList: VFC<{ children: ReactNode }> = ({ children }) => (
  <FList sx={{ width: '100%', bgcolor: 'background.paper' }}>{children}</FList>
);

export default FolderList;
