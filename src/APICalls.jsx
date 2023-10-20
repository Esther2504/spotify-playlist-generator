import axios from "axios";

export function getPlaylists(getAccessToken, setData, data, accessToken) {

    axios
        .get('https://api.spotify.com/v1/me/playlists?limit=50', {
            headers: {
                Authorization: "Bearer " + getAccessToken,
            },
        })
        .then((res) => {
            setData(res.data)
            console.log(data)
        })
        .catch((err) => {
            console.log(err.response)
        })
}

export function getTracks(playlistid, playlistName, setPlaylistName, accessToken, setTracks, songType) {
    axios
        .get(`https://api.spotify.com/v1/playlists/${playlistid}`, {
            headers: {
                Authorization: "Bearer " + accessToken,
            },
        })
        .then((res) => {
            console.log(res.data)
            setTracks(res.data.tracks)
            setPlaylistName(res.data.name)
        })
        .catch((err) => {
            console.log(err.response)
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
            console.log(res.data)
            setaudioDetails(res.data.audio_features)
        })
        .catch((err) => {
            console.log(err.response)
        })
}

export function getUser(accessToken, setUserID) {
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
            console.log(err.response)
        })
}

export function createPlaylist(userID, accessToken, songType, playlistName, genre, setNewPlayListID, setNewPlaylist, newPlaylist) {
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
                console.log('Playlist created:', response.data);
                setNewPlayListID(response.data.id)
                setNewPlaylist(response.data.tracks.href)
            })
            .catch(error => {
                console.error('Error creating playlist:', error);
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

    console.log(requestData)


    console.log(`${newPlaylist}`)

    axios.post(newPlaylist, requestData, {
        headers: requestHeaders
    })
        .then(response => {

            console.log(response.data);

            setPlaylistCreated(true)
        })
        .catch(error => {

            console.error(error);
        });
}