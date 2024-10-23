// src/App.js
import React from 'react';
import MovieRecommendation from './components/MovieRecommendation';
import './index.css';

function App() {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <MovieRecommendation />
        </div>
    );
}

export default App;
