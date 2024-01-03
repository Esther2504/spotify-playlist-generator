import React from 'react'
import styled from 'styled-components'

export default function Loading() {
  return (
    <Spinner>
      <Circle />
      <Circle />
      <Circle />
      <Circle />
      <Circle />
    </Spinner>
  )
}

const Spinner = styled.div`
position: relative;
`
const Circle = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 90px;
  backgCircle: white;
  animation: spinner 0.7s cubic-bezier(.38,.55,.8,.38) infinite;
  position: absolute;
  top: 0;
  left: 0;

&:nth-child(2) {
  animation: spinner 0.8s cubic-bezier(.38,.55,.8,.38) infinite;
}

&:nth-child(3) {
  animation: spinner 0.9s cubic-bezier(.38,.55,.8,.38) infinite;
}

&:nth-child(4) {
  animation: spinner 1s cubic-bezier(.38,.55,.8,.38) infinite;
}

&:nth-child(5) {
  animation: spinner 1.1s cubic-bezier(.38,.55,.8,.38) infinite;
}

@keyframes spinner {
  0% {
    transform: rotate(0deg)
    translate(-50px);
  }
  100% {
    transform: rotate(360deg)
    translate(-50px);
  }
}
`