import React, { useEffect, useRef } from 'react'

export default React.memo(function Note({ vco, letter, gain, freq, frequencies, octave, detune, wave }) {

    function createEvent(eventType, event) {
        var resp = document.createEvent(eventType);
        resp.initEvent(event, true, true);
        return resp;
    }

    const ref = useRef();

    useEffect(() => {
        document.addEventListener('keydown', (e) => {
            if (e.key === letter) ref.current.dispatchEvent(createEvent('MouseEvents', 'pointerdown'));
        })
        document.addEventListener('keyup', (e) => {
            if (e.key === letter) ref.current.dispatchEvent(createEvent('MouseEvents', 'pointerup'));
        })
    }, [])

    function playNote() {
        var octaveFreq = frequencies[frequencies.indexOf(freq) + octave.current * 12];
        vco.vco.frequency.setValueAtTime((octaveFreq) ? octaveFreq : (frequencies[frequencies.length - 1]), vco.ctx.currentTime);
        vco.vco.detune.setValueAtTime(detune.current, vco.ctx.currentTime);
        vco.vco.type = wave.current;
        vco.vca.gain.setValueAtTime(gain.current, vco.ctx.currentTime);
        ref.current.addEventListener('mouseleave', pointerUp);
        function pointerUp() {
            ref.current.dispatchEvent(createEvent('MouseEvents', 'pointerup'));
            ref.current.removeEventListener('mouseleave', pointerUp);
        }
        ref.current.className = 'note active';
    }

    return (
        <div className='note' ref={ref} onPointerDown={() => playNote()} onPointerUp={() => { vco.vca.gain.setValueAtTime(0, vco.ctx.currentTime); ref.current.className = 'note' }} onMouseEnter={(e) => { if (e.buttons > 0) ref.current.dispatchEvent(createEvent('MouseEvents', 'pointerdown')); }} />
    )
})