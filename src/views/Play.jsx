import React, { useEffect, useState } from 'react';
import { getQuestions } from '../Utils/Api/Questions';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom'
import Subtitle from '../components/Subtitle'
import Title from '../components/Title'
import '../styles/Play.css'

export default function PLay() {
    
    const [questions, setQuestions] = useState({})
    const [color, setColor] = useState('rgb(27, 30, 67)')
    const [defaultAnswer, setDefaultAnswer] = useState("")
    const [answers, setAnswers] = useState([])
    const [questionId, setQuestionId] = useState(0)
    const [score, setScore] = useState(0)


    const navigate = useNavigate()
    const redirectToHome = () => navigate('/')
    
    useEffect(() => {
        (async () => await getQuestions().then(res => {
            setQuestions(res)
            setDefaultAnswer(res[questionId].defaultAnswer)
            setAnswers(res[questionId].answers)
        }))()
    }, []);
    
    const handleUserAnswer = (answerArray, userAnswer) => {
        if(userAnswer === defaultAnswer) {
            setColor('rgb(39, 174, 96)')
            setScore(score + 1)
        }
        else {
            setColor('rgb(231, 76, 60)')
        }
        setDefaultAnswer(questions[questionId + 1].defaultAnswer)
        nextQuestion()
    }

    const nextQuestion = () => {
        setTimeout(function () {
            setQuestionId(questionId + 1)
            if (questionId === questions.length - 1) {
                window.alert(`Votre score est de ${score}/${questions.length}`)
                redirectToHome()
            }
            setColor('rgb(27, 30, 67)')
        }, 1000);
    }

    return (
        <div className='play-container'>
            <div className='container' style={{height: '90vh', width: '70%'}}>
                <div className='play-top'>
                    {questions.length > 0 ? <ReactPlayer 
                        width='100%' 
                        height='auto' 
                        playing={true} 
                        loop={true} 
                        muted={true} 
                        url={`${process.env.REACT_APP_API_URL_VIDEO}${questions[questionId].videoUrl}`}>
                    </ReactPlayer>: null}
                </div>
                <div className='play-mid'>
                    {questions.length > 0 ? <Title size='35px'>{questions[questionId].title}</Title> : null}
                </div>
                <div className='play-bottom'>
                    {questions.length > 0 ? questions[questionId].answers.map((rep, index) => {
                        return <Subtitle key={index} onClick={() => handleUserAnswer(questions[questionId].answers, rep)} bgColor={color} className='tile'>{rep}</Subtitle>
                    }) : null}
                </div>
            </div>
        </div>
    );
}
