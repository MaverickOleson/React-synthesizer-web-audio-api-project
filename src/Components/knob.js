import React, {useState, useEffect, useRef} from 'react'

export default function Knob() {

    const [rotation, setRotation] = useState(0);

    const knobRef = useRef();

    useEffect(() => {
     return()=>{
         var a = ()=>document.removeEventListener('mousemove', a)
     }

    }, [])

    function checkRotate(x){
        document.addEventListener('mousemove', (e)=>{
            if(e.clientX > x) setRotation(rotation + e.clientX - x);
            if(e.clientX < x) setRotation(rotation + e.clientX - x);
        })
    }

    return (
        <div ref={knobRef} onMouseDown={(e)=>checkRotate(e.clientX)} className='knob'>
            <div className='knob-marker' style={{transform: `translateX(50%) rotateZ(${rotation}deg)`}}></div>
        </div>
    )
}
