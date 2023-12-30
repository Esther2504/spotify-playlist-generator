import React from 'react'
import styled from 'styled-components'

export default function StartPage({ setTool }) {
    return (
        <>
            <h1>Song suggestion tool</h1>
            <p>Get suggestions based on your favorite songs, artists, genres</p>
            {/* <A href={AUTH_URL}> */}
                <Button onClick={() => setTool('songsuggestions')}>Get started</Button>
            {/* </A> */}
        </>
    )
}

const Button = styled.button`
background: #148255;
border: none;
color: #fff;
padding: 15px 30px;
font-size: 1.5rem;
cursor: pointer;
`

const A = styled.a``