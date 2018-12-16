import React from 'react';

const Row = (props) => (
    
    <ul>
        {props.data.map((row,key) => {
            if(row === "counter") return null;
            else return (
            <li className={props.isActive === row ? "active" : null} key={key} onClick={() => {
                props.callBack(row);
            }}>{row}</li>
        )})}
    </ul>
)

export default Row;