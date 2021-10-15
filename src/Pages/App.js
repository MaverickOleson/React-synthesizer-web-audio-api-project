import React, { useState, useEffect, useRef } from 'react';
import Note from '../Components/note';
import Knob from '../Components/knob';
import SwitchButtons from '../Components/switchButtons';
import Loading from '../Components/loading';
import { FaWaveSquare } from 'react-icons/fa';
import { TiWaves } from 'react-icons/ti';

function Synth() {

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
    'k',
    'o',
    'l',
    'p',
    ';',
    "'",
    '',
    '',
    '',
    '',
    '',
    ''
  ]);
  //binds for notes (also sets number of note components)

  function createVco() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    // VCO
    const vco1 = audioCtx.createOscillator();

    // VCA
    const vca1 = audioCtx.createGain();
    vca1.gain.setValueAtTime(0, 0);

    const vco2 = audioCtx.createOscillator();

    const vca2 = audioCtx.createGain();
    vca2.gain.setValueAtTime(0, 0)

    vco1.connect(vca1);
    vca1.connect(audioCtx.destination);

    vco2.connect(vca2);
    vca2.connect(audioCtx.destination)

    return { ctx: audioCtx, vco1: vco1, vca1: vca1, vco2: vco2, vca2: vca2 };
    //creates and returns sounds
  }

  const [vcos] = useState(noteKeys.map(() => { return createVco() }));
  //array of sounds made from binds

  const frequencies = [16.35, 17.32, 18.35, 19.45, 20.6, 21.83, 23.12, 24.5, 25.96, 27.5, 29.14, 30.87, 32.7, 34.65, 36.71, 38.89, 41.2, 43.65, 46.25, 49, 51.91, 55, 58.27, 61.74, 65.41, 69.3, 73.42, 77.78, 82.41, 87.31, 92.5, 98, 103.83, 110, 116.54, 123.47, 130.81, 138.59, 146.83, 155.56, 164.81, 174.61, 185, 196, 207.65, 220, 233.08, 246.94, 261.63, 277.18, 293.66, 311.13, 329.63, 349.23, 369.99, 392, 415.3, 440, 466.16, 493.88, 523.25, 554.37, 587.33, 622.25, 659.26, 698.46, 739.99, 783.99, 830.61, 880, 932.33, 987.77, 1046.5, 1108.73, 1174.66, 1244.51, 1318.51, 1396.91, 1479.98, 1567.98, 1661.22, 1760, 1864.66, 1975.53, 2093, 2217.46, 2349.32, 2489.02, 2637.02, 2793.83, 2959.96, 3135.96, 3322.44, 3520, 3729.31, 3951.07, 4186.01, 4434.92, 4698.64, 4978.03, 5274.04, 5587.65, 5919.91, 6271.93, 6644.88, 7040.00, 7458.62, 7902.13]
  //usable frequencies for notes

  const gain1 = useRef(0.5);
  const gain2 = useRef(0);

  const velocity = useRef(1);

  const octave = useRef(0);

  const detune1 = useRef(0);
  const detune2 = useRef(0);

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
  //properties of sounds

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [start, setStart] = useState(false);

  useEffect(() => {
    try {
      setTimeout(() => { setIsLoading(false) }, 3400);
    } catch (error) {
      setIsError(error);
    }
  }, [])
  //conditional rendering setup

  if (isError) return <h1 className='error'>Sorry, there was an error.</h1>;
  else if (!start) {
    return (
      <div className='startPage'>
        <button onClick={() => { vcos.map(vco => { vco.vco1.start(); vco.vco2.start() }); setStart(true); }}>Startup Synth</button>
      </div>
    )
  }
  else if (isLoading) return <Loading />;
  else {
    return (
      <div className="synth">
        <div className='modules'>
          <FaWaveSquare className='icon' />
          <TiWaves className='icon' />
          <div className='module'>
            <Knob value={gain1} increment={2} min={0} factor={1 / 360} />
            Gain
            <Knob value={gain2} init={-180} increment={2} min={0} factor={1 / 360} />
            Gain
          </div>
          <div className='module'>
            Octave
            <SwitchButtons value={octave} outputs={[-4, -3, -2, -1, 0, 1, 2, 3, 4]} info={[-4, -3, -2, -1, 0, 1, 2, 3, 4]} startIndex={4} binds={['1', '2', '3', '4', '5', '6', '7', '8', '9']} />
            <div className='sep' />
            Waveform
            <SwitchButtons value={wave1} outputs={['sawtooth', 'square', 'triangle', 'sine']} info={['sawtooth', 'square', 'triangle', 'sine']} startIndex={0} binds={['z', 'x', 'c', 'v']} />
            <div className='sep' />
            Waveform
            <SwitchButtons value={wave2} outputs={['sawtooth', 'square', 'triangle', 'sine']} info={['sawtooth', 'square', 'triangle', 'sine']} startIndex={0} binds={['b', 'n', 'm', ',']} />
          </div>
          <div className='module'>
            <Knob value={detune1} increment={4} min={-180} factor={20} />
            Detune
            <Knob value={detune2} increment={4} min={-180} factor={20} />
            Detune
          </div>
          <div className='envelopes'>
            <div className='envelope'>
              <div className='textBox'>
                <Knob value={attack1} init={-180} increment={2} min={0} factor={1 / 180} />
                <p>Attack</p>
              </div>
              <div className='textBox'>
                <Knob value={decay1} init={-180} increment={2} min={0} factor={1 / 180} />
                <p>Decay</p>
              </div>
              <div className='textBox'>
                <Knob value={sustain1} init={180} increment={2} min={0} factor={1 / 360} />
                <p>Sustain</p>
              </div>
              <div className='textBox'>
                < Knob value={release1} init={-180} increment={2} min={0} factor={1 / 180} />
                <p>Release</p>
              </div>
            </div>
            <div className='envelope'>
              <div className='textBox'>
                <Knob value={attack2} init={-180} increment={2} min={0} factor={1 / 180} />
                <p>Attack</p>
              </div>
              <div className='textBox'>
                <Knob value={decay2} init={-180} increment={2} min={0} factor={1 / 180} />
                Decay
              </div>
              <div className='textBox'>
                <Knob value={sustain2} init={180} increment={2} min={0} factor={1 / 360} />
                Sustain
              </div>
              <div className='textBox'>
                < Knob value={release2} init={-180} increment={2} min={0} factor={1 / 180} />
                Release
              </div>
            </div>
          </div>
        </div>
        <div className='keyboard'>
          {noteKeys.map((noteKey, index) => {
            return <Note key={`note${index}`} oscBank={vcos[index]} letter={noteKey} gain1={gain1} gain2={gain2} velocity={velocity} freq={frequencies[48 + index]} frequencies={frequencies} octave={octave} detune1={detune1} detune2={detune2} wave1={wave1} wave2={wave2} attack1={attack1} decay1={decay1} sustain1={sustain1} release1={release1} attack2={attack2} decay2={decay2} sustain2={sustain2} release2={release2} />
          })}
        </div>
        <button className='midi' onClick={() => {
          // button that sets up midi access
          navigator.requestMIDIAccess()
            .then(midiAccess => {
              midiAccess.inputs.forEach(input => {
                input.onmidimessage = (msg) => {
                  if (msg.data[0] === 144) {
                    velocity.current = msg.data[2] * 1 / 127;
                    document.getElementsByClassName('note')[(msg.data[1]) % noteKeys.length].dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
                  }
                  if (msg.data[0] === 128) {
                    document.getElementsByClassName('note')[(msg.data[1]) % noteKeys.length].dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));
                    velocity.current = 1;
                  }
                };
              });
            })
            .catch(error => {
              alert(error);
            })
        }}>Access Midi Device</button>
      </div >
    );
  }
}

export default React.memo(Synth);

