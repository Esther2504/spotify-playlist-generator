import React, { useEffect, useState } from 'react'
import { getGenres } from './APICalls'

export default function Start() {
  const [genres, setGenres] = useState()

  const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=token&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20playlist-read-private%20playlist-modify-public%20playlist-modify-private`

  const getAccessToken = window.location.hash.substring(14).split('&')[0]

  useEffect(() => {

    if (getAccessToken) {
      getGenres(getAccessToken, setGenres)
    }
    
    console.log(genres)
  }, [getAccessToken])

  return (
    <div>
      <h1>Song suggestion tool</h1>
      <p>Get suggestions based on your favorite songs, artists, genres</p>
      <a href={AUTH_URL}>
        <button>Get started</button>
      </a>
      <form>
        <p>What are your favorite genres?</p>
        <input type="checkbox" /><label></label>

      </form>
    </div>
  )
}

