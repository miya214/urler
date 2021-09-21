import { VFC } from 'react';

const PublicSelect: VFC<{
  checkedNot: () => void;
  checkedPublic: () => void;
  checkedPrivate: () => void;
}> = ({ checkedNot, checkedPublic, checkedPrivate }) => (
  <div>
    <label htmlFor="not">
      指定しない
      <input
        id="not"
        type="radio"
        name="aradio"
        value="A"
        onChange={checkedNot}
        defaultChecked
      />
    </label>
    <br />
    <label htmlFor="public">
      公開
      <input
        id="public"
        type="radio"
        name="aradio"
        value="B"
        onChange={checkedPublic}
      />
    </label>
    <br />
    <label htmlFor="private">
      非公開
      <input
        id="private"
        type="radio"
        name="aradio"
        onChange={checkedPrivate}
      />
    </label>
  </div>
);

export default PublicSelect;
