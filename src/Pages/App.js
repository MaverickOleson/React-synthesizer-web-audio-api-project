import React, { useState, useEffect, useRef } from 'react';
import Note from '../Components/note';
import Knob from '../Components/knob';
import SwitchButtons from '../Components/switchButtons';

function App() {

  function createVco() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    // VCO
    const vco1 = audioCtx.createOscillator();

    // VCA
    const vca1 = audioCtx.createGain();
    vca1.gain.setValueAtTime(0, 0);

    const waveShaping = audioCtx.createWaveShaper();

    // function makeDistortionCurve(amount) {
    //   var k = typeof amount === 'number' ? amount : 50,
    //     n_samples = 44100,
    //     curve = new Float32Array(n_samples),
    //     deg = Math.PI / 180,
    //     i = 0,
    //     x;
    //   for (; i < n_samples; ++i) {
    //     x = i * 2 / n_samples - 1;
    //     curve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x));
    //   }
    //   return curve;
    // };
    const vco2 = audioCtx.createOscillator();

    const vca2 = audioCtx.createGain();
    vca2.gain.setValueAtTime(0, 0)

    vco1.connect(waveShaping);
    waveShaping.connect(vca1);//
    vca1.connect(audioCtx.destination);

    vco2.connect(vca2);
    vca2.connect(audioCtx.destination)

    return { ctx: audioCtx, vco1: vco1, vca1: vca1, vco2: vco2, vca2: vca2, waveShaping: waveShaping };
  }

  const [vcos] = useState([
    createVco(),
    createVco(),
    createVco(),
    createVco(),
    createVco(),
    createVco(),
    createVco(),
    createVco(),
    createVco(),
    createVco(),
    createVco(),
    createVco(),
    createVco(),
    createVco(),
    createVco(),
    createVco(),
    createVco(),
    createVco(),
    createVco(),
    createVco(),
    createVco(),
    createVco(),
    createVco(),
    createVco()
  ]);

  // const frequencies = {
  //   "C": [16.35, 32.70, 65.41, 130.81, 261.63, 523.25, 1046.50, 2093.00, 4186.01],
  //   "Db": [17.32, 34.65, 69.30, 138.59, 277.18, 554.37, 1108.73, 2217.46, 4434.92],
  //   "D": [18.35, 36.71, 73.42, 146.83, 293.66, 587.33, 1174.66, 2349.32, 4698.64],
  //   "Eb": [19.45, 38.89, 77.78, 155.56, 311.13, 622.25, 1244.51, 2489.02, 4978.03],
  //   "E": [20.60, 41.20, 82.41, 164.81, 329.63, 659.26, 1318.51, 2637.02],
  //   "F": [21.83, 43.65, 87.31, 174.61, 349.23, 698.46, 1396.91, 2793.83],
  //   "Gb": [23.12, 46.25, 92.50, 185.00, 369.99, 739.99, 1479.98, 2959.96],
  //   "G": [24.50, 49.00, 98.00, 196.00, 392.00, 783.99, 1567.98, 3135.96],
  //   "Ab": [25.96, 51.91, 103.83, 207.65, 415.30, 830.61, 1661.22, 3322.44],
  //   "A": [27.50, 55.00, 110.00, 220.00, 440.00, 880.00, 1760.00, 3520.00],
  //   "Bb": [29.14, 58.27, 116.54, 233.08, 466.16, 932.33, 1864.66, 3729.31],
  //   "B": [30.87, 61.74, 123.47, 246.94, 493.88, 987.77, 1975.53, 3951.07]
  // }

  const frequencies = [16.35, 17.32, 18.35, 19.45, 20.6, 21.83, 23.12, 24.5, 25.96, 27.5, 29.14, 30.87, 32.7, 34.65, 36.71, 38.89, 41.2, 43.65, 46.25, 49, 51.91, 55, 58.27, 61.74, 65.41, 69.3, 73.42, 77.78, 82.41, 87.31, 92.5, 98, 103.83, 110, 116.54, 123.47, 130.81, 138.59, 146.83, 155.56, 164.81, 174.61, 185, 196, 207.65, 220, 233.08, 246.94, 261.63, 277.18, 293.66, 311.13, 329.63, 349.23, 369.99, 392, 415.3, 440, 466.16, 493.88, 523.25, 554.37, 587.33, 622.25, 659.26, 698.46, 739.99, 783.99, 830.61, 880, 932.33, 987.77, 1046.5, 1108.73, 1174.66, 1244.51, 1318.51, 1396.91, 1479.98, 1567.98, 1661.22, 1760, 1864.66, 1975.53, 2093, 2217.46, 2349.32, 2489.02, 2637.02, 2793.83, 2959.96, 3135.96, 3322.44, 3520, 3729.31, 3951.07, 4186.01, 4434.92, 4698.64, 4978.03, 5274.04, 5587.65, 5919.91, 6271.93, 6644.88, 7040.00, 7458.62, 7902.13]

  const gain1 = useRef(0.5);
  const gain2 = useRef(0);

  const octave = useRef(0);

  const detune1 = useRef(0);
  const detune2 = useRef(0);

  const waveShaping = useRef(1);

  const wave1 = useRef('sawtooth');
  const wave2 = useRef('sawtooth');

  const attack1 = useRef(0);
  const attack2 = useRef(0);

  const decay1 = useRef(0);
  const decay2 = useRef(0);

  const sustain1 = useRef(gain1.current);
  const sustain2 = useRef(gain2.current);

  const release1 = useRef(0);
  const release2 = useRef(0);


  const [noteKeys, setNoteKeys] = useState([
    'a',
    'w',
    's',
    'e',
    'd',
    'f',
    't',
    'g',
    'y',
    'h',
    'u',
    'j',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    ''
  ]);

  return (
    <div className="synth">
      <button onClick={() => vcos.map(vco => { vco.vco1.start(); vco.vco2.start() })}>Start</button>
      <div className='modules'>
        <div className='module'>
          Gain
          <Knob value={gain1} increment={2} min={0} factor={1 / 360} />
          <Knob value={gain2} init={-180} increment={2} min={0} factor={1 / 360} />
          Octave
          <SwitchButtons value={octave} outputs={[-4, -3, -2, -1, 0, 1, 2, 3, 4]} info={[-4, -3, -2, -1, 0, 1, 2, 3, 4]} startIndex={4} binds={['1', '2', '3', '4', '5', '6', '7', '8', '9']} />
          Waveform
          <SwitchButtons value={wave1} outputs={['sawtooth', 'square', 'triangle', 'sine']} info={['sawtooth', 'square', 'triangle', 'sine']} startIndex={0} binds={['z', 'x', 'c', 'v']} />
          <SwitchButtons value={wave2} outputs={['sawtooth', 'square', 'triangle', 'sine']} info={['sawtooth', 'square', 'triangle', 'sine']} startIndex={0} binds={['b', 'n', 'm', ',']} />
        </div>
        <div className='module'>
          Detune
          <Knob value={detune1} increment={4} min={-180} factor={20} />
          <Knob value={detune2} increment={4} min={-180} factor={20} />
        </div>
        <div className='module'>
          Attack
          <Knob value={attack1} init={-180} increment={2} min={0} factor={1 / 180} />
          Decay
          <Knob value={decay1} init={-180} increment={2} min={0} factor={1 / 180} />
          Sustain
          <Knob value={sustain1} init={180} increment={2} min={0} factor={1 / 360} />
          Release
          < Knob value={release1} init={-180} increment={2} min={0} factor={1 / 180} />
        </div>
        <div className='module'>
          Attack
          <Knob value={attack2} init={-180} increment={2} min={0} factor={1 / 180} />
          Decay
          <Knob value={decay2} init={-180} increment={2} min={0} factor={1 / 180} />
          Sustain
          <Knob value={sustain2} init={180} increment={2} min={0} factor={1 / 360} />
          Release
          < Knob value={release2} init={-180} increment={2} min={0} factor={1 / 180} />
        </div>
        <div className='module'>Wave Shaper<Knob value={waveShaping} init={-180} increment={3} min={1} factor={1} /></div>
      </div>
      <div className='keyboard'>
        {noteKeys.map((noteKey, index) => {
          return <Note key={`note${index}`} oscBank={vcos[index]} letter={noteKey} gain1={gain1} gain2={gain2} freq={frequencies[48 + index]} frequencies={frequencies} octave={octave} detune1={detune1} detune2={detune2} wave1={wave1} wave2={wave2} waveShaping={waveShaping} attack1={attack1} decay1={decay1} sustain1={sustain1} release1={release1} attack2={attack2} decay2={decay2} sustain2={sustain2} release2={release2} />
        })}
      </div>
      <button onClick={() => {
        navigator.requestMIDIAccess()
          .then(midiAccess => {
            midiAccess.inputs.forEach(input => {
              input.onmidimessage = (msg) => {
                if (msg.data[0] === 144) {
                  gain1.current = msg.data[2] * 1 / 127;
                  gain2.current = msg.data[2] * 1 / 127;
                  document.getElementsByClassName('note')[(msg.data[1]) % noteKeys.length].dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
                }
                if (msg.data[0] === 128) {
                  document.getElementsByClassName('note')[(msg.data[1]) % noteKeys.length].dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));
                }
                // else {
                //   a.map((note) => { document.getElementsByClassName('note')[note].dispatchEvent(new PointerEvent('pointerup', { bubbles: true })); console.log(a); a.splice(a.indexOf(note), 1); })
                // }
              };
            });
          })
          .catch(error => {
            console.log(error);
          })
      }}>MIDI</button>
    </div >
  );
}

export default React.memo(App);

