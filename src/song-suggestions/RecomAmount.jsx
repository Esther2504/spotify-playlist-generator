import React from 'react'
import styled from 'styled-components'

export default function RecomAmount({ amount, setAmount, setStep }) {
    return (
        <label>
            <p>How many recommendations do you want?</p>
            <Input type="number" min="1" max="100" value={amount} onInput={(e) => setAmount(e.target.value)} /><br/>
            <SmallButton onClick={() => setStep(6)}>Get recommendations</SmallButton>
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