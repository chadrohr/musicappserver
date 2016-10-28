//function MytunesController() {
var myTunes = new MyTunesService()

function getMusic() {
    var artist = document.getElementById('artist').value;
    itunes.getMusicByArtist(artist).then(drawSongs);
    $('#artist').focus()
}
function getMyMusic(){
   var myPlayList = myTunes.getTracks()
   drawMySongs(myPlayList);
   $('#artist').focus()
}
// function getClear(){
//    debugger
// myTunes.clearData()
   //clearPlayList(myPlatList);
//}

function drawSongs(songList) {
    myTunes.putTracks(songList)
    var template = ""
    var songElement = document.getElementById('songs')
    for (var i = 0; i < songList.length; i++) {
        var song = songList[i]
       // console.log(song.purchaseUrl)
        template +=
            ` <div class="card">
                    <div class="card-block">
                        <div class="col-sm-1">
                            <img class="card-img-left" src="${song.albumArt}" alt="Card image cap">
                        </div>
                        <div class="name-artist col-sm-3">
                            <h5 class=" card-title ">${song.title}</h5>
                            <p class="card-text ">${song.artist}</p>
                        </div>
                        <div class="col-sm-3 ">
                            <p class="card-text ">${song.collection}</p>
                            <p class="card-text "><a href='${song.purchaseUrl}' class="card-link " target="_blank">Buy Now</a> $${song.price}</p>
                        </div>
                        <div class="sound-box col-sm-4 ">
                            <audio controls style="width=275px" ; " src="${song.preview} ">
                                <a href="${song.preview} " class="card-link ">Card link</a>
                            </audio>
                            <button class="btn btn-success btn-sm" type="button" id="${song.id}" onclick="myTunes.addTrack(${song.id}); getMyMusic()">Add to Playlist</button>
                        </div>
                    </div>
                </div>`
    }
    songElement.innerHTML = template
}
function drawMySongs(myList){
    var template = ""
    var songElement = document.getElementById('my-songs')
    for (var i = 0; i < myList.length; i++) {
        var song = myList[i]
        template +=
            ` <div class="card">
                    <div class="card-block">
                        <div class="col-sm-1">
                            <img class="card-img-left" src="${song.albumArt}" alt="Card image cap">
                        </div>
                        <div class="name-artist col-sm-3">
                            <h5 class=" card-title ">${song.title}</h5>
                            <p class="card-text ">${song.artist}</p>
                        </div>
                        <div class="col-sm-3 ">
                            <p class="card-text ">${song.collection}</p>
                            <p class="card-text "><a href="${song.purchaseUrl}" class="card-link " target="_blank">Buy Now</a> $${song.price}</p>
                        </div>
                        <div class="sound-box col-sm-4 ">
                            <audio controls style="width=275px" ; " src="${song.preview} ">
                                <a href="${song.preview} " class="card-link ">Card link</a>
                            </audio>
                            <button class="btn btn-info btn-sm" type="button" id="${song.id}" onclick="myTunes.removeTrack(${song.id}); getMyMusic()">Remove from Playlist</button>
                            <button class="btn btn-info btn-sm" type="button" id="${song.id}" onclick="myTunes.promoteTrack(${song.id}); getMyMusic()">Promote</button>
                            <button class="btn btn-info btn-sm" type="button" id="${song.id}" onclick="myTunes.demoteTrack(${song.id}); getMyMusic()">Demote</button>
                        </div>
                    </div>
                </div>`
}
songElement.innerHTML = template
}


window.addEventListener("play", function (evt) {
    if (window.$_currentlyPlaying) {
        window.$_currentlyPlaying.pause();
    }
    window.$_currentlyPlaying = evt.target;
}, true);
    
//}

