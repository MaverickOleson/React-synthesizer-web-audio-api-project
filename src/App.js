import './styles/main.css';

function App() {

  let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  let audio = document.querySelector('song1');
  let analyser = audioCtx.createAnalyser();
  let source = audioCtx.createMediaElementSource(audio);

  return (
    <div className="Synth">
      <audio id="whu" src="" controls=""></audio>
    </div>
  );
}

export default App;
