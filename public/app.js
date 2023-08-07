import React from 'react';
import './proc_styles.css';
function horizontalScroll(event) {
    const delta = Math.max(-1, Math.min(1, event.nativeEvent.wheelDelta || -event.nativeEvent.detail));
    event.currentTarget.scrollRight -= delta * 10;
}
export default function App() {
    return /*#__PURE__*/ React.createElement("div", {
        className: "calc-body"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "display"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "total-eqn",
        onWheel: horizontalScroll
    }, "1234744643648790996787621457625489"), /*#__PURE__*/ React.createElement("div", {
        className: "current-eqn"
    }, "12345574756344457876598587467336")), /*#__PURE__*/ React.createElement("button", {
        className: "span-two-cols"
    }, "AC"), /*#__PURE__*/ React.createElement("button", null, "DEL"), /*#__PURE__*/ React.createElement("button", null, "\xf7"), /*#__PURE__*/ React.createElement("button", null, "1"), /*#__PURE__*/ React.createElement("button", null, "2"), /*#__PURE__*/ React.createElement("button", null, "3"), /*#__PURE__*/ React.createElement("button", null, "*"), /*#__PURE__*/ React.createElement("button", null, "4"), /*#__PURE__*/ React.createElement("button", null, "5"), /*#__PURE__*/ React.createElement("button", null, "6"), /*#__PURE__*/ React.createElement("button", null, "+"), /*#__PURE__*/ React.createElement("button", null, "7"), /*#__PURE__*/ React.createElement("button", null, "8"), /*#__PURE__*/ React.createElement("button", null, "9"), /*#__PURE__*/ React.createElement("button", null, "-"), /*#__PURE__*/ React.createElement("button", null, "."), /*#__PURE__*/ React.createElement("button", null, "0"), /*#__PURE__*/ React.createElement("button", {
        className: "span-two-cols"
    }, "="));
}
