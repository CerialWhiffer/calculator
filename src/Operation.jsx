import { actions } from "./app";
export default function OperationDigit({dispatch, Oper}){
    return <button onClick={()=>{
                dispatch({ 
                    type: actions.chooseOp,
                    payload: { Oper }
                });
            }}>{ Oper }</button>
}