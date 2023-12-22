import React from 'react'
import styled from 'styled-components'

export default function RecomAmount({ amount, setAmount, chosenArtists, chosenSongs, chosenGenres, setStep }) {

    console.log(chosenArtists)

function checkSeeds() {
    if (chosenArtists.length == 0 && chosenSongs.length == 0  && chosenGenres.length == 0) {
        alert("chose at least 1 artist, song or genre")
    } else {
        setStep(6)
    }
}

    return (
        <label>
            <p>How many recommendations do you want?</p>
            <Input type="number" min="1" max="100" value={amount} onInput={(e) => setAmount(e.target.value)} /><br/>
            <SmallButton onClick={() => checkSeeds()}>Get recommendations</SmallButton>
        </label>
    )
}

const Input = styled.input`
width: 100px;
height: 50px;
font-size: 2rem;
font-weight: bold;
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