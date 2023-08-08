import React, { useReducer } from 'react';
import './proc_styles.css';
import Digit from './Digits';
import OperationDigit from './Operation';
function horizontalScroll(event) {
    const delta = Math.max(-1, Math.min(1, event.nativeEvent.wheelDelta || -event.nativeEvent.detail));
    event.currentTarget.scrollLeft += delta * 10;
}
export const actions = {
    addDigit: 'add-digit',
    delDigit: 'del-digit',
    chooseOp: 'choose-operations',
    cls: 'clear',
    eval: 'evaluate'
};
function dispatch(state, { type, payload }) {
    switch(type){
        case actions.addDigit:
            if (state.overwrite) {
                return {
                    ...state,
                    currOp: payload.digit,
                    overwrite: false
                };
            }
            if (payload.digit === '0' && state.currOp === '0') return state;
            if (payload.digit === '.' && state.currOp.includes('.')) return state;
            return {
                ...state,
                currOp: `${state.currOp || ''}${payload.digit}`
            };
        case actions.chooseOp:
            if (state.currOp == null && state.prevOp == null) return state;
            if (state.currOp == null) return {
                ...state,
                Oper: payload.Oper
            };
            if (state.prevOp == null) {
                return {
                    ...state,
                    Oper: payload.Oper,
                    prevOp: state.currOp,
                    currOp: null
                };
            }
            return {
                ...state,
                prevOp: evaluate(state),
                Oper: payload.Oper,
                currOp: null
            };
        case actions.cls:
            return {};
        case actions.delDigit:
            if (state.overwrite) return {
                ...state,
                overwrite: false,
                currOp: null
            };
            if (state.currOp == null) return state;
            if (state.currOp.length === 1) return {
                ...state,
                currOp: null
            };
            return {
                ...state,
                currOp: state.currOp.slice(0, -1)
            };
        case actions.eval:
            if (state.Oper == null || state.currOp == null || state.prevOp == null) {
                return state;
            }
            return {
                ...state,
                overwrite: true,
                prevOp: null,
                Oper: null,
                currOp: evaluate(state)
            };
    }
}
// Yet to be used functions
const INTEGER_FORMATTER = new Intl.NumberFormat('en-us', {
    maximumFractionDigits: 0
});
function formatOperand(operand) {
    if (operand == null) return;
    const [integer, decimal] = operand.split('.');
    if (decimal == null) return INTEGER_FORMATTER.format(integer);
    return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}
// above functions yet to be used
function evaluate({ currOp, prevOp, Oper }) {
    const prev = parseFloat(prevOp);
    const current = parseFloat(currOp);
    if (isNaN(prev) || isNaN(current)) return '';
    let computation = '';
    switch(Oper){
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '÷':
            computation = prev / current;
            break;
    }
    return computation.toString();
}
export default function App() {
    const [{ currOp, prevOp, Oper }, updater] = useReducer(dispatch, {});
    return /*#__PURE__*/ React.createElement("div", {
        className: "calc-body"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "display"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "total-eqn",
        onWheel: horizontalScroll
    }, /*#__PURE__*/ React.createElement("p", null, prevOp, " ", Oper)), /*#__PURE__*/ React.createElement("div", {
        className: "current-eqn"
    }, currOp)), /*#__PURE__*/ React.createElement("button", {
        className: "span-two-cols",
        onClick: ()=>updater({
                type: actions.cls
            })
    }, "AC"), /*#__PURE__*/ React.createElement("button", {
        onClick: ()=>updater({
                type: actions.delDigit
            })
    }, "DEL"), /*#__PURE__*/ React.createElement(OperationDigit, {
        Oper: "\xf7",
        dispatch: updater
    }), /*#__PURE__*/ React.createElement(Digit, {
        digit: "1",
        dispatch: updater
    }), /*#__PURE__*/ React.createElement(Digit, {
        digit: "2",
        dispatch: updater
    }), /*#__PURE__*/ React.createElement(Digit, {
        digit: "3",
        dispatch: updater
    }), /*#__PURE__*/ React.createElement(OperationDigit, {
        Oper: "*",
        dispatch: updater
    }), /*#__PURE__*/ React.createElement(Digit, {
        digit: "4",
        dispatch: updater
    }), /*#__PURE__*/ React.createElement(Digit, {
        digit: "5",
        dispatch: updater
    }), /*#__PURE__*/ React.createElement(Digit, {
        digit: "6",
        dispatch: updater
    }), /*#__PURE__*/ React.createElement(OperationDigit, {
        Oper: "+",
        dispatch: updater
    }), /*#__PURE__*/ React.createElement(Digit, {
        digit: "7",
        dispatch: updater
    }), /*#__PURE__*/ React.createElement(Digit, {
        digit: "8",
        dispatch: updater
    }), /*#__PURE__*/ React.createElement(Digit, {
        digit: "9",
        dispatch: updater
    }), /*#__PURE__*/ React.createElement(OperationDigit, {
        Oper: "-",
        dispatch: updater
    }), /*#__PURE__*/ React.createElement(Digit, {
        digit: ".",
        dispatch: updater
    }), /*#__PURE__*/ React.createElement(Digit, {
        digit: "0",
        dispatch: updater
    }), /*#__PURE__*/ React.createElement("button", {
        className: "span-two-cols",
        onClick: ()=>updater({
                type: actions.eval
            })
    }, "="));
}
