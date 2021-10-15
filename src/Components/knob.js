import React, { useState, useEffect } from 'react'

export default React.memo(function Knob({ value = 0, fullRot = 180, init = 0, increment = 2, min, factor = 1 }) {

    const [rotation, setRotation] = useState(init);

    function rotate(e1) {
        document.addEventListener('pointermove', rotate);
        function rotate(e2) {
            if (rotation + (e2.clientX - e1.clientX) * increment > fullRot) setRotation(fullRot);
            else if (rotation + (e2.clientX - e1.clientX) * increment < -fullRot) setRotation(-fullRot);
            else {
                setRotation(rotation + (e2.clientX - e1.clientX) * increment);
            }
            document.addEventListener('click', remove);
            //checks if movement exceeds 180 degrees and sets value below 180 if true
        }
        function remove() {
            document.removeEventListener('pointermove', rotate);
            document.removeEventListener('click', remove);
        }
    }
    useEffect(() => {
        value.current = (fullRot * factor + min * factor) + rotation * factor;
    })

    return (
        <div onPointerDown={(e) => rotate(e)} className='knob'>
            <div className='knob-marker' style={{ transform: `translateX(50%) rotateZ(${rotation}deg)` }} />
            {/* rotation set in style property */}
        </div>
    )
});