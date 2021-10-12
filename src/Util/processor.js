// test-processor.js
class TestProcessor extends window.AudioWorklet {
    constructor() {
        super();
    }
    // the process method is required - output silence,
    // which the outputs are already filled with
    process(inputs, outputs, parameters) {
        return true
    }
}

// you can declare any variables and use them in your processors
// for example it may be an ArrayBuffer with a wavetable
const usefulVariable = 42
console.log(usefulVariable)
registerProcessor('test-processor', TestProcessor);