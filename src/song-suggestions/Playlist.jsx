import React from 'react'
import styled from 'styled-components'

export default function Playlist({newPlaylist}) {
  return (
    <div>
        <Iframe src={`https://open.spotify.com/embed/playlist/${newPlaylist.id}`} width="300" height="752" frameBorder="0" allowfullscreen="yes" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></Iframe>
    </div>
  )
}

const Iframe = styled.iframe``