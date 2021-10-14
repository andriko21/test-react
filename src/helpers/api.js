import axios from "axios";

const BaseURL = 'https://api.themoviedb.org/3/';
const KeyOksana = 'de2580cf82fb3c491bffe484bc91ca51';


export async function fetchByTrends() {
    const data = await axios.get(`${BaseURL}trending/all/day?api_key=${KeyOksana}`)
    return data
}

export async function fetchByQuery(query) {
    const data = await axios.get(`${BaseURL}search/movie?api_key=${KeyOksana}&page=1&query=${query}`)
    return data;
}

export async function fetchByActors(id) {
    const data = await axios.get(`${BaseURL}movie/${id}/credits?api_key=${KeyOksana}`)
    return data;
}

export async function fetchMovieDetails(id) {
    const data = await axios.get(`${BaseURL}movie/${id}?api_key=${KeyOksana}`)
    

    return data;
}

export async function fetchMovieByReviews(id) {
    const data = await axios.get(`${BaseURL}/movie/${id}/reviews?api_key=${KeyOksana}`)
    return data;
}




