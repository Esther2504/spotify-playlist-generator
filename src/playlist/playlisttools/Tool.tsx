import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router'
import ArtistPlaylist from './ArtistPlaylist.tsx'
import SelectPlaylist from './SelectPlaylist.tsx'
import YearPlaylist from './YearPlaylist.tsx'
import styled from 'styled-components'
import DeduplicatePlaylist from './DeduplicatePlaylist.tsx'
import RemoveArtist from './RemoveArtist.tsx'
import MergePlaylist from './MergePlaylist.tsx'
import { AUTH_URL } from '../../AuthURL.tsx'

type Props = {}


export default function Tool({ }: Props) {
  const [playlistID, setPlaylistID] = useState<string>()
  const [playlistItems, setPlaylistItems] = useState([])
  const [playlistName, setPlaylistName] = useState<string>()
  const [playlistReady, setPlaylistReady] = useState<boolean>(false)
  const params = useParams()
  const tool = params.tool

  useEffect(() => {
    console.log(playlistReady)

  }, [playlistReady])

  let AUTH_URL_NEW = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&grant_type=refresh_token&redirect_uri=https://emilia-nonepical-stevie.ngrok-free.dev/playlist/${tool}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-top-read%20user-library-modify%20playlist-read-private%20playlist-modify-public%20playlist-modify-private%20user-read-recently-played`;



  return (
    <Container>
      {tool == "artistplaylist" && playlistReady && playlistID ?
        <>
          <ArtistPlaylist playlistID={playlistID} playlistItems={playlistItems} playlistName={playlistName ? playlistName : 'Playlist'} />
        </>
        : tool == "yearplaylist" && playlistReady && playlistID ?
        <>
          <YearPlaylist playlistID={playlistID} playlistItems={playlistItems} playlistName={playlistName ? playlistName : 'Playlist'} />
        </>
         : tool == "deduplicateplaylist" && playlistReady && playlistID ?
        <>
          <DeduplicatePlaylist playlistID={playlistID} playlistItems={playlistItems} playlistName={playlistName ? playlistName : 'Playlist'} />
        </>
        : tool == 'removeartist' && playlistReady && playlistID ?
        <RemoveArtist playlistID={playlistID} playlistItems={playlistItems} playlistName={playlistName ? playlistName : 'Playlist'} />
        : tool == 'mergeplaylist' && playlistReady && playlistID ?
        <MergePlaylist playlistID={playlistID} playlistItems={playlistItems} playlistName={playlistName ? playlistName : 'Playlist'} />
        : <SelectPlaylist setPlaylistReady={setPlaylistReady} setPlaylistItems={setPlaylistItems} setPlaylistName={setPlaylistName} setPlaylistID={setPlaylistID} playlistID={playlistID} AUTH_URL_NEW={AUTH_URL_NEW} />}
    </Container>
  )
}

const Container = styled.div`
margin: 150px auto;
display: flex;
flex-direction: column;
align-items: center;
`