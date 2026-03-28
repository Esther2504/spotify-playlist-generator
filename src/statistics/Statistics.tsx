import React, { useState } from 'react'
  import axios from "axios";

export default function Statistics() {
  const [data, setData] = useState()

  const accessToken = localStorage.getItem('accessToken')

  console.log(accessToken)

  getTopTracks()
  
function getTopTracks() {
      axios
          .get('https://api.spotify.com/v1/me/top/tracks?limit=20&offset=0', {
              headers: {
                  Authorization: "Bearer " + accessToken,
              },
          })
          .then((res) => {
            console.log(res)
              setData(res.data)
          })
          .catch((err) => {
            console.log(err)
              // setError(true)
          })
  }
  

// https://api.spotify.com/v1/me/top/

  return (
    <div>Statistics</div>
  )
}
