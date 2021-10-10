import styled, { keyframes } from 'styled-components';

export const LoadingScreenBody = styled.div`
  height: 100vh;
  width: 100%;
  position: relative;
  background: #f8f8f8;
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export const LoadingText = styled.p`
  position: absolute;
  color: #79bd9a;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1em;
  & span {
    padding: 0 3px;
    animation: ${fadeIn} 1s infinite;
  }
  & span:nth-child(2) {
    animation-delay: 100ms;
  }
  & span:nth-child(3) {
    animation-delay: 200ms;
  }
  & span:nth-child(4) {
    animation-delay: 300ms;
  }
  & span:nth-child(5) {
    animation-delay: 400ms;
  }
  & span:nth-child(6) {
    animation-delay: 500ms;
  }
  & span:nth-child(7) {
    animation-delay: 600ms;
  }
  & span:nth-child(8) {
    animation-delay: 700ms;
  }
  & span:nth-child(9) {
    animation-delay: 800ms;
  }
  & span:nth-child(10) {
    animation-delay: 900ms;
  }
`;
