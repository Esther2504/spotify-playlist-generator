import axios from "axios";

export function getPlaylists(getAccessToken, setData, setError) {
    axios
        .get('https://api.spotify.com/v1/me/playlists?limit=30', {
            headers: {
                Authorization: "Bearer " + getAccessToken,
            },
        })
        .then((res) => {
            setData(res.data)
        })
        .catch((err) => {
            setError(true)
        })
}

export function getTracks(playlistid, playlistName, setPlaylistName, accessToken, setTracks, setError) {
    axios.get(`https://api.spotify.com/v1/playlists/${playlistid}`, {
        headers: {
            Authorization: "Bearer " + accessToken,
        },
    })
        .then((res) => {
            setTracks(res.data.tracks)
            setPlaylistName(res.data.name)
        })
        .catch((err) => {
            getAlbumTracks(playlistid, playlistName, setPlaylistName, accessToken, setTracks, setError)
        })

}

function getAlbumTracks(playlistid, setPlaylistName, accessToken, setTracks, setError) {
    axios.get(`https://api.spotify.com/v1/albums/${playlistid}`, {
        headers: {
            Authorization: "Bearer " + accessToken,
        },
    })
        .then((res) => {
            setTracks(res.data.tracks)
            setPlaylistName(res.data.name)
        })
        .catch((err) => {
            setError(true)
        })
}

export function getAudioFeatures(trackids, accessToken, setaudioDetails) {
    axios
        .get(`https://api.spotify.com/v1/audio-features?ids=${trackids}`, {
            headers: {
                Authorization: "Bearer " + accessToken,
            },
        })
        .then((res) => {
            if (res.data.audio_features) {
                setaudioDetails(res.data.audio_features)
            }

        })
        .catch((err) => {
        })
}

export function getUser(accessToken, setUserID, setError) {
    axios
        .get(`https://api.spotify.com/v1/me`, {
            headers: {
                Authorization: "Bearer " + accessToken,
            },
        })
        .then((res) => {
            setUserID(res.data.id)
        })
        .catch((err) => {
            setError(true)
        })
}

export function createPlaylist(userID, accessToken, songType, playlistName, genre, setNewPlayListID, setNewPlaylist, newPlaylist, setError) {
    const url = `https://api.spotify.com/v1/users/${userID}/playlists`;

    const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
    };

    const data = {
        name: `${songType} songs from '${playlistName}'`,
        description: `Playlist containing the ${genre} songs from '${playlistName}'`,
        public: false,
    };

    if (!newPlaylist) {
        axios.post(url, data, { headers })
            .then(response => {
                setNewPlayListID(response.data.id)
                setNewPlaylist(response.data.tracks.href)
            })
            .catch(err => {
                setError(true)
            });
    }
}

export function addPlaylistTracks(newPlaylistIds, accessToken, newPlaylist, setPlaylistCreated) {
    let uniqueuris = [...new Set(newPlaylistIds)];

    const requestHeaders = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
    };

    const requestData = {
        uris: uniqueuris,
        position: 0
    };

    axios.post(newPlaylist, requestData, {
        headers: requestHeaders
    })
        .then(response => {
            setPlaylistCreated(true)
        })
        .catch(err => {
        });
}