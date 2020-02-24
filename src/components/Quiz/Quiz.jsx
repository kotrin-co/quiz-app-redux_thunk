import React from 'react';
import QuizModels from '../../models/Quiz';
import Button from '../Button/Button';
import {Link} from 'react-router-dom';
import './Quiz.css';

class Quiz extends React.Component{
    constructor(props){
        super(props);
        this.state={
            quizzes:[],
            currentIndex:0,
            numberOfCorrects:0
        };
    }

    async componentDidMount(){
        await this.restart();
    }

    selectAnswer(quiz,answer){
        let {currentIndex,numberOfCorrects} = this.state;
        const isCorrect = quiz.judgeCorrectAnswer(answer);

        if (isCorrect){
            numberOfCorrects++;
            alert('Correct Answer!!');
        }else{
            alert(`Wrong Answer... Correct Answer is "${quiz.correctAnswer}"`);
        }
        currentIndex++;

        this.setState({
            currentIndex,numberOfCorrects
        })
    }

    async restart(){
        this.setState({
            quizzes:[],
            currentIndex:0,
            numberOfCorrects:0
        });
        const quizzes = await QuizModels.fetchAndCreateQuizzes();
        this.setState({quizzes});
    }

    render(){

        const {quizzes, currentIndex} = this.state;
        
        if(quizzes.length===0){
            return this.renderLoading();
        }

        if(quizzes.length>0 && currentIndex < quizzes.length){
            return this.renderQuiz();
        }
        
        if(quizzes.length>0 && currentIndex >= quizzes.length){
            return this.renderResult();
        }
    }

    renderLoading(){
        return(
            <div>
                <h1>クイズページ</h1>
                <p>Now Loading...</p>
                <hr/>
                <Link to='/'>トップページへ</Link>
            </div>
        );
    }

    renderQuiz(){
        const {currentIndex,quizzes} = this.state;
        const quiz = quizzes[currentIndex];
        const answers = quiz.shuffleAnswers().map((answer,index)=>{
            return (
                <li key={index}>
                    <Button
                    onClickHandler={()=>{this.selectAnswer(quiz,answer)}}
                    >
                        {answer}
                    </Button>
                </li>
            );
        });
        return(
            <div>
                <h1>クイズページ</h1>
                <p>{quiz.question}</p>
                <ul className='QuizList'>{answers}</ul>
                <hr/>
                <Link to='/'>トップページへ</Link>
            </div>
        );
    }

    renderResult(){
        const {quizzes,numberOfCorrects} = this.state;
        return (
            <div>
                <h1>クイズページ</h1>
                <div>
                    <p id = 'result'>{`${numberOfCorrects}/${quizzes.length} corrects`}</p>
                    <Button onClickHandler={()=>{this.restart()}}>
                        Restart
                    </Button>
                </div>
                <hr/>
                <Link to="/">トップページへ</Link>
            </div>
        );
    }
}

export default Quiz;