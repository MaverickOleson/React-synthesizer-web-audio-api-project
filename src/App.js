import React, { useState, useEffect, useRef } from 'react';
import './styles/main.css';
import Note from './note';

function App() {
  const [key, setKey] = useState(1);

  const notes = [261.63, 277.18, 293.66, 311.13, 329.63, 349.23, 369.99, 392, 415.3, 440, 466.16, 493.88, 523.25, 554.37, 587.33, 622.25, 659.25, 698.46, 739.99, 783.99];

  const keys = ['a', 'w', 's', 'e', 'd', 'f', 't', 'g', 'y', 'h', 'u', 'j', 'k', 'o', 'l', 'p', ';', "'", ']'];

  const noteRefs = useRef([]);
  noteRefs.current = [];

  // function createNote(){
  //   const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  //   const vco = audioCtx.createOscillator();
  //   vco.type = 'sawtooth';

  //   const vca = audioCtx.createGain();
  //   vca.gain.value = 0;

  //   vco.connect(vca);
  //   vca.connect(audioCtx.destination);

  //   vco.start();

  //   return [audioCtx, vco, vca];
  // }

  // const [ready, setReady] = useState(false);

  // const vcos = (ready) ? keys.map(()=>{return createNote()}) : null;

  // function playNote([ctx, vco, vca], note){
  //   vco.frequency.setValueAtTime(note * key, ctx.currentTime);
  //   vca.gain.setValueAtTime(1, ctx.currentTime);
  // };
  function createEvent(eventType, event) {
    var resp = document.createEvent(eventType);
    resp.initEvent(event, true, true);
    return resp;
  }

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      for (var i = 0; i < keys.length; i++) {
        if (e.key === keys[i]) {
          noteRefs.current[i].dispatchEvent(createEvent('MouseEvents', 'mousedown'));
        }
      }
    })
    document.addEventListener('keyup', (e) => {
      for (var i = 0; i < keys.length; i++) {
        if (e.key === keys[i]) {
          noteRefs.current[i].dispatchEvent(createEvent('MouseEvents', 'mouseup'));
        }
      }
    })
    // document.addEventListener('keydown', (e)=>{
    //   playNote(vcos[keys.indexOf(e.key)], notes[keys.indexOf(e.key)]);
    // });
    // document.addEventListener('keyup', (e)=>{
    //   vcos[keys.indexOf(e.key)][2].gain.setValueAtTime(0, vcos[keys.indexOf(e.key)][0].currentTime);
    // });
  })

  return (
    <div className="synth">
      {notes.map((note, index) => {
        return <Note key={`note${index}`} refs={noteRefs.current} note={note} />
      })}
    </div>
  );
}

export default App;

