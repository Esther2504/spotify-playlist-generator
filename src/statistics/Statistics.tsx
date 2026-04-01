import React, { useState } from 'react'
  import axios from "axios";

export default function Statistics() {
  const [data, setData] = useState<any>(false)

  const accessToken = localStorage.getItem('accessToken')

  console.log(accessToken)
  console.log(data)

  if (!data) {
  getTopTracks()
  }

function getTopTracks() {
      axios
          .get('https://api.spotify.com/v1/me/top/tracks?limit=20&offset=0', {
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
  

// https://api.spotify.com/v1/me/top/

  return (
    <div>
    Statistics
    {data && data.map((item) => {
      return (
      <div>{item.name}</div>
      )
    })}
    </div>
  )
}

