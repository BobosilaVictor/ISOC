import { useNavigate } from "react-router";
import React, { useEffect, useState } from "react"
import { fetchToken } from "../Helper";
import Slider from './NetflixSlider'
import './User.scss'

function groupBy(arr, property) {
    return arr.reduce(function(memo, x) {
      if (!memo[x[property]]) { memo[x[property]] = []; }
      memo[x[property]].push(x);
      return memo;
    }, {});
  }

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
        fetch("http://ec2-3-86-165-102.compute-1.amazonaws.com :8080/api/v1/movies", requestOptions)
    .then(response => { return response.json()})
    .then(data => {
        getMovies(data)
    })
    .catch(error => console.log('error', error));
    }

    useEffect(() => {
        fetchData()
    }, [])

      var x = groupBy(movies, 'genres')
      console.log(x.Action)
    return (<>
     <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Flix Net</a>

            <div className="navbar-nav">
                <div className="nav-item text-nowrap">
                    <button type="button" className="btn btn-outline-primary" onClick={signOut}>Sign out</button>
                </div>
            </div>
        </header>
        {movies.length > 0 && (
        <div className="app">
            <h1 class="display-3">Action</h1>
            <Slider>
            {x.Action.map(movie => (
                 <Slider.Item movie={movie} key={movie.id}>item1</Slider.Item>
                ))}
            </Slider>
         </div>
          )}
        {movies.length > 0 && (
        <div className="app">
            <h1 class="display-3">Horror</h1>
            <Slider>
            {x.Horror.map(movie => (
                 <Slider.Item movie={movie} key={movie.id}>item1</Slider.Item>
                ))}
            </Slider>
         </div>
          )}
        
    </>)
}
