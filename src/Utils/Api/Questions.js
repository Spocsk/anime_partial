import axios from 'axios';

const config = {
    headers: {
        'accept': 'application/json',
    }
}

export async function getQuestions() {
    return await axios.get(process.env.REACT_APP_API_URL + "/questions", config)
    .then((res) => {
        return res.data
    })
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

export async function getSomeQuestions(nb) {
    let randomQuestions = [];
    const rawData = await getQuestions();
    for (let i = 0; i < rawData.data.length; i++) {
        randomQuestions.push(rawData.data[getRandomInt(nb)])
    }
    return randomQuestions;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }