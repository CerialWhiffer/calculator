import React from "react";
import "./proc_styles.css";
function horizontalScroll (event) {
    const delta = Math.max(-1, Math.min(1, (event.nativeEvent.wheelDelta || -event.nativeEvent.detail)))
    event.currentTarget.scrollRight -= (delta * 10);
}
export default function App(){
    return (
        <div className="calc-body">
            <div className="display">
                <div className="total-eqn" onWheel={horizontalScroll}>1234744643648790996787621457625489</div>
                <div className="current-eqn">12345574756344457876598587467336</div>
            </div>
            <button className="span-two-cols">AC</button>
            <button>DEL</button>
            <button>÷</button>
            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button>*</button>
            <button>4</button>
            <button>5</button>
            <button>6</button>
            <button>+</button>
            <button>7</button>
            <button>8</button>
            <button>9</button>
            <button>-</button>
            <button>.</button>
            <button>0</button>
            <button className="span-two-cols">=</button>
        </div>
    );
}