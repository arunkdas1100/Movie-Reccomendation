import React, { useState, useEffect } from 'react';

const MovieRecommendation = () => {
  const [movies, setMovies] = useState([]);
  const [language, setLanguage] = useState('');
  const [languageSuggestions, setLanguageSuggestions] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);
  const [languagesList, setLanguagesList] = useState([]);

  const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiODViZjRiZjNjY2VhNGQzNmI4ZDRjMzU0NmQ4MzM4YSIsIm5iZiI6MTcyOTcwMzExOS4zMjM1MjcsInN1YiI6IjY3MTkyYWRjNmQ2YjcwNWRjODcxMTgxOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uHu1pVCxLGMr9VVh9z2RBLXLGG5XQI5AEdKys3Arruk';
  // Fetch genres from TMDB
  useEffect(() => {
    const fetchGenres = async () => {
      const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?language=en-US`;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      };

      try {
        const response = await fetch(genreUrl, options);
        const data = await response.json();
        setGenres(data.genres || []);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  // Fetch languages from TMDB
  useEffect(() => {
    const fetchLanguages = async () => {
      const languageUrl = `https://api.themoviedb.org/3/configuration/languages`;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      };

      try {
        const response = await fetch(languageUrl, options);
        const data = await response.json();
        setLanguagesList(data || []);
      } catch (error) {
        console.error('Error fetching languages:', error);
      }
    };

    fetchLanguages();
  }, []);

  const fetchMovies = async () => {
    if (!selectedLanguage || !year || !genre) {
      alert('Please select a language, year, and genre.');
      return;
    }

    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre}&with_original_language=${selectedLanguage}&year=${year}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setMovies(data.results || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLanguageInputChange = (input) => {
    setLanguage(input);
    if (input.trim()) {
      const filteredSuggestions = languagesList.filter((lang) =>
        lang.english_name.toLowerCase().includes(input.toLowerCase())
      );
      setLanguageSuggestions(filteredSuggestions);
    } else {
      setLanguageSuggestions([]);
    }
  };

  const handleLanguageSelect = (lang) => {
    setSelectedLanguage(lang.iso_639_1);
    setLanguage(lang.english_name); // Show selected language in input box
    setLanguageSuggestions([]);
  };

  const handleSearch = () => {
    fetchMovies();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Movie Recommendation System</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="flex flex-col">
          <label className="mb-2 text-lg">Language:</label>
          <input
            type="text"
            value={language}
            onChange={(e) => handleLanguageInputChange(e.target.value)}
            className="border border-gray-300 rounded-lg p-2"
            placeholder="Type a language"
          />
          {languageSuggestions.length > 0 && (
            <ul className="bg-white border border-gray-300 mt-2 rounded-lg">
              {languageSuggestions.map((lang) => (
                <li
                  key={lang.iso_639_1}
                  onClick={() => handleLanguageSelect(lang)}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                >
                  {lang.english_name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex flex-col">
          <label className="mb-2 text-lg">Year:</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="border border-gray-300 rounded-lg p-2"
            placeholder="Enter year"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 text-lg">Genre:</label>
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="border border-gray-300 rounded-lg p-2"
          >
            <option value="">Select Genre</option>
            {genres.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Search Movies
      </button>

      {movies.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Recommended Movies</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <div key={movie.id} className="border rounded-lg overflow-hidden shadow-lg">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-auto h-auto"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold">{movie.title}</h3>
                  <p className="text-gray-600">Rating: {movie.vote_average}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieRecommendation;
