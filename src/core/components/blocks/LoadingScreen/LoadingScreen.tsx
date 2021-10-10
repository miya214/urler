import { VFC } from 'react';
import { LoadingScreenBody, LoadingText } from './LoadingScreenElements';

const LoadingScreen: VFC = () => (
  <LoadingScreenBody>
    <LoadingText>
      <span>L</span>
      <span>o</span>
      <span>a</span>
      <span>d</span>
      <span>i</span>
      <span>n</span>
      <span>g</span>
      <span>.</span>
      <span>.</span>
      <span>.</span>
    </LoadingText>
  </LoadingScreenBody>
);

export default LoadingScreen;
