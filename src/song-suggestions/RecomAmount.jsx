import React, { useState } from 'react'
import styled from 'styled-components'
import Modal from './Modal'

export default function RecomAmount({ amount, setAmount, chosenArtist, chosenSong, chosenGenre, setStep }) {
    const [showModal, setShowModal] = useState(false)

    function checkSeeds() {
        if (!chosenArtist && !chosenSong && !chosenGenre) {
            setShowModal(true)
        } else {
            setStep(6)
        }
    }

    return (
        <MainContainer>
            {showModal ?
                <Modal setShowModal={setShowModal} />
                : null
            }
            <H2>How many recommendations do you want?</H2>
            <Container>
                <Input type="range" min="1" max="100" value={amount} onInput={(e) => setAmount(e.target.value)} />
                <Amount>{amount}</Amount>
            </Container>
            <ButtonContainer>
                <Button onClick={() => setStep(4)}>Previous</Button>
                <Button onClick={() => checkSeeds()}>Get recommendations</Button>
            </ButtonContainer>
        </MainContainer>
    )
}

const MainContainer = styled.div`
width: 100%;

@media screen and (max-width: 850px) {
 width: 750px;
}
@media screen and (max-width: 750px) {
 width: 650px;
}
@media screen and (max-width: 650px) {
 width: 550px;
}
@media screen and (max-width: 550px) {
 width: 450px;
}
@media screen and (max-width: 450px) {
 width: 350px;
}
`
const Container = styled.div`
position: relative;
display: grid;
max-width: 100%;
min-height: 200px;
width: 800px;
align-items: flex-start;
grid-template-columns: 1fr;
margin: 0 auto;
min-width: 90%

@media screen and (max-width: 850px) {
  grid-template-columns: 1fr;
  grid-template-rows: 50px 1fr;
  justify-items: center;
}
`
const Input = styled.input`
-webkit-appearance: none;
appearance: none;
background: #148255;
cursor: pointer;
width: 500px;
height: 20px;
border-radius: 40px;
margin: 0 auto;

&::-webkit-slider-thumb {
-webkit-appearance: none;
 width: 40px;
 height: 40px;
 background: #ffffff;
 border-radius: 40px;
}

&::-moz-range-thumb {
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 40px;
}

@media screen and (max-width: 550px) {
    width: 300px;
  }
`
const Amount = styled.p`
color: #ffffff;
font-size: 6rem;
margin-top: 1rem;
`
const ButtonContainer = styled.div`
width: 95%;
max-width: 850px;
margin: 0 auto;
display: flex;
justify-content: space-between;

@media screen and (max-width: 320px) {
    flex-direction: column;
  }
`
const Button = styled.button`
background: #148255;
border: none;
color: #fff;
padding: 15px;
font-size: 1rem;
cursor: pointer;
margin-top: 20px;
font-weight: 600;
`
const H2 = styled.h2``