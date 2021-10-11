import { VFC } from 'react';

import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@mui/material';

import { PublicRadioWrapper } from './InputElements';

const PublicSelect: VFC<{
  checkedNot: () => void;
  checkedPublic: () => void;
  checkedPrivate: () => void;
}> = ({ checkedNot, checkedPublic, checkedPrivate }) => (
  <PublicRadioWrapper>
    <FormControl component="fieldset">
      <FormLabel component="legend">公開設定</FormLabel>
      <RadioGroup
        row
        aria-label="public"
        defaultValue=""
        name="row-radio-buttons-group"
      >
        <FormControlLabel
          value=""
          control={<Radio size="small" />}
          label="未指定"
          onChange={checkedNot}
        />
        <FormControlLabel
          value="true"
          control={<Radio size="small" />}
          label="公開"
          onChange={checkedPublic}
        />
        <FormControlLabel
          value="false"
          control={<Radio size="small" />}
          label="非公開"
          onChange={checkedPrivate}
        />
      </RadioGroup>
    </FormControl>
  </PublicRadioWrapper>
);

export default PublicSelect;
