import React, { useState, useEffect } from 'react';
import { useRef } from 'react/cjs/react.development';

export default React.memo(function SwitchButtons({ value, outputs, info, startIndex, binds }) {

    const buttonsRef = useRef([]);

    useEffect(() => {
        buttonsRef.current[startIndex].className = 'active';
        document.addEventListener('keydown', (e) => {
            buttonsRef.current.map((button, index)=>{
                if (e.key === binds[index]) button.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
            });
        });
    }, []);

    return (
        <div className='switchButtons'>
            {outputs.map((output, index) => {
                return <div key={`output${index}`} className='output'>
                    <div ref={el => buttonsRef.current.push(el)} onPointerDown={(e) => {
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
});
