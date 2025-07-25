import styled, { keyframes } from 'styled-components';

const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const SliderContainerStyled = styled.div`
  overflow: hidden;
  width: 100%;
  position: relative;

`;

const SliderTrackStyled = styled.div`
  display: flex;
  width: max-content;
  animation: ${scroll} 20s linear infinite;
  &:hover {
    animation-play-state: paused;
  }
`;

const SlideItemStyled = styled.div`
  flex: 0 0 auto;
  margin: 0 1rem;
  pointer-events: auto; /* allow hover on content */
`;

const SliderContentStyled = styled.div`
    
`;

export {SliderContainerStyled,SliderTrackStyled,SlideItemStyled, SliderContentStyled}