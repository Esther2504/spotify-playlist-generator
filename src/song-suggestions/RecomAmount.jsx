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
        <ContainerContainer>
            {showModal ?
        <Modal setShowModal={setShowModal} />
        : null    
        }
        <h2>How many recommendations do you want?</h2>
            <Container>
                <Input type="range" min="1" max="100" value={amount} onInput={(e) => setAmount(e.target.value)} />
            <Amount>{amount}</Amount>
            </Container>
            <ButtonContainer>
                <SmallButton onClick={() => setStep(4)}>Previous</SmallButton>
                <SmallButton onClick={() => checkSeeds()}>Get recommendations</SmallButton>
            </ButtonContainer>
        </ContainerContainer>
    )
}

const ContainerContainer = styled.div`
// max-width: 800px;
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

const Input = styled.input`
// width: 100px;
// height: 70px;
// width: 100px;
// font-size: 2.5rem;
// font-weight: bold;
// padding: 0.5rem;
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

const SmallButton = styled.button`
background: #148255;
border: none;
color: #fff;
padding: 15px;
font-size: 1rem;
cursor: pointer;
margin-top: 20px;
font-weight: 600;
`