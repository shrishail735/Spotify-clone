// start logic building

// list out required variables 

let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let audioElement = new Audio('songs/1.mp3');
let songIndex = 0;
let gif = document.getElementById('gif');
let prev = document.getElementById('prevSong');
let next = document.getElementById('nextSong');
let songList = Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementById('masterSongName');
let songs = [
    { songName: 'song1', songPath: 'songs/1.mp3', songCover: 'covers/1.jpg' },
    { songName: 'somg2', songPath: 'songs/2.mp3', songCover: 'covers/2.jpg' },
    { songName: 'WEWDW 2E ', songPath: 'songs/3.mp3', songCover: 'covers/3.jpg' },
    { songName: 'WRWE TRYDFSD ', songPath: 'songs/4.mp3', songCover: 'covers/4.jpg' },
    { songName: 'WRWT WRRG ', songPath: 'songs/5.mp3', songCover: 'covers/5.jpg' },
    { songName: 'Let me love you', songPath: 'songs/6.mp3', songCover: 'covers/6.jpg' },
    { songName: 'Let me WR4B ', songPath: 'songs/7.mp3', songCover: 'covers/7.jpg' },
    { songName: 'Let meFEWRW ', songPath: 'songs/8.mp3', songCover: 'covers/8.jpg' },
    { songName: 'Let me DF E ', songPath: 'songs/9.mp3', songCover: 'covers/9.jpg' },
    { songName: 'Let meRWEW T W ', songPath: 'songs/10.mp3', songCover: 'covers/10.jpg' }
]

// change html song list with songs array
songList.forEach((song, i) => {
    song.getElementsByTagName('img')[0].src = songs[i].songCover;
    song.getElementsByTagName('span')[0].innerText = songs[i].songName;

});

// event listners 
function MasterPlayPause() {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause')
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.add('fa-circle-play');
        masterPlay.classList.remove('fa-circle-pause');
        gif.style.opacity = 0;
    }
}
//play pause audio
masterPlay.addEventListener('click', () => {
    MasterPlayPause();
})

// update progress bar with time of audio
audioElement.addEventListener('timeupdate', () => {
    // console.log(myProgressBar.value)
    // console.log(audioElement.duration);
    var progres = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    // console.log(progres);
    myProgressBar.value = progres;
})

// update song time with progress bar change

myProgressBar.addEventListener('input', () => {
    // console.log(myProgressBar.value)
    var times = ((myProgressBar.value * audioElement.duration) / 100);
    audioElement.currentTime = times;
})

// handle next prev song
prev.addEventListener('click', () => {
    if (songIndex > 0) {
        songIndex = songIndex - 1;
        audioElement.src = songs[songIndex].songPath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        makeAllPlay();
        document.getElementsByClassName('listPlay')[songIndex].classList.remove('fa-circle-play');
        document.getElementsByClassName('listPlay')[songIndex].classList.add('fa-circle-pause');
        audioElement.play();
    }
    else {
        alert("No Previous song ");
    }
})
next.addEventListener('click', () => {
    if (songIndex < 9) {
        songIndex = songIndex + 1;
        audioElement.src = songs[songIndex].songPath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        makeAllPlay();
        document.getElementsByClassName('listPlay')[songIndex].classList.remove('fa-circle-play');
        document.getElementsByClassName('listPlay')[songIndex].classList.add('fa-circle-pause');
        audioElement.play();
    }
    else {
        alert("No next song ");
    }
})
// play particular song
function makeAllPlay() {
    Array.from(document.getElementsByClassName('listPlay')).forEach((ele, ind) => {
        ele.classList.add('fa-circle-play');
        ele.classList.remove('fa-circle-pause');

    })
}
Array.from(document.getElementsByClassName('listPlay')).forEach((ele, ind) => {
    // console.log(ele);
    ele.addEventListener('click', () => {
        makeAllPlay();

        ele.classList.remove('fa-circle-play');
        ele.classList.add('fa-circle-pause');
        audioElement.src = songs[ind].songPath;
        audioElement.currentTime = 0;
        audioElement.play();
        MasterPlayPause();
        masterSongName.innerText = songs[ind].songName;
        songIndex = ind;
    })

})