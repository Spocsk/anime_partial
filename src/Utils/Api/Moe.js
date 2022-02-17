import axios from 'axios';

const config = {
    headers: {
        'accept': 'application/json',
    }
}

export function getAnimeVideos(url) {
    return axios.get(`https://api.trace.moe/search?url=${encodeURIComponent(url)}`, config)
}

export async function getQuestion(id) {
    return await axios.get(`${process.env.REACT_APP_API_URL}/questions/${id}`, config)
    .then((res) => {
        return res.data
    })
}

export async function postQuestion(data) {
    return await axios.post(process.env.REACT_APP_API_URL + "/questions", data, config)
    .then((res) => {
        return res.data
    })
}