import React from 'react'
import Image from '../components/Image'
import Button from './Button';
import Subtitle from './Subtitle';
import Title from './Title';
import { useNavigate } from 'react-router-dom';
import '../styles/Container.css'

export default function Container() {

    const navigate = useNavigate()
    const redirectToCreate = () => navigate('/create')
    const redirectToPLay = () => navigate('/play')


    const logoUrl = 'https://assets.website-files.com/5e51c674258ffe10d286d30a/5e5359b47371bb97b7a01b27_peep-69.svg'

    return (
        <div className="container" style={{height: '90vh', padding: '5rem'}}>
            <div className='top'>
                <div className='top-left'>
                    <Title>Moe Quizz Game</Title>
                    <Subtitle margin='3rem 0'>Le jeux de quiz qui te permet de choisir des illustrations avec tes propres questions</Subtitle>
                </div>
                <div className='top-right'>
                    <Image src={logoUrl} width='250px' height='auto'></Image>
                </div>
            </div>
            <div className='bottom'>
                <Button bgColor='rgb(185, 38, 246)' width='50%' onClick={() => {redirectToCreate()}}>Créer des questions</Button>
                <Button bgColor='rgb(79, 154, 100)' width='50%' onClick={() => {redirectToPLay()}}>Lancer une partie</Button>
            </div>
        </div>
    );
}
