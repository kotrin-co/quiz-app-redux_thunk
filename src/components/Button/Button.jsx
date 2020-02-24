import React from 'react';
import './Button.css';

const Button = (props) =>{
    let {onClickHandler} = props;

    if(typeof onClickHandler !== 'function'){
        onClickHandler = () => {};
    }

    return(
        <div className="button" onClick={onClickHandler} onTouchStart="">
            {props.children}
        </div>
    )
}

export default Button;