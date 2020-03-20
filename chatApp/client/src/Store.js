import React, { Component } from "react";
export const CTX = React.createContext();
const initState={
    general :[
        {from :'gowri',msg :'hello'},
        {from :'gowri',msg :'hello'},
        {from :'gowri',msg :'hello'},

    ],
    topic2:[
        {from :'gowri',msg :'hello'},
        {from :'gowri',msg :'hello'},
        {from :'gowri',msg :'hello'},
    ]
}
function rerducer(state,action){
    const {from,msg,topic}=action.payload;
    switch(action.type){
        case "RECEIVE_MESSAGE":
        return{
            ...state,
            [topic] : [
                ...state[topic],
                {
                    from,
                    msg
                }
            ]
        }
        default:
        return state;
    }
}
export default function Store(props){
    const reducer = React.useReducer(reducer,initState)
    return(
        <CTX.Provider value={reducer}>
            {props.childern}
        </CTX.Provider>
    )
}