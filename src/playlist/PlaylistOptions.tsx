import React, { useState } from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router'

export default function PlaylistOptions() {

  return (
    <Container>
        <OptionsContainer>
          <NavLink to="./artistplaylist"><Option>Create separate playlist per artist</Option>
          </NavLink>
          <NavLink to="./yearplaylist"><Option>Create separate playlist per year</Option></NavLink>
          <NavLink to="./deduplicateplaylist"><Option>Remove duplicates</Option></NavLink>
          <NavLink to="./removeartist"><Option>Remove artist from your playlist</Option></NavLink>
        </OptionsContainer>
    </Container>
  )
}

const Container = styled.div`
max-width: 1400px;
width: 90%;
margin: 0 auto;
padding: 20px;

.login-btn {
background: #148255;
color: #fff;
padding: 10px 20px;
text-decoration: none;
border-radius: 20px;
width: fit-content;
}

h1 {
margin: 20px 0;
}
`

const OptionsContainer = styled.div`
display: flex;
flex-wrap: wrap;
align-items: center;
justify-content: center;
gap: 20px;
width: 100%;
max-width: 1000px;
margin: 0 auto;

a {
text-decoration: none;
}
`

const Option = styled.div`
max-width: 100%;
padding: 15px;
width: 350px;
height: 200px;
display: flex;
text-align: center;
align-items: center;
justify-content: center;
background: var(--green);
color: #fff;
border-radius: 15px;
font-weight: 500;
border: 2px solid transparent;
font-size: 1.3rem;
cursor: pointer;

&:hover {
border: 2px solid #fff;
}
`