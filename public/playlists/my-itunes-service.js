function MyTunesService() {
  var myPlayList = loadTracks()
  var masterPlayList = []

  this.putTracks = function (arr) {
    masterPlayList = arr
    localStorage.setItem('masterPlayList', JSON.stringify(arr))
  }
  this.getTracks = function () {
    return loadTracks()
  }
  this.addTrack = function (id) {
    // if(myPlayList.length == 0){
    //   myPlayList.push(song);
    // }
    for (var i = 0; i < masterPlayList.length; i++) {
      var song = masterPlayList[i];
      if (song.id == id) {
        for (var h = 0; h < myPlayList.length; h++) {
          if (song.id == myPlayList[h].id) {
            return
          }
        }
        myPlayList.push(song);
        //    masterPlayList.splice(i, 1);
      }
    }
    saveTracks(myPlayList)
  }
  this.removeTrack = function (id) {
    for (var i = 0; i < myPlayList.length; i++) {
      var song = myPlayList[i];
      if (song.id == id) {
        myPlayList.splice(i, 1);
        // masterPlayList.push(song);
      }
    }
    saveTracks(myPlayList)
    return
  }
  this.promoteTrack = function (id) {
    myPlayList = loadTracks()
    for (var i = 0; i < myPlayList.length; i++) {
      if (myPlayList[i].id == id) {
        if (i > 0) {
          myPlayList.splice(i - 1, 0, myPlayList.splice(i, 1)[0]);
        }
      }
    }
    saveTracks(myPlayList)
    return
  }
  this.demoteTrack = function (id) {
    myPlayList = loadTracks()
    for (var i = 0; i < myPlayList.length; i++) {
      if (myPlayList[i].id == id) {
        break;
      }
    }
    myPlayList.splice(i + 1, 0, myPlayList.splice(i, 1)[0]);
    saveTracks(myPlayList)
    return
  }
  this.clearData = function () {
    localStorage.removeItem('myPlayList')
  }
  function saveTracks() {
    localStorage.setItem('myPlayList', JSON.stringify(myPlayList))
  }
  function loadTracks() {
    var data = localStorage.getItem('myPlayList')
    if (!null && data) {
      return JSON.parse(data)
    } else {
      return []
    }
  }
}
