import React from 'react'
import styled from 'styled-components'

export default function SpotifyTrack({ item, i, dateTime }) {

  const options = {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit"
  };
  const playDate = new Date(dateTime).toLocaleDateString("nl-NL", options)
  // const playHour = new Date(dateTime).toLocaleDateString("nl-NL", options2).getHours()
  const playMinute = new Date(dateTime).getMinutes()

  console.log(playDate)

  return (
    <SpotifyItem>
      {dateTime ?
        <TrackNumber $fontSize="0.7rem">{playDate.replace(",", "\n")}</TrackNumber>
        :
        <TrackNumber $fontSize="1.3rem">{i + 1}</TrackNumber>
      }

      <AlbumCover src={item.album.images[0].url} alt={item.album.name}></AlbumCover>
      <SongInfo><TrackArtistName><a href={item.external_urls.spotify}>{item.name}</a></TrackArtistName><p className="artists">
        <i>{(item.artists).map((artist: any, i: number) => {
          return (
            <>{i != (item.artists).length - 1 ? <TrackArtistName><a href={artist.external_urls.spotify} target="_blank">{artist.name}</a>, </TrackArtistName> : <TrackArtistName><a href={artist.external_urls.spotify} target="_blank">{artist.name}</a></TrackArtistName>}</>
          )
        })}</i>
      </p></SongInfo>
      <TrackLength>{(item.duration_ms / 1000 / 60).toFixed(2).replace(".", ":")}</TrackLength>
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

const TrackNumber = styled.p<{ $fontSize?: string; }>`
font-size: ${props => props.$fontSize || "1.3rem"};
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
