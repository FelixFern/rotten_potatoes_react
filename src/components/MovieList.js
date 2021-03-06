import { useState, useEffect, useContext } from "react"; 
import MovieCard from './MovieCard';
import '../App.css'

import axios from "axios";
import MovieModal from "./MovieModal";
import { modalContext, searchContext } from "../contexts/global-states";

function MovieList() {
    const API_KEY = 'api_key=4a2f5c42b8d2cf6178787473ff9d8970';
    const BASE_URL = 'https://api.themoviedb.org/3';
    const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
    const IMG_URL = 'https://image.tmdb.org/t/p/w500';

    const [movieList, setMovie] = useState([]);
    const {search, setSearch} = useContext(searchContext);
    const {modalToggle, setToggle} = useContext(modalContext);

    const SEARCH_URL = BASE_URL + '/search/movie?'+ API_KEY;

    document.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            const movieSearch = document.getElementById("search-bar").value;
            setSearch(SEARCH_URL+'&query='+search)
            console.log(search)
        }
    });

    useEffect(() => {
        axios.get(API_URL).then(res => {
            setMovie(res.data.results)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])
    return (
        <div>
            {movieList.map((movie) => {
                const {id, title, poster_path, vote_average, overview, original_language, release_date} = movie;
                function percentage(rating) {
                    const percent = rating * 10
                    return percent.toString() + "%"
                }
                return (
                    <MovieCard
                        key = {id}
                        rating = {percentage(vote_average)}
                        title = {title}
                        poster_url = {IMG_URL + poster_path}
                        overview = {overview}
                        language = {original_language}
                        release_date = {release_date}
                    ></MovieCard>
                )
            })}
            <MovieModal
                rating = {modalToggle.rating}
                title = {modalToggle.title}
                poster_url = {modalToggle.poster_url}
                overview = {modalToggle.overview}
                language = {modalToggle.language}
                release_date = {modalToggle.release_date}
                show = {modalToggle.show}
            ></MovieModal>
        </div>
    )
}

export default MovieList

