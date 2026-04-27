import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router'
import ArtistPlaylist from './ArtistPlaylist.tsx'
import SelectPlaylist from './SelectPlaylist.tsx'

type Props = {}

// first page: choose tool
// second: choose playlist / connect to spotify
// third: tool


export default function Tool({ }: Props) {
  const [playlistID, setPlaylistID] = useState<string>()
  const [playlistItems, setPlaylistItems] = useState([])
  const [playlistName, setPlaylistName] = useState<string>()
  const [playlistReady, setPlaylistReady] = useState<boolean>(false)
  const params = useParams()
  const tool = params.tool

  useEffect(() => {
    if (playlistItems) {
      setPlaylistReady(true)
    }
  }, [playlistItems])
  console.log(params.tool)

  return (
    <div>
      <SelectPlaylist setPlaylistItems={setPlaylistItems} setPlaylistName={setPlaylistName} />
      {tool == "artistplaylist" && playlistReady && playlistID ?
        <>
          <ArtistPlaylist playlistID={playlistID} playlistItems={playlistItems} playlistName={playlistName ? playlistName : 'Playlist'} />
        </>
        : null}
    </div>
  )
}