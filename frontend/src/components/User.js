import { useNavigate } from "react-router";
import React, { useEffect, useState } from "react"
import { fetchToken } from "../Helper";
import Slider from './NetflixSlider'
import './User.scss'

export default function User() {
    let [movies, getMovies] = useState([]);
    const navigate = useNavigate();
    const signOut = () => {
        localStorage.removeItem("temitope");
        navigate("/");
      };
    const fetchData = () => {

        var myHeaders = new Headers();    
        
        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };
        fetch("http://localhost:8080/api/v1/movies", requestOptions)
    .then(response => { return response.json()})
    .then(data => {
        getMovies(data)
        console.log(data)
    })
    .catch(error => console.log('error', error));

    }
    useEffect(() => {
        fetchData()
    }, [])
    
    return (<>
     <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Flix Net</a>

            <div className="navbar-nav">
                <div className="nav-item text-nowrap">
                    <button type="button" className="btn btn-outline-primary" onClick={signOut}>Sign out</button>
                </div>
            </div>
        </header>
        <div className="app">
            {movies.length > 0 && (
            <Slider>
            {movies.map(movie => (
                <Slider.Item movie={movie} key={movie.id}>item1</Slider.Item>
            ))}
            </Slider>
            )}
         </div>
    </>)
}