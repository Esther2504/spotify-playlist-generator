import React from 'react'
import axios from 'axios'

type Props = {
    playlistID: string;
    playlistItems: any;
    playlistName: string;
}

export default function MergePlaylist({ playlistID, playlistItems, playlistName }: Props) {
    
  return (
    <div>MergePlaylist</div>
  )
}