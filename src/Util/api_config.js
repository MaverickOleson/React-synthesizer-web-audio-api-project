// for legacy browsers
const AudioContext = window.AudioContext || window.webkitAudioContext;

const audioContext = new AudioContext();

// pass it into the audio context
function createMediaElementSource(audioElement){
    return audioContext.createMediaElementSource(audioElement);
}