import React from 'react'
import styled from 'styled-components'

export default function ArtistItem({item, i}) {
    return (
        <SpotifyItem>
            <TrackNumber>{i + 1}</TrackNumber>
            <ArtistIcon style={{ backgroundImage: `url(${item.images[0].url})` }}></ArtistIcon>
            <TrackArtistName><a href={item.external_urls.spotify}>{item.name}</a></TrackArtistName>
            {/* <NavLink to={`../discover/artists?artist=${item.id}&artistname=${item.name}`}>Get recommendations</NavLink> */}
        </SpotifyItem>
    )
}


const SpotifyItem = styled.div`
display: grid;
grid-template-columns: 70px 70px 3fr 1fr 1fr;
height: 70px;
width: 100%;
margin-bottom: 15px;
align-items: center;
justify-content: center;
gap: 20px;
`

const TrackArtistName = styled.div`
text-decoration: none;
display: inline;

&::first-child {
font-weight: bold;
}

a {
text-decoration: none;
}
a:hover {
text-decoration: underline;
}
`

const TrackNumber = styled.p`
font-size: 1.3rem;
text-align: center;
font-weight: bold;
    height: 100%;
    vertical-align: middle;
    display: flex;
    align-items: center;
    justify-content: center;
        border: 2px solid #148255;
    border-radius: 99%;
`

const AlbumCover = styled.img`
height: 70px;
`

const ArtistIcon = styled.div`
width: 70px;
height: 70px;
background-size: cover;
background-position: center;
`

const SongInfo = styled.div`
display: flex;
flex-direction: column;

.artists {
overflow: hidden;
font-size: 0.8rem;
margin-top: 2px;
}
`

const TrackLength = styled.div`
text-align: center;
`
