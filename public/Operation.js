import React from 'react';
import { actions } from './app';
export default function OperationDigit({ dispatch, Oper }) {
    return /*#__PURE__*/ React.createElement("button", {
        onClick: ()=>{
            dispatch({
                type: actions.chooseOp,
                payload: {
                    Oper
                }
            });
        }
    }, Oper);
}
