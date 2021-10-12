import React, { useState, useEffect } from 'react'

export default function Knob({ value = 0, fullRot = 180, rotateMin = -180, increment = 2, min, factor = 1 }) {

    const [rotation, setRotation] = useState(0);

    function a(e1) {
        document.addEventListener('mousemove', rotate);
        function rotate(e2) {
            if (rotation + (e2.clientX - e1.clientX) * increment > fullRot) setRotation(fullRot);
            else if (rotation + (e2.clientX - e1.clientX) * increment < rotateMin) setRotation(rotateMin);
            else {
                setRotation(rotation + (e2.clientX - e1.clientX) * increment);
            }
            document.addEventListener('click', remove);
        }
        function remove() {
            document.removeEventListener('mousemove', rotate);
            document.removeEventListener('click', remove);
        }
    }
    useEffect(() => {
        value.current = (fullRot * factor + min * factor) + rotation * factor;
        console.log(value.current)
    })

    return (
        <div onMouseDown={(e) => a(e)} className='knob'>
            <div className='knob-marker' style={{ transform: `translateX(50%) rotateZ(${rotation}deg)` }} />
        </div>
    )
}