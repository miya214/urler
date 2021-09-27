import { VFC } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { PublicRadioWrapper } from './InputElements';

const PublicSelect: VFC<{
  checkedNot: () => void;
  checkedPublic: () => void;
  checkedPrivate: () => void;
}> = ({ checkedNot, checkedPublic, checkedPrivate }) => (
  // <div>
  //   <label htmlFor="not">
  //     指定しない
  //     <input
  //       id="not"
  //       type="radio"
  //       name="aradio"
  //       value="A"
  //       onChange={checkedNot}
  //       defaultChecked
  //     />
  //   </label>
  //   <br />
  //   <label htmlFor="public">
  //     公開
  //     <input
  //       id="public"
  //       type="radio"
  //       name="aradio"
  //       value="B"
  //       onChange={checkedPublic}
  //     />
  //   </label>
  //   <br />
  //   <label htmlFor="private">
  //     非公開
  //     <input
  //       id="private"
  //       type="radio"
  //       name="aradio"
  //       onChange={checkedPrivate}
  //     />
  //   </label>
  // </div>
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
          control={<Radio size="small" defaultChecked />}
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
