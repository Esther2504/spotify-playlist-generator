import React from 'react'

export default function PlaylistCreated({newPlaylistID}) {

    console.log(newPlaylistID)
  return (
    <div>

<iframe src={`https://open.spotify.com/embed/playlist/${newPlaylistID}`} width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
    </div>
  )
}
