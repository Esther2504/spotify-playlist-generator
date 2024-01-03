import React from 'react'
import styled from 'styled-components'

export default function StartPage({ setTool }) {
    return (
        <Container>
            <H1>
                <Span>Spotify</Span>
                <BR />Song
                <BR />Suggestions
            </H1>
            <P>Get song suggestions based on your favorite song, artist and genre</P>
            <Button onClick={() => setTool('songsuggestions')}>Get song suggestions</Button>
        </Container>
    )
}

const Container = styled.div`
display: flex;
flex-direction: column;
width: 500px;
max-width: 50%;
text-align: right;
padding: 40px;

@media screen and (max-width: 850px) {
    max-width: 100%;
    }
`
const Span = styled.span`
color: #148255;
`
const Button = styled.button`
background: #148255;
border: none;
color: #fff;
padding: 15px 30px;
font-size: 1.2rem;
font-weight: 600;
cursor: pointer;
`
const H1 = styled.h1``
const P = styled.p``
const A = styled.a``
const BR = styled.br``