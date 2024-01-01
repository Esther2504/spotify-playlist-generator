import React from 'react'
import styled from 'styled-components'

export default function StartPage({ setTool }) {
    return (
        <Container>
            <H1><Span>Spotify</Span><br></br>Song<br></br>Suggestions</H1>
            <p>Get suggestions based on your favorite song, artist and genre</p>
            {/* <A href={AUTH_URL}> */}
                <Button onClick={() => setTool('songsuggestions')}>Get song suggestions</Button>
            {/* </A> */}
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

const A = styled.a``