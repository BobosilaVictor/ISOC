import { useState, useEffect } from "react"

export const Wrapper = props => {
    let [movies, getMovies] = useState([]);
    const fetchData = () => {

        var myHeaders = new Headers();    
        
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        fetch("http://localhost:8080/api/v1/movies", requestOptions)
      .then(response => { return response.json()})
      .then(data => {getMovies(data)})
      .catch(error => console.log('error', error));

      }
    
      useEffect(() => {
        fetchData()
      }, [])
    console.log(movies)
    return <>
        <div className="container-fluid">
            <div className="row">
                <main className="col-md">
                    {props.children}
                </main>
            </div>

            {movies.length > 0 && (
                <div class="container-fluid">
                {movies.map(movies => (
                    <div class="card">
                    <div class="card-header">
                        {movies.id}
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">{movies.name} - {movies.genres}</h5>
                        <p class="card-text">{movies.plot}</p>
                    </div>
                    </div>
                ))}
                </div>
                
            )}
        </div>
    </>
}