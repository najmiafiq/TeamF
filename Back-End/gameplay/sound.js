const musicAudio = document.getElementById("musicAudio");
const effectAudio = document.getElementById("effectAudio");
const defaultVolume = 0.5;

window.onload = function () {
    musicAudio.loop = true;
    musicAudio.volume = defaultVolume;
    effectAudio.volume = defaultVolume;
    musicAudio.play();
}

window.addEventListener('click', () => {
    effectAudio.currentTime = 0.14;
    effectAudio.play();
})

document.getElementById("music").addEventListener('input', (event) => {
    musicAudio.volume = event.target.value;
});

document.getElementById("effect").addEventListener('input', (event) => {
    effectAudio.volume = event.target.value;
});