import { useNavigate } from "react-router";
import React, { useEffect, useState } from "react"
import { Wrapper } from "./Wrapper";


export default function Admin() {
    let [form_mode, setFormMode] = useState("Add")
    let [name, setName] = useState("")
    let [plot, setPlot] = useState("")
    let [genre, setGenre] = useState("")
    let [image, setImage] = useState("")
    let [imageBd, setImageBd] = useState("")
    let [id, setID] = useState("")
    const navigate = useNavigate();
    const signOut = () => {
        localStorage.removeItem("temitope");
        navigate("/");
      };
    const changeFormMode = () => {
        setFormMode(form_mode === "Add" ? "Delete" : "Add")
    }

    const check_admin = event =>{
	event.preventDefault();
	
    }
    const addMovie = event =>{
        event.preventDefault();
        setName('');
        setPlot('');
        setGenre('');
        setImage('');
        setImageBd('');
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({
          "name": name,
          "plot": plot,
          "genres": genre,
          "image": image,
          "imageBd": imageBd
        });
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch("http://44.204.42.126:8080/api/v1/movies", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));        
    }
    const deleteMovie = event =>{
        event.preventDefault();
        setID('')

        var requestOptions = {
          method: 'DELETE',
          redirect: 'follow'
        };
        console.log(id)
        fetch(`http://44.204.42.126:8080/api/v1/movies/${id}`, requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));      
    }
    console.log(form_mode)
    if(form_mode === 'Add'){
    return (<>
        <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Flix Net</a>

            <div className="navbar-nav">
                <div className="nav-item text-nowrap">
                    <button type="button" className="btn btn-outline-primary" onClick={signOut}>Sign out</button>
                    <button type="button" className="btn btn-outline-primary" onClick={changeFormMode}>Delete</button>
                </div>
            </div>
        </header>
        <blockquote class="blockquote text-center">
        <h1>Add movies here</h1>
        </blockquote>
        <Wrapper>
            <form className="mt-3" onSubmit={addMovie} >
                <div className="form-floating pb-3">
                    <input className="form-control" placeholder="Name"
                        onChange={event => setName(event.target.value)}
                    />
                    <label>Name</label>
                </div>
    
                <div className="form-floating pb-3">
                    <input type="text" className="form-control" placeholder="Plot"
                    onChange={event => setPlot(event.target.value)}
                    />
                    <label>Plot</label>
                </div>
    
                <div className="form-floating pb-3">
                    <input type="text" className="form-control" placeholder="Genre"
                    onChange={event => setGenre(event.target.value)}
                    />
                    <label>Genre</label>
                </div>

                <div className="form-floating pb-3">
                    <input type="text" className="form-control" placeholder="Image"
                    onChange={event => setImage(event.target.value)}
                    />
                    <label>Image</label>
                </div>

                <div className="form-floating pb-3">
                    <input type="text" className="form-control" placeholder="ImageBd"
                    onChange={event => setImageBd(event.target.value)}
                    />
                    <label>ImageBd</label>
                </div>
    
            <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
                Submit
            </button>
            </div>
            </form>
        </Wrapper>

    </>)}else{
        return (<>
            <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
                <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Flix Net</a>
    
                <div className="navbar-nav">
                    <div className="nav-item text-nowrap">
                        <button type="button" className="btn btn-outline-primary" onClick={signOut}>Sign out</button>
                        <button type="button" className="btn btn-outline-primary" onClick={changeFormMode}>Add</button>
                    </div>
                </div>
            </header>
            <blockquote class="blockquote text-center">
            <h1>Delete movies here</h1>
            </blockquote>
            <Wrapper>
            <form className="mt-3" onSubmit={deleteMovie}>
                <div className="form-floating pb-3">
                    <input type="number" className="form-control" placeholder="ID"
                    onChange={event => setID(event.target.value)}
                    />
                    <label>ID</label>
                </div>   
                <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
                Submit
            </button>
            </div>              
            </form>
        </Wrapper>
    
        </>)

    }
}
