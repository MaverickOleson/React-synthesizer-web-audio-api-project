import React, {useState, useEffect} from 'react'

const Mic = () => {

    var context = new AudioContext();

    var media = MediaDevices.getUserMedia();

    var streamSource = context.createMediaStreamSource();

    const [stream, setStream] = useState();

    async function getMedia() {
        let stream = null;
      
        try {
          stream = await navigator.mediaDevices.getUserMedia(true, false);
          /* use the stream */
        } catch(err) {
          /* handle the error */
        }
      }
    
    return (
        <div>
            
        </div>
    )
}

export default Mic
