import React, { useState, useEffect } from 'react';
import { useRef } from 'react/cjs/react.development';

export default function SwitchButtons({ value, outputs, info, startIndex }) {

    const buttonsRef = useRef([]);

    function setRefs(el) {
        buttonsRef.current.push(el);
    }

    useEffect(() => {
        buttonsRef.current[startIndex].className = 'active';
    }, []);

    return (
        <div className='switchButtons'>
            {outputs.map((output, index) => {
                return <div key={`output${index}`} className='output'>
                    <div ref={el => setRefs(el)} onPointerDown={(e) => {
                        for (var i = 0; i < outputs.length; i++) {
                            if (buttonsRef.current[i] === e.target) {
                                value.current = outputs[i];
                                console.log(outputs[i])
                                buttonsRef.current[i].className = 'active'
                            }
                            else {
                                buttonsRef.current[i].className = '';
                            }
                        }
                    }} />
                    {info[index]}
                </div>
            })}
        </div>
    )
}
