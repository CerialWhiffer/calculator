import React, { useReducer } from "react";
import "./proc_styles.css";
function horizontalScroll(event) {
  const delta = Math.max(
    -1,
    Math.min(1, event.nativeEvent.wheelDelta || -event.nativeEvent.detail)
  );
  event.currentTarget.scrollLeft += delta * 10;
}
export const actions = {
  addDigit: "add-digit",
  delDigit: "del-digit",
  chooseOp: "choose-operations",
  cls: "clear",
  eval: "evaluate",
};

function dispatch(state, { type, payload }) {
  switch (type) {
    case actions.addDigit:
      if (state.overwrite)
        return { ...state, currOp: payload.digit, overwrite: false };
      if (payload.digit === "0" && state.currOp === "0") return state;
      if (payload.digit === "." && state.currOp.includes(".")) return state;
      return { ...state, currOp: `${state.currOp || ""}${payload.digit}` };

    case actions.chooseOp:
      if (state.currOp == null && state.prevOp == null) return state;
      if (state.currOp == null) return { ...state, Oper: payload.Oper };
      if (state.prevOp == null)
        return {
          ...state,
          Oper: payload.Oper,
          prevOp: state.currOp,
          currOp: null,
        };
      return {
        ...state,
        prevOp: evaluate(state),
        Oper: payload.Oper,
        currOp: null,
      };

    case actions.cls:
      return {};

    case actions.delDigit:
      if (state.overwrite) return { ...state, overwrite: false, currOp: null };
      if (state.currOp == null) return state;
      if (state.currOp.length === 1) return { ...state, currOp: null };
      return { ...state, currOp: state.currOp.slice(0, -1) };

    case actions.eval:
      if (state.Oper == null || state.currOp == null || state.prevOp == null)
        return state;
      return {
        ...state,
        overwrite: true,
        prevOp: null,
        Oper: null,
        currOp: evaluate(state),
      };
  }
}

export default function App() {
  const [{ currOp, prevOp, Oper }, updater] = useReducer(dispatch, {});
  return (
    <div className="calc-body">
      <div className="display">
        <div className="total-eqn" onWheel={horizontalScroll}>
          <p>
            {prevOp} {Oper}
          </p>
        </div>
        <div className="current-eqn">{currOp}</div>
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
