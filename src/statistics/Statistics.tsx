import React, { useEffect, useState } from 'react'
import axios from "axios";
import styled from 'styled-components';

export default function Statistics() {
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
  }, [periodFilter])

  function getTopTracks() {
    axios
      .get(`https://api.spotify.com/v1/me/top/tracks?limit=50&offset=0&time_range=${periodFilter}`, {
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

  return (
    <Container>
      Current filter: {periodFilter}
      <div onClick={() => setPeriodFilter("short_term")}>Past month</div>
      <div onClick={() => setPeriodFilter("medium_term")}>Past 6 months</div>
      <div onClick={() => setPeriodFilter("long_term")}>Past year</div>
      {data && data.map((item, i) => {
        return (
          <SpotifyItem>
            <TrackNumber>{i + 1}</TrackNumber>
            <AlbumCover src={item.album.images[0].url} alt={item.album.name}></AlbumCover>
            <SongInfo><strong>{item.name}</strong><p className="artists">
              <i>{(item.artists).map((artist, i) => {
                return (
                  <>{i != (item.artists).length - 1 ? <span>{artist.name}, </span> : <span>{artist.name}</span>}</>
                )
              })}</i>
            </p></SongInfo>
            <TrackLength>{(item.duration_ms / 1000 / 60).toFixed(2).replace(".", ":")}</TrackLength>
          </SpotifyItem>
        )
      })}
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
}
`

const TrackLength = styled.div`
text-align: center;
`