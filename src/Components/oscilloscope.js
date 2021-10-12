import React, { useRef } from 'react'

export default function Oscilloscope() {

    var auCtx = new AudioContext();
    var osc = auCtx.createOscillator();
    var gain = auCtx.createGain();
    var dest = auCtx.destination;
    var analyser = auCtx.createAnalyser();

    analyser.fftSize = 2048;

    osc.connect(gain);
    gain.connect(dest);
    gain.connect(analyser);

    osc.frequency.value = 110;
    osc.type = 'square';
    gain.gain.value = 0.5;
    osc.start();

    var scopeCtx = document.getElementById('scope').getContext('2d');
    var spectCtx = document.getElementById('spectrum').getContext('2d');

    draw();

    const ref = useRef();

    function gainInp(val) {
        document.querySelector('#gainVal').value = val;
        gain.gain.value = val;
    }

    function freqInp(val) {
        document.querySelector('#freqVal').value = val;
        osc.frequency.value = val;
    }

    function shapeInp(val) {
        document.querySelector('#shapeVal').value = val;

        switch (val) {
            case '2':
                osc.type = 'square';
                break;
            case '3':
                osc.type = 'sawtooth';
                break;
            case '4':
                osc.type = 'triangle';
                break;
            default:
                osc.type = 'sine';
                break;
        }
    }

    function silence() {
        gain.gain.value = 0;
    }

    function draw() {
        drawSpectrum(analyser, spectCtx);
        drawScope(analyser, scopeCtx);

        requestAnimationFrame(draw);
    }

    function drawSpectrum(analyser, ctx) {
        var width = ctx.canvas.width;
        var height = ctx.canvas.height;
        var freqData = new Uint8Array(analyser.frequencyBinCount);
        var scaling = height / 256;

        analyser.getByteFrequencyData(freqData);

        ctx.fillStyle = 'rgba(0, 20, 0, 0.1)';
        ctx.fillRect(0, 0, width, height);

        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgb(0, 200, 0)';
        ctx.beginPath();

        for (var x = 0; x < width; x++)
            ctx.lineTo(x, height - freqData[x] * scaling);

        ctx.stroke();
    }

    function drawScope(analyser, ctx) {
        var width = ctx.canvas.width;
        var height = ctx.canvas.height;
        var timeData = new Uint8Array(analyser.frequencyBinCount);
        var scaling = height / 256;
        var risingEdge = 0;
        var edgeThreshold = 5;

        analyser.getByteTimeDomainData(timeData);

        ctx.fillStyle = 'rgba(0, 20, 0, 0.1)';
        ctx.fillRect(0, 0, width, height);

        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgb(0, 200, 0)';
        ctx.beginPath();

        // No buffer overrun protection
        while (timeData[risingEdge++] - 128 > 0 && risingEdge <= width);
        if (risingEdge >= width) risingEdge = 0;

        while (timeData[risingEdge++] - 128 < edgeThreshold && risingEdge <= width);
        if (risingEdge >= width) risingEdge = 0;

        for (var x = risingEdge; x < timeData.length && x - risingEdge < width; x++)
            ctx.lineTo(x - risingEdge, height - timeData[x] * scaling);

        ctx.stroke();
    }

    // // Get a canvas defined with ID "oscilloscope"
    // var canvas = document.getElementById("oscilloscope");
    // var canvasCtx = canvas.getContext("2d");

    // // draw an oscilloscope of the current audio source

    // function draw() {

    //     requestAnimationFrame(draw);

    //     analyser.getByteTimeDomainData(dataArray);

    //     canvasCtx.fillStyle = "rgb(200, 200, 200)";
    //     canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    //     canvasCtx.lineWidth = 2;
    //     canvasCtx.strokeStyle = "rgb(0, 0, 0)";

    //     canvasCtx.beginPath();

    //     var sliceWidth = canvas.width * 1.0 / bufferLength;
    //     var x = 0;

    //     for (var i = 0; i < bufferLength; i++) {

    //         var v = dataArray[i] / 128.0;
    //         var y = v * canvas.height / 2;

    //         if (i === 0) {
    //             canvasCtx.moveTo(x, y);
    //         } else {
    //             canvasCtx.lineTo(x, y);
    //         }

    //         x += sliceWidth;
    //     }

    //     canvasCtx.lineTo(canvas.width, canvas.height / 2);
    //     canvasCtx.stroke();
    // }

    // draw();
    return (
        <canvas ref={ref} className='oscilloscope' />
    )
}
