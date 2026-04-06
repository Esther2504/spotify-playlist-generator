import React, { useEffect, useState } from 'react'
import axios from "axios";
import styled from 'styled-components';
import { NavLink } from 'react-router'
import { Authentication } from '../playlist-creator/APICalls';

export default function Statistics() {
  const [typeFilter, setTypeFilter] = useState<String>("tracks")
  const [periodFilter, setPeriodFilter] = useState<String>("short_term")
  const [songData, setSongData] = useState<any>(false)
  const [artistData, setArtistData] = useState<any>(false)
  const [error, setError] = useState<boolean>(false)

  const accessToken = localStorage.getItem('accessToken')

  console.log(accessToken)
  console.log(songData)

  useEffect(() => {
    if (!songData) {
      getTopTracks()
    }

  }, [])


  useEffect(() => {
    getTopTracks()
  }, [periodFilter, typeFilter])

  const AuthURL = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&grant_type=refresh_token&redirect_uri=https://emilia-nonepical-stevie.ngrok-free.dev/statistics&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20playlist-read-private%20playlist-modify-public%20playlist-modify-private%20user-top-read`

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
        let dataItems = res.data.items
        if (typeFilter === "artists") {
          setArtistData(dataItems)
        } else {
          setSongData(dataItems)
        }

      })
      .catch((err) => {
        console.log(err)
        setError(true)
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
      {error ?
        <div>Connect to Spotify to see your statistics <NavLink to={AuthURL} className="login-btn">Connect to Spotify</NavLink></div>
        :
        <>
          <h1>Most listened to</h1>
          <Filters>
            <Filter>
              <Label htmlFor="songs" className={typeFilter == "tracks" ? "fill" : "non-fill"}><input id="songs" type="radio" value="tracks" name="type" onChange={(e) => handleTypeFilter(e.target.value)} />Songs</Label>
              <Label htmlFor="artists" className={typeFilter == "artists" ? "fill" : "non-fill"}><input id="artists" type="radio" value="artists" name="type" onChange={(e) => handleTypeFilter(e.target.value)} />Artists</Label>
            </Filter>
            <Filter>
              <Label htmlFor="short" className={periodFilter == "short_term" ? "fill" : "non-fill"}><input id="short" type="radio" value="short_term" name="period" onChange={(e) => handleFilter(e.target.value)} />Past month</Label>
              <Label htmlFor="medium" className={periodFilter == "medium_term" ? "fill" : "non-fill"}><input id="medium" type="radio" value="medium_term" name="period" onChange={(e) => handleFilter(e.target.value)} />Past six months</Label>
              <Label htmlFor="long" className={periodFilter == "long_term" ? "fill" : "non-fill"}><input id="long" type="radio" value="long_term" name="period" onChange={(e) => handleFilter(e.target.value)} />Past year</Label>
            </Filter>
          </Filters>
          {typeFilter != "artists" && songData && songData.map((item: any, i: number) => {
            return (
              <SpotifyItem>
                <TrackNumber>{i + 1}</TrackNumber>
                <AlbumCover src={item.album.images[0].url} alt={item.album.name}></AlbumCover>
                <SongInfo><TrackArtistName><a href={item.external_urls.spotify}>{item.name}</a></TrackArtistName><p className="artists">
                  <i>{(item.artists).map((artist: any, i: number) => {
                    return (
                      <>{i != (item.artists).length - 1 ? <TrackArtistName><a href={artist.external_urls.spotify}>{artist.name}</a>, </TrackArtistName> : <TrackArtistName><a href={artist.external_urls.spotify}>{artist.name}</a></TrackArtistName>}</>
                    )
                  })}</i>
                </p></SongInfo>
                <TrackLength>{(item.duration_ms / 1000 / 60).toFixed(2).replace(".", ":")}</TrackLength>
              </SpotifyItem>
            )
          })}
          {typeFilter === "artists" && artistData && artistData.map((item: any, i: number) => {
            return (
              <SpotifyItem>
                <TrackNumber>{i + 1}</TrackNumber>
                <ArtistIcon style={{ backgroundImage: `url(${item.images[0].url})` }}></ArtistIcon>
                <TrackArtistName><a href={item.external_urls.spotify}>{item.name}</a></TrackArtistName>
                <NavLink to={`../discover/artists?artist=${item.id}&artistname=${item.name}`}>Get recommendations</NavLink>
                {/* Get song suggestions based on this artist */}
              </SpotifyItem>
            )
          })}
        </>
      }
    </Container>
  )
}

const Container = styled.div`
max-width: 1400px;
width: 90%;
margin: 0 auto;

.login-btn {
background: #148255;
color: #fff;
padding: 10px 20px;
text-decoration: none;
border-radius: 20px;
align-self: right;
}

h1 {
margin: 20px 0;
}
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
background: #148255;
    height: 100%;
    vertical-align: middle;
    display: flex;
    align-items: center;
    justify-content: center;
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

const Label = styled.label`
background: transparent;
border: 2px solid #148255;
    padding: 8px 20px;
    border-radius: 20px;
    cursor: pointer;

&.fill {
background: #148255;
}

input {
display: none;
}
`

const Filters = styled.div`
display: flex;
flex-direction: column;
margin-bottom: 40px;
gap: 10px;
`

const Filter = styled.div`
display: flex;
gap: 10px;
`