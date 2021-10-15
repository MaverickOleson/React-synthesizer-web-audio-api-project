import React, { useEffect, useRef } from 'react'

export default React.memo(function Note({ oscBank, letter, gain1, gain2, velocity, freq, frequencies, octave, detune1, detune2, wave1, wave2, attack1, decay1, sustain1, release1, attack2, decay2, sustain2, release2 }) {

    const keyDown = useRef(false);

    const ref = useRef();

    useEffect(() => {
        document.addEventListener('keydown', (e) => {
            if (!keyDown.current && e.key.toLowerCase() === letter) { ref.current.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })); keyDown.current = true };
        }, false);
        document.addEventListener('keyup', (e) => {
            if (e.key.toLowerCase() === letter) { ref.current.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, cancelable: false })); keyDown.current = false; };
        }, false);
    }, [])

    function playNote(e) {
        var octaveFreq = frequencies[frequencies.indexOf(freq) + octave.current * 12];
        oscBank.vco1.frequency.setValueAtTime((octaveFreq) ? octaveFreq : (frequencies[frequencies.length - 1]), 0);
        oscBank.vco1.detune.setValueAtTime(detune1.current, 0);
        oscBank.vco1.type = wave1.current;
        oscBank.vco2.frequency.setValueAtTime((octaveFreq) ? octaveFreq : (frequencies[frequencies.length - 1]), 0);
        oscBank.vco2.detune.setValueAtTime(detune2.current, 0);
        oscBank.vco2.type = wave2.current;
        oscBank.vca1.gain.cancelScheduledValues(0);
        oscBank.vca2.gain.cancelScheduledValues(0);
        oscBank.vca1.gain.linearRampToValueAtTime(gain1.current * velocity.current, oscBank.ctx.currentTime + attack1.current);
        oscBank.vca2.gain.linearRampToValueAtTime(gain2.current * velocity.current, oscBank.ctx.currentTime + attack2.current);
        oscBank.vca1.gain.linearRampToValueAtTime(sustain1.current * gain1.current * velocity.current, oscBank.ctx.currentTime + attack1.current + decay1.current);
        oscBank.vca2.gain.linearRampToValueAtTime(sustain2.current * gain2.current * velocity.current, oscBank.ctx.currentTime + attack2.current + decay2.current);
        //values set

        ref.current.addEventListener('pointerleave', pointerUp);
        function pointerUp() {
            ref.current.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));
            ref.current.removeEventListener('pointerleave', pointerUp);
        }
        ref.current.className = 'note active';
        //event to check if pointer leaves the note
    }

    function releaseNote() {
        oscBank.vca1.gain.cancelScheduledValues(0);
        oscBank.vca2.gain.cancelScheduledValues(0);
        oscBank.vca1.gain.linearRampToValueAtTime(0, oscBank.ctx.currentTime + release1.current);
        oscBank.vca2.gain.linearRampToValueAtTime(0, oscBank.ctx.currentTime + release2.current);
        ref.current.className = 'note';
        //values and class reset
    }

    return (
        <div className='note' ref={ref} onPointerDown={(e) => playNote(e)} onPointerUp={() => releaseNote()} onPointerEnter={(e) => { if (e.buttons > 0) ref.current.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })); }} />
    )
});