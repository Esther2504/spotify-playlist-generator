import React, { useState } from 'react'
import { useParams, useSearchParams } from 'react-router'
import axios from 'axios';

export default function Artists() {
    const [setArtistData, artistData] = useState()

    const params = useParams()
    const artist = params.artist;

    console.log(artist)

      const accessToken = localStorage.getItem('accessToken')

  function getArtists() {
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

    

  return (
    <div>Artists</div>
  )
}
