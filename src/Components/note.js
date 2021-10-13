import React, { useEffect, useRef } from 'react'

export default React.memo(function Note({ vco, letter, gain, freq, frequencies, octave, detune, wave, waveShaping, attack, decay, sustain, release }) {

    const keyDown = useRef(false);

    const ref = useRef();

    useEffect(() => {
        document.addEventListener('keydown', (e) => {
            if (!keyDown.current && e.key === letter) { ref.current.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })); keyDown.current = true };
        }, false);
        document.addEventListener('keyup', (e) => {
            if (e.key === letter) { ref.current.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, cancelable: false })); keyDown.current = false; };
        }, false);
    }, [])

    function playNote(e) {
        var real = new Float32Array([0,1]);
        var imag = new Float32Array([0,0]);

        var wave = vco.ctx.createPeriodicWave(real, imag, {disableNormalization: true});

        vco.vco.setPeriodicWave(wave);
        
        var octaveFreq = frequencies[frequencies.indexOf(freq) + octave.current * 12];
        vco.vco.frequency.setValueAtTime((octaveFreq) ? octaveFreq : (frequencies[frequencies.length - 1]), 0);
        vco.vco.detune.setValueAtTime(detune.current, 0);
        vco.vco.type = wave.current;
        vco.waveShaping.curve = new Float32Array([waveShaping.current, -waveShaping.current]);
        vco.vca.gain.cancelScheduledValues(0);
        vco.vca.gain.linearRampToValueAtTime(gain.current, vco.ctx.currentTime + attack.current);
        vco.vca.gain.linearRampToValueAtTime(sustain.current, vco.ctx.currentTime + attack.current + decay.current);
        ref.current.addEventListener('mouseleave', pointerUp);
        function pointerUp() {
            ref.current.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));
            ref.current.removeEventListener('mouseleave', pointerUp);
        }
        ref.current.className = 'note active';
    }

    return (
        <div className='note' ref={ref} onPointerDown={(e) => playNote(e)} onPointerUp={() => { vco.vca.gain.cancelScheduledValues(0); vco.vca.gain.linearRampToValueAtTime(0, vco.ctx.currentTime + release.current); ref.current.className = 'note' }} onMouseEnter={(e) => { if (e.buttons > 0) ref.current.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })); }} />
    )
})