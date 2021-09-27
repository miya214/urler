import { VFC, MouseEvent } from 'react';

import { SearchBtn } from './ButtonDesign';

const SearchButton: VFC<{
  ButtonText: string;
}> = ({ ButtonText }) => <SearchBtn type="submit">{ButtonText}</SearchBtn>;

export default SearchButton;
