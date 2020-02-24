import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import {
    FETCH_QUIZZES_REQUEST,
    FETCH_QUIZZES_SUCCESS,
    FETCH_QUIZZES_FAILURE,
    fetchQuizzes
} from '../../../src/actions/quizActionCreator';
import QuizModel from '../../../src/models/Quiz';

jest.mock('axios');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('quizActionCreatorのテスト', ()=>{
    xit('fetch成功時、FETCH_QUIZZES_SUCCESSと同時にクイズデータを返す',()=>{
        const expectedResults = [
            {
                question:'a',
                correct_answer:'b',
                incorrect_answers:['c','d','e']
            }
        ];
        axios.get.mockResolvedValue({
            data:{
                results:expectedResults
            }
        });

        const store = mockStore();
        await store.dispatch(fetchQuizzes());

        expect(store.getActions()).toEqual([
            {
                type:FETCH_QUIZZES_REQUEST
            },
            {
                type:FETCH_QUIZZES_SUCCESS,
                data:QuizModel.createQuizInstancesWithData(expectedResults)
            }
        ]);
    });

    it('fetch失敗時、FETCH_QUIZZES_FAILUREと一緒にエラー情報を返す',()=>{
        const expectedError = {
            message:'ダミーエラーメッセージ'
        };
        axios.get.mockRejectedValue(expectedError);

        const store = mockStore();
        await store.dispatch(fetchQuizzes());

        expect(store.getActions()).toEqual([
            {
                type:FETCH_QUIZZES_REQUEST
            },
            {
                type:FETCH_QUIZZES_FAILURE,
                error:expectedError
            }
        ]);
    });
});