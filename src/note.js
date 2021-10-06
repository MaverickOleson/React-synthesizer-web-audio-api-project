import React from 'react'

export default function Note({ refs, note }) {

    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    // VCO
    var vco = audioCtx.createOscillator();
    vco.type = 'sawtooth';
    vco.frequency.setValueAtTime(note, audioCtx.currentTime);

    // VCA
    var vca = audioCtx.createGain();
    vca.gain.value = 0;

    vco.connect(vca);
    vca.connect(audioCtx.destination);

    function setRefs(el) {
        refs.push(el);
    }

    return (
        <button ref={setRefs} onMouseDown={() => { if (audioCtx.state === 'suspended') vco.start(); vca.gain.setValueAtTime(1, audioCtx.currentTime) }} onMouseUp={() => { vca.gain.setValueAtTime(0, audioCtx.currentTime) }}>Play Note</button>
    )
}