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
        : <SelectPlaylist setPlaylistReady={setPlaylistReady} setPlaylistItems={setPlaylistItems} setPlaylistName={setPlaylistName} setPlaylistID={setPlaylistID} playlistID={playlistID} />}
    </Container>
  )
}

const Container = styled.div`
margin: 150px auto;
display: flex;
flex-direction: column;
align-items: center;
`