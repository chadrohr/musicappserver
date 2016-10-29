let dataAdapter = require('./data-adapter'),
  uuid = dataAdapter.uuid,
  DS = dataAdapter.DS,
  formatQuery = dataAdapter.formatQuery;

let Playlist = DS.defineResource({
    name: 'playlist',
    endpoint: 'playlists',
    // filepath: __dirname + '/../data/playlists.db'    
})

function create(playlist, cb) {
    let playlistObj = {
        id: uuid.v4(),
        name: playlist.name,
        songs: playlist.songs,
        upVotes: playlist.upVotes,
        downVotes: playlist.downVotes
    }
}

function editPlaylist(id, input, cb) {
    Playlist.find(id).then(function (playlist) {
        if (input.vote && input.vote == "down") {
            if (playlist.downVotes) {
                playlist.downVotes++
            } else {
                playlist.downVotes = 1
            }
        }
        if (input.vote && input.vote == "up") {
            if (playlist.upVotes) {
                playlist.upVotes++
            } else {
                playlist.upVotes = 1
            }
        }
        if (input.name) {
            playlist.name = input.name || {}
        }
        if (input.songs) {
            playlist.songs = input.songs || {}
        }
        Playlist.update(playlist.id, playlist)
            .then(cb)
            .catch(cb)
    }).catch(cb)
}

function removeSong(id, songId, cb) {
    Playlist.find(id).then(function (playlist) {
        playlist.songs[songId] = null
        Playlist.update(playlist.id, playlist)
            .then(cb)
            .catch(cb)
    }).catch(cb)
}

function getAll(query, cb) {
    Playlist.findAll({}, formatQuery(query)).then(cb).catch(cb)
}

function getById(id, query, cb) {
    Playlist.find(id, formatQuery(query)).then(cb).catch(cb)
}

module.exports = {
    create,
    getAll,
    getById,
    editPlaylist,
    removeSong
}




