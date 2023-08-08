import { actions } from "./app";
export default function Digit({dispatch, digit}){
    return <button onClick={()=>{
                dispatch({ 
                    type: actions.addDigit,
                    payload: { digit }
                });
            }}>{ digit }</button>
}