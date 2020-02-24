import React from 'react';
import Button from '../Button/Button';

const Home = ({history}) =>{
    console.log(history)
    return(
        <div>
            <h1>ホーム</h1>
            <Button
            onClickHandler={()=>{
                history.push('/quiz');
            }}>
                クイズページへ移動
            </Button>
            </div>
    );
}

export default Home;