// start logic building
// import { XRapidAPIKey, XRapidAPIHost } from './env.js';

// list out required variables 

let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let myProgressBarContainer = document.getElementById('myProgressBarContainer');
let audioElement = new Audio('songs/1.mp3');
let songIndex = 0;
let gif = document.getElementById('gif');
let prev = document.getElementById('prevSong');
let next = document.getElementById('nextSong');
let songList = Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementById('masterSongName');
let displaySong = document.getElementById('displaySong');
// let songs = [
//     { songName: 'song1', songPath: 'songs/1.mp3', songCover: 'covers/1.jpg' },
//     { songName: 'somg2', songPath: 'songs/2.mp3', songCover: 'covers/2.jpg' },
//     { songName: 'WEWDW 2E ', songPath: 'songs/3.mp3', songCover: 'covers/3.jpg' },
//     { songName: 'WRWE TRYDFSD ', songPath: 'songs/4.mp3', songCover: 'covers/4.jpg' },
//     { songName: 'WRWT WRRG ', songPath: 'songs/5.mp3', songCover: 'covers/5.jpg' },
//     { songName: 'Let me love you', songPath: 'songs/6.mp3', songCover: 'covers/6.jpg' },
//     { songName: 'Let me WR4B ', songPath: 'songs/7.mp3', songCover: 'covers/7.jpg' },
//     { songName: 'Let meFEWRW ', songPath: 'songs/8.mp3', songCover: 'covers/8.jpg' },
//     { songName: 'Let me DF E ', songPath: 'songs/9.mp3', songCover: 'covers/9.jpg' },
//     { songName: 'Let meRWEW T W ', songPath: 'songs/10.mp3', songCover: 'covers/10.jpg' }
// ]

// change html song list with songs array
// songList.forEach((song, i) => {
//     song.getElementsByTagName('img')[0].src = songs[i].songCover;
//     song.getElementsByTagName('span')[0].innerText = songs[i].songName;
//     audioElement.src = songs[i].songPath;
//     audioElement.currentTime = 0;
//     // console.log(audioElement.duration)
// });

// event listners 
function MasterPlayPause() {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause')
        gif.style.opacity = 1;
        makeAllPlay(songIndex);
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
    myProgressBar.style.width = progres + '%';
    // myProgressBar.style.transition = "value 300ms ease"
})

// Play next song when song is ended
audioElement.addEventListener('ended', () => {
    nextSong();
})
// update song time with progress bar change

myProgressBarContainer.addEventListener('click', (e) => {
    // console.log(myProgressBarContainer.offsetWidth)
    var x = ((e.clientX - myProgressBarContainer.offsetLeft) * 100) / myProgressBarContainer.offsetWidth;
    console.log(x);
    var times = ((x * audioElement.duration) / 100);
    myProgressBar.style.width = times + '%';
    audioElement.currentTime = times;
})

// handle next prev song
prev.addEventListener('click', () => {
    if (songIndex > 0) {
        songIndex = songIndex - 1;
        audioElement.src = songsData[songIndex].preview;
        masterSongName.innerText = songsData[songIndex].title;
        audioElement.currentTime = 0;
        makeAllPlay(songIndex);
        // document.getElementsByClassName('listPlay')[songIndex].classList.remove('fa-circle-play');
        // document.getElementsByClassName('listPlay')[songIndex].classList.add('fa-circle-pause');
        audioElement.play();
    }
    else {
        alert("No Previous song ");
    }
    MasterPlayPause();
})

function nextSong() {
    if (songIndex < songsData.length) {
        songIndex = songIndex + 1;
        audioElement.src = songsData[songIndex].preview;
        masterSongName.innerText = songsData[songIndex].title;
        audioElement.currentTime = 0;
        makeAllPlay(songIndex);
        // document.getElementsByClassName('listPlay')[songIndex].classList.remove('fa-circle-play');
        // document.getElementsByClassName('listPlay')[songIndex].classList.add('fa-circle-pause');
        audioElement.play();
    }
    else {
        alert("No next song ");
    }
}
next.addEventListener('click', () => {
    nextSong();
    MasterPlayPause();
})
// play particular song
function makeAllPlay(indd) {
    Array.from(document.getElementsByClassName('listPlay')).forEach((ele, ind) => {

        if (ind == indd) {
            ele.classList.remove('fa-circle-play');
            ele.classList.add('fa-circle-pause');
        }
        else {
            ele.classList.add('fa-circle-play');
            ele.classList.remove('fa-circle-pause');
        }

    })
}



//API testing
let songsData = []
let url = 'https://deezerdevs-deezer.p.rapidapi.com/search?q=rab%20ne%20banaya';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': XRapidAPIKey,
        'X-RapidAPI-Host': XRapidAPIHost
    }
};
async function info() {
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        songsData = result.data
        console.log(result.data);
    } catch (error) {
        console.error(error);
    }
    displaySongs()
    addListner();
}
info();
function displaySongs() {
    displaySong.innerHTML = '';
    songsData.forEach(song => {
        const disdiv = document.createElement('div')
        disdiv.classList.add('songItem')
        disdiv.innerHTML = `
   <img src="${song.album.cover_small}"alt="1">
   <span>${song.title}</span>
   <span class="songListPlay"><span>${(song.duration / 60).toPrecision(3)}</span><i class="listPlay fa-solid fa-circle-play"></i></span>
`

        displaySong.appendChild(disdiv);
    })
}


function addListner() {
    Array.from(document.getElementsByClassName('listPlay')).forEach((ele, ind) => {
        // console.log(ele);
        ele.addEventListener('click', () => {


            // ele.classList.remove('fa-circle-play');
            // ele.classList.add('fa-circle-pause');
            audioElement.src = songsData[ind].preview;
            audioElement.currentTime = 0;
            audioElement.play();
            // console.log(audioElement.duration)
            MasterPlayPause();
            masterSongName.innerText = songsData[ind].title;
            songIndex = ind;
            makeAllPlay(songIndex);
        })

    })
}

// search song
function searchSong() {
    const term = document.getElementById('SongInput').value;
    console.log(term)
    url = 'https://deezerdevs-deezer.p.rapidapi.com/search?q=' + term;
    info();
}