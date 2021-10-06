import React, { useState, useEffect, useRef } from 'react';
import Note from '../Components/note';
import Knob from '../Components/knob';

function App() {
  const [key, setKey] = useState(1);

  const notes = [261.63, 277.18, 293.66, 311.13, 329.63, 349.23, 369.99, 392, 415.3, 440, 466.16, 493.88, 523.25, 554.37, 587.33, 622.25, 659.25, 698.46, 739.99, 783.99];

  const keys = ['a', 'w', 's', 'e', 'd', 'f', 't', 'g', 'y', 'h', 'u', 'j', 'k', 'o', 'l', 'p', ';', "'", ']'];

  const noteRefs = useRef([]);
  noteRefs.current = [];

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
  })

  return (
    <div className="synth">
      {notes.map((note, index) => {
        return <Note key={`note${index}`} refs={noteRefs.current} note={note} />
      })}
      <Knob/>
    </div>
  );
}

export default App;

