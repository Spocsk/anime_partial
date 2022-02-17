import React, { useRef, useState } from 'react'
import Video from '../components/Video';
import Title from '../components/Title'
import { useForm } from "react-hook-form";
import { postQuestion } from '../Utils/Api/Questions'
import { getAnimeVideos } from '../Utils/Api/Moe'
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom'
import Home from '../views/Home'
import '../styles/CreateQuestion.css'


export default function CreateQuestion() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [error, setError] = useState("");
    const [url, setUrl] = useState("");
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState("Rechercher");
    const [submitLoading, setSubmitLoading] = useState("Ajouter");
    const [selected, setSelected] = useState("");

    const navigate = useNavigate()
    const redirectToHome = () => navigate('/')
  
  
    const onSubmit = async data => {
        try {
            setSubmitLoading('Chargement...')
            let answers = []
            answers.push(data.answer1)
            answers.push(data.answer2)
            answers.push(data.answer3)
            answers.push(data.answer4)
            data["answers"] = answers;
            data["videoUrl"] = selected;
            delete data.answer1
            delete data.answer2
            delete data.answer3
            delete data.answer4
            await postQuestion(data).then(() => window.alert('Question ajouté 👍'))
            setSubmitLoading("Ajouter")
      }
      catch(err) {
        setError('Une erreur c\'est produite lors de l\'ajout de question.')
      }
    }

    const searchMoeVideo = async (url) => {
        setLoading('...')
        await getAnimeVideos(url)
        .then((res) => {
            for (let i = 0; i <= 2; i++) {
                setVideos(videos => [...videos, res.data.result[i]])
            }
            setLoading('Rechercher')
        })
    }


    return (
        <div className="main">
            <div className='container-form' >
                <Title margin='2rem'>Créer une question</Title>
                <form onSubmit={handleSubmit(onSubmit)} style={{display: 'flex', alignItems: 'center', flexDirection: 'column', width: '100%'}}>
                    <input className='txtBox' {...register("title", { required: true})} placeholder='Ajouter titre à la question'></input>
                    {errors?.title?.type === "required" && <p className="fieldRequired">Le champ title est requis !</p>}

                    <input className='txtBox' {...register("answer1", { required: true})} placeholder='Réponse n°1'></input>
                    {errors?.answer1?.type === "required" && <p className="fieldRequired">Le champ réponse 1 est requis !</p>}

                    <input className='txtBox' {...register("answer2", { required: true})}  placeholder='Réponse n°2'></input>
                    {errors?.answer2?.type === "required" && <p className="fieldRequired">Le champ réponse 2 est requis !</p>}

                    <input className='txtBox' {...register("answer3", { required: true})} placeholder='Réponse n°3'></input>
                    {errors?.answer3?.type === "required" && <p className="fieldRequired">Le champ réponse 3 est requis !</p>}

                    <input className='txtBox' {...register("answer4", { required: true})} placeholder='Réponse n°4'></input>
                    {errors?.answer4?.type === "required" && <p className="fieldRequired">Le champ réponse 4 est requis !</p>}

                    <input className='txtBox' {...register("defaultAnswer", { required: true})} placeholder='Bonne réponse'></input>
                    {errors?.defaultAnswer?.type === "required" && <p className="fieldRequired">Le champ réponse par défault est requis !</p>}

                    <div style={{width: '70%'}}>
                        <input onChange={(e) => setUrl(e.target.value)} className='txtBox'  placeholder="Url de l'image"/>
                        {errors?.videoUrl?.type === "required" && <p className="fieldRequired">Le champ url de la video est requis !</p>}

                        <button style={{padding: '0.5rem 1rem'}} onClick={() => {searchMoeVideo(url)}}>{loading}</button>
                    </div>

                    {videos.length === 3 && !selected ? <ReactPlayer onClick={() => setSelected(videos[0].video)} className='video' playing={true} loop={true} url={videos[0].video} width='100' height='auto'></ReactPlayer> : null}
                    {videos.length === 3 && !selected ? <ReactPlayer onClick={() => setSelected(videos[1].video)} className='video' playing={true} loop={true} url={videos[1].video} width='100' height='auto'></ReactPlayer> : null}
                    {videos.length === 3 && !selected ? <ReactPlayer onClick={() => setSelected(videos[2].video)} className='video' playing={true} loop={true} url={videos[2].video} width='100' height='auto'></ReactPlayer> : null}

                    {selected ? <span style={{color:'white'}}>Vous avez choisis la vidéo: {selected.slice(0, 10) + '...'} </span> : null}
                    
                    <div style={{display: 'flex', width: '100%', justifyContent: 'space-around', }}>
                        <input className="submitBtn" type="submit" value={submitLoading}></input>
                        <div className='previousBtn' onClick={() => {redirectToHome()}}>Retour</div>
                    </div>
                </form>
            </div>
        </div>
    );
}
