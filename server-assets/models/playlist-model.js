let dataAdapter = require('./data-adapter'),
  uuid = dataAdapter.uuid,
  DS = dataAdapter.DS,
  formatQuery = dataAdapter.formatQuery;

let Playlist = DS.defineResource({
  name: 'playlist',
  endpoint: 'playlists',
  filepath: __dirname + '/../data/playlists.db',
  // relations: {
  //   hasMany: {
  //     song: {
  //       localField: 'songs',
  //       foreignKey: 'playlistId'
  //     } 
  //   }
  // }
})


function create(playlist, cb){
    let playlistObj = {
        id: uuid.v4(),
        name: playlist.name,
        songs: playlist.songs
          
        }
       Playlist.create(playlistObj).then(cb).catch(cb)
}

function getAll(query, cb) {
  //Use the Resource Model to get all Playlists
  Playlist.findAll({}).then(cb).catch(cb)
}

function getById(id, query, cb) {
  // use the Resource Model to get a single playlist by its id
  Playlist.find(id, formatQuery(query)).then(cb).catch(cb)
}

module.exports = {
  create,
  getAll,
  getById
}



