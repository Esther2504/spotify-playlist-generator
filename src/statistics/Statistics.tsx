import React, { useEffect, useState } from 'react'
import axios from "axios";
import styled from 'styled-components';

export default function Statistics() {
  const [typeFilter, setTypeFilter] = useState<String>("tracks")
  const [periodFilter, setPeriodFilter] = useState<String>("short_term")
  const [data, setData] = useState<any>(false)

  const accessToken = localStorage.getItem('accessToken')

  console.log(accessToken)
  console.log(data)

  useEffect(() => {
    if (!data) {
      getTopTracks()
    }

  }, [])


  useEffect(() => {
    getTopTracks()
  }, [periodFilter, typeFilter])

  function getTopTracks() {
    axios
      .get(`https://api.spotify.com/v1/me/top/${typeFilter}?limit=50&offset=0&time_range=${periodFilter}`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((res) => {
        console.log(res)
        console.log(res.data.items)
        let tracks = res.data.items
        setData(tracks)
      })
      .catch((err) => {
        console.log(err)
        // setError(true)
      })
  }

  function handleFilter(period: String) {
      setPeriodFilter(period)
  }
  function handleTypeFilter(type: String) {
      setTypeFilter(type)
  }

  return (
    <Container>
      <PeriodFilters>
        <Label htmlFor="songs" className={typeFilter == "tracks" ? "fill" : "non-fill"}><input id="songs" type="radio" value="tracks" name="type" onChange={(e) => handleTypeFilter(e.target.value)} />Songs</Label>
        <Label htmlFor="artists" className={typeFilter == "artists" ? "fill" : "non-fill"}><input id="artists" type="radio" value="artists" name="type" onChange={(e) => handleTypeFilter(e.target.value)} />Artists</Label>
      </PeriodFilters>
      <PeriodFilters>
      <Label htmlFor="short" className={periodFilter == "short_term" ? "fill" : "non-fill"}><input id="short" type="radio" value="short_term" name="period" onChange={(e) => handleFilter(e.target.value)} />Past month</Label>
      <Label htmlFor="medium" className={periodFilter == "medium_term" ? "fill" : "non-fill"}><input id="medium" type="radio" value="medium_term" name="period" onChange={(e) => handleFilter(e.target.value)} />Past six months</Label>
      <Label htmlFor="long" className={periodFilter == "long_term" ? "fill" : "non-fill"}><input id="long" type="radio" value="long_term" name="period" onChange={(e) => handleFilter(e.target.value)} />Past year</Label>
      </PeriodFilters>
      {data && data.map((item, i) => {
        return (
          <SpotifyItem>
            <TrackNumber>{i + 1}</TrackNumber>
            <AlbumCover src={item.album.images[0].url} alt={item.album.name}></AlbumCover>
            <SongInfo><TrackArtistName href={item.external_urls.spotify}>{item.name}</TrackArtistName><p className="artists">
              <i>{(item.artists).map((artist, i) => {
                return (
                  <>{i != (item.artists).length - 1 ? <TrackArtistName><a href={artist.external_urls.spotify}>{artist.name}</a>, </TrackArtistName> : <TrackArtistName><a href={artist.external_urls.spotify}>{artist.name}</a></TrackArtistName>}</>
                )
              })}</i>
            </p></SongInfo>
            <TrackLength>{(item.duration_ms / 1000 / 60).toFixed(2).replace(".", ":")}</TrackLength>
          </SpotifyItem>
        )
      })}
      {/* <><AlbumCover src={item.images[0].url} alt={item.name}></AlbumCover>{item.name}</> */}
    </Container>
  )
}

const Container = styled.div`
max-width: 1200px;
width: 90%;
margin: 0 auto;
`

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
`

const AlbumCover = styled.img`
height: 70px;
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

const Label = styled.label`
background: transparent;
border: 1px solid #148255;
    padding: 8px 20px;
    border-radius: 20px;
    cusrsor: pointer;

&.fill {
background: #148255;
}

input {
display: none;
}
`

const PeriodFilters = styled.div`
display: flex;
margin-bottom: 30px;
gap: 20px;
`