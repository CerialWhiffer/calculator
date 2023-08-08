import { actions } from './app';
export default function Digit({ dispatch, digit }) {
    return /*#__PURE__*/ React.createElement("button", {
        onClick: ()=>{
            dispatch({
                type: actions.addDigit,
                payload: {
                    digit
                }
            });
        }
    }, digit);
}
