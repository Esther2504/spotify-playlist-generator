import React from 'react'
import styled from 'styled-components'
import Sad from './images/sadface.svg'

export default function ErrorModal({ setShowError }) {
  return (
    <Background>
      <Modal>
        <IMG src={Sad} />
        <H1>Something went wrong :(<BR />Please try again or come back later</H1>
        <Button onClick={() => setShowError(false)}>Okay!</Button>
      </Modal>
    </Background>
  )
}

const Background = styled.div`
position: absolute;
width: 100vw;
height: 100%;
background: rgb(0, 0, 0, 0.5);
z-index: 8;
`
const Modal = styled.div`
position: relative;
z-index: 9;
width: 70%;
height: 500px;
background: #2C2C2C;
top: 15vh;
left: 15%;
border-radius: 15px;
font-size: 1.5rem;
padding: 20px;

@media screen and (max-width: 1180px) {
  height: 600px;
}
`
const IMG = styled.img`
width: 200px;
`
const Button = styled.button`
background: #148255;
border: none;
color: #fff;
padding: 15px 30px;
font-size: 1.5rem;
cursor: pointer;
font-weight: 600;
`
const H1 = styled.h1``
const BR = styled.br``