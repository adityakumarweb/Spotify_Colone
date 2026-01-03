
console.log('Lets write JavaScript');
let currentSong = new Audio();
let songs;
let currFolder;

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

async function loadAllSongs() {
    let allSongs = [];
    let songLists = {
        "songs/ncs": ["Abhi Toh Party Shuru Hui Hai Khoobsurat 128 Kbps.mp3","10.mp3"],
        "songs/Angry_(mood)": ["Akhiyaan Gulaab (Teri Baaton Mein Aisa Uljha Jiya)-(Mr-Jat.in).mp3","Angry Hits"],
        "songs/Bright_(mood)": ["Panwadi(KoshalWorld.Com).mp3","2.mp3"],
        "songs/Chill_(moood)": ["White_Brown_Black_1.mp3","3.mp3"],
        "songs/cs": ["Teri Baaton Mein Aisa Uljha Jiya-(Mr-Jat.in).mp3","4.mp3"],
        "songs/Dark_(mood)": ["Daru_Badnaam_1.mp3","5.mp3"],
        "songs/Diljit": ["Naina Da Kahina-(Mr-Jat.in).mp3","6.mp3"],
        "songs/Funcky_(mood)": ["Ilahi-(SambalpuriStar.In).mp3","7.mp3"],
        "songs/karan aujla": ["softly.mp3", "8.mp3"],
        "songs/Love_(mood)": ["Raataan Lambiyan Shershaah 128 Kbps.mp3","9.mp3"],
        "songs/Uplifting_(mood)": ["Tere Bina(KoshalWorld.Com).mp3","10.mp3"]
    };
    for (let folder in songLists) {
        for (let song of songLists[folder]) {
            allSongs.push({ folder, song });
        }
    }
    songs = allSongs.map(item => item.song); // For compatibility with existing code
    // Show all the songs in the playlist
    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    songUL.innerHTML = ""
    for (const item of allSongs) {
        songUL.innerHTML = songUL.innerHTML + `<li data-folder="${item.folder}"><img class="invert" width="34" src="images/music.svg" alt="">
                            <div class="info">
                                <div> ${item.song.replaceAll("%20", " ")}</div>
                                <div>Artist</div>
                            </div>
                            <div class="playnow">
                                <span>Play Now</span>
                                <img class="invert" src="images/play.svg" alt="">
                            </div> </li>`;
    }

    // Attach an event listener to each song
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            let folder = e.dataset.folder;
            let song = e.querySelector(".info").firstElementChild.innerHTML.trim();
            currFolder = folder;
            playMusic(song);
        })
    })
}

const playMusic = (track, pause = false) => {
    currentSong.src = `./${currFolder}/` + track
    if (!pause) {
        currentSong.play()
        play.src = "images/pause.svg"
    }
    document.querySelector(".songinfo").innerHTML = decodeURI(track)
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"


}

