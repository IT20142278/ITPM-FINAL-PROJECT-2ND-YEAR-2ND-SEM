import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios  from 'axios';
import { useHistory } from "react-router-dom";

function Bus() {
    const history = useHistory();
    const [busses, setBusses] = useState([]);
    const [searchTerm, setSearchTerm] = useState([]);

    

    useEffect(()=>{
      axios.get('http://localhost:8070/bus/get')
        .then(res =>{
          setBusses(res.data)
        })
        .catch(err =>{
          console.log(err)
        })
    }, [])

    //Deleting
    const deleteClick = (id) =>{
      if(window.confirm('Are you sure?')){
        //console.log(id)
        fetch('http://localhost:8070/bus/delete/' + id,{
          method: 'DELETE'
        }).then(()=>{
          history.go('/viewbusses')
        })
      }
    }

    

    return (
      <div>
        <h2 className="titleview">
            Recently Added Busses
        </h2>
       
      
      <div className="topbartrans">

      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div className="addnewbus">
  <a class="navbar-brand" href="#">Busses</a>
  </div>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <div className="addbuttonbus">
        <Link to="/addnewbus">
      <button  id="busbtn"type="button" class="btn btn-primary">Add New Bus</button>
      </Link>
      </div>
      </li>

    </ul>
    <div className="searchbartrans">
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
      onChange={
          event => {setSearchTerm(event.target.value)}

      }
      />
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
    </div>
  </div>
</nav>

      </div>
      
      
      
      
      
       <div className="transportables">


        <table class="table">

  <thead>
    <tr id="headrowbus">
      <th scope="col">Bus ID</th>
      <th scope="col">Name</th>
      <th scope="col">No Plate</th>
      <th scope="col">Owner's Name</th>
      <th scope="col">Date Rented</th>
      <th scope="col">Rental Remaining</th>
      <th scope="col">Phone No.</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    {busses.filter((val)=> {
      if (searchTerm== ""){
        return val;
      } else if  (val.name.toLowerCase().includes(searchTerm.toLowerCase())){

        return val;

      } else if (val.owner_Name.toLowerCase().includes(searchTerm.toLowerCase())){

        return val;

      } else if (val.bus_Id.toLowerCase().includes(searchTerm.toLowerCase())){

        return val;

      }
    }).map(busses=>(
    <tr>
      <td id="td-type1">{busses.bus_Id}</td>
      <td  id="td-type2">{busses.name}</td>
      <td id="td-type2">{busses.no_Plate}</td>
      <td id="td-type2">{busses.owner_Name}</td>
      <td id="td-type2">{busses.date_Rented}</td>
      <td id="td-type2">{busses.rental_Rem}</td>
      <td  id="td-type2">{busses.phone_No}</td>
      <td>
      
      <div className="icon-table">
          <Link to={"updatebus/"+busses.bus_Id}>
          <i class="fas fa-pen-alt"></i>
          </Link>
          
    
          <a onClick={()=> deleteClick(busses.bus_Id)}>
          <i class="fas fa-trash-alt"></i>
          </a>
          </div>

      </td>
    </tr>

    ))}
  </tbody>
</table>


       </div>
      </div>
    );
  }
  
  export default Bus;