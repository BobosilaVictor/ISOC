import { useNavigate } from "react-router";
import React, { useEffect, useState } from "react"
import { fetchToken } from "../Helper";

export default function Redirect() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([])

  const fetchData = () => {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", 'Bearer ' + fetchToken() )

    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://localhost:8080/api/v1/users/me", requestOptions)
  .then(response => { return response.json()})
  .then(data => {setUsers(data)})
  .catch(error => console.log('error', error));
  console.log(users)
  }

  useEffect(() => {
    fetchData()
  }, [])

  if(users.is_superuser == true){
    navigate("/admin")
  }
  else{
    navigate("/index")
  };
}