async function displayAlbums() {
    console.log("displaying albums")
    let songLists = {
        "songs/ncs": ["Abhi Toh Party Shuru Hui Hai Khoobsurat 128 Kbps.mp3","10.mp3"],
        "songs/Angry_(mood)": ["Akhiyaan Gulaab (Teri Baaton Mein Aisa Uljha Jiya)-(Mr-Jat.in).mp3","1.mp3"],
        "songs/Bright_(mood)": ["Panwadi(KoshalWorld.Com).mp3","2.mp3"],
        "songs/Chill_(moood)": ["White_Brown_Black_1.mp3", "3.mp3"],
        "songs/cs": ["Teri Baaton Mein Aisa Uljha Jiya-(Mr-Jat.in).mp3","4.mp3"],
        "songs/Dark_(mood)": ["Daru_Badnaam_1.mp3","5.mp3"],
        "songs/Diljit": ["Naina Da Kahina-(Mr-Jat.in).mp3","6.mp3"],
        "songs/Funcky_(mood)": ["Ilahi-(SambalpuriStar.In).mp3","7.mp3"],
        "songs/karan aujla": ["softly.mp3", "8.mp3"],
        "songs/Love_(mood)": ["Raataan Lambiyan Shershaah 128 Kbps.mp3","9.mp3"],
        "songs/Uplifting_(mood)": ["Tere Bina(KoshalWorld.Com).mp3","10.mp3"]
    };
    // Hardcoded list of folders and their info since fetch doesn't work locally
    let folderData = {
        "Angry_(mood)": { title: "Angry Hits", description: "Songs for when you're feeling angry" },
        "Bright_(mood)": { title: "Bright Hits", description: "Bright and uplifting songs" },
        "Chill_(moood)": { title: "Chill Vibes", description: "Relaxing chill music" },
        "cs": { title: "CS Music", description: "Cool CS tracks" },
        "Dark_(mood)": { title: "Dark Hits", description: "Dark and moody songs" },
        "Diljit": { title: "Diljit Dosanjh", description: "Punjabi hits by Diljit" },
        "Funcky_(mood)": { title: "Funky Hits", description: "Funky and fun songs" },
        "karan aujla": { title: "Karan Aujla", description: "Punjabi music by Karan Aujla" },
        "Love_(mood)": { title: "Love Songs", description: "Romantic love tracks" },
        "ncs": { title: "NCS", description: "No Copyright Sounds" },
        "Uplifting_(mood)": { title: "Uplifting Hits", description: "Motivational uplifting music" }
    }
    let cardContainer = document.querySelector(".cardContainer")
    for (let folder in folderData) {
        let data = folderData[folder]
        cardContainer.innerHTML = cardContainer.innerHTML + ` <div data-folder="${folder}" class="card">
        <div class="play">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M5 20V4L19 12L5 20Z" stroke="#141B34" fill="#000" stroke-width="1.5"
                    stroke-linejoin="round" />
                </svg>
        </div>

        <img src="./songs/${folder}/cover.jpg" alt="">
        <h2>${data.title}</h2>
        <p>${data.description}</p>
    </div>`
    }

    // Load the playlist whenever card is clicked
    Array.from(document.getElementsByClassName("card")).forEach(e => { 
        e.addEventListener("click", async item => {
            // Since all songs are loaded, perhaps highlight or something, but for now, do nothing or play first song
            let folder = item.currentTarget.dataset.folder;
            let songsInFolder = songLists[`songs/${folder}`];
            let songToPlay = songsInFolder ? songsInFolder[0] : null; // Play the first song
            if (songToPlay) {
                currFolder = `songs/${folder}`;
                playMusic(songToPlay);
            }
        })
    })
}

async function main() {
    // Get the list of all the songs
    await loadAllSongs()

    // Display all the albums on the page
    await displayAlbums()


    // Attach an event listener to play, next and previous
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            play.src = "images/pause.svg"
        }
        else {
            currentSong.pause()
            play.src = "images/play.svg"
        }
    })

    // Listen for timeupdate event
    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    })

    // Add an event listener to seekbar
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) / 100
    })

    // Add an event listener for hamburger
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0"
    })

    // Add an event listener for close button
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%"
    })

    // Add an event listener to previous
    previous.addEventListener("click", () => {
        currentSong.pause()
        console.log("Previous clicked")
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        if ((index - 1) >= 0) {
            playMusic(songs[index - 1])
        }
    })

    // Add an event listener to next
    next.addEventListener("click", () => {
        currentSong.pause()
        console.log("Next clicked")

        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        if ((index + 1) < songs.length) {
            playMusic(songs[index + 1])
        }
    })

    // Add an event to volume
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        console.log("Setting volume to", e.target.value, "/ 100")
        currentSong.volume = parseInt(e.target.value) / 100
        if (currentSong.volume >0){
            document.querySelector(".volume>img").src = document.querySelector(".volume>img").src.replace("mute.svg", "volume.svg")
        }
    })

    // Add event listener to mute the track
    document.querySelector(".volume>img").addEventListener("click", e=>{ 
        if(e.target.src.includes("volume.svg")){
            e.target.src = e.target.src.replace("volume.svg", "mute.svg")
            currentSong.volume = 0;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
        }
        else{
            e.target.src = e.target.src.replace("mute.svg", "volume.svg")
            currentSong.volume = .10;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 10;
        }

    })





}

main() 
