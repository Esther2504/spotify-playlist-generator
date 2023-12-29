import React from 'react'
import styled from 'styled-components'

export default function RecomAmount({ amount, setAmount, chosenArtists, chosenSongs, chosenGenres, setStep }) {

    console.log(chosenArtists)

    function checkSeeds() {
        if (!chosenArtists && !chosenSongs && !chosenGenres) {
            alert("Choose at least 1 artist, song or genre")
        } else {
            setStep(6)
        }
    }

    return (
        <>
            <Container>
                <h2>How many recommendations do you want?</h2>
                <Input type="number" min="1" max="100" value={amount} onInput={(e) => setAmount(e.target.value)} />
            </Container>
            <ButtonContainer>
                <SmallButton onClick={() => setStep(4)}>Previous</SmallButton>
                <SmallButton onClick={() => checkSeeds()}>Get recommendations</SmallButton>
            </ButtonContainer>
        </>
    )
}

const Container = styled.div`
width: 100%;
height: 600px;
max-width: 1500px;
display: flex;
flex-direction: column;
align-items: center;
`

const ButtonContainer = styled.div`
width: 100%;
max-width: 850px;
margin: 0 auto;
display: flex;
justify-content: space-between;
`

const Input = styled.input`
width: 100px;
height: 70px;
width: 100px;
font-size: 2.5rem;
font-weight: bold;
padding: 0.5rem;
`

const SmallButton = styled.button`
background: #148255;
border: none;
color: #fff;
padding: 15px;
font-size: 1rem;
cursor: pointer;
margin-top: 20px;
`