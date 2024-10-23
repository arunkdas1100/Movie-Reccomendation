// src/api.js
import axios from 'axios';

const API_KEY = 'b85bf4bf3ccea4d36b8d4c3546d8338a'; // Replace with your actual TMDb API key
const BASE_URL = 'https://api.themoviedb.org/3';

export const getGenres = async () => {
    const response = await axios.get(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
    return response.data.genres;
};

export const getLanguages = async () => {
    const response = await axios.get(`${BASE_URL}/configuration/languages?api_key=${API_KEY}`);
    return response.data;
};

export const getMovies = async (language, genreId, year) => {
    const response = await axios.get(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=${language}&with_genres=${genreId}&primary_release_year=${year}`
    );
    return response.data.results;
};
