import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import axios from 'axios';


export default function List() {

    const [films, setFlims] = useState([])

    useEffect(()=>{
        fetchFlims() 
    },[])

    const fetchFlims = async () => {
        await axios.get('http://localhost:8000/api/films').then(({data})=>{
            setFlims(data)
        })
    }

    

    return (
      <div className="container">
          <div className="row">
            <div className='col-12'>
                <Link className='btn btn-primary mb-2 float-end' to={"/films/create"}>
                    Create Film
                </Link>
            </div>
            <div className="col-12">
                
                    <div className="table-responsive">
                        <table className="table table-bordered mb-0 text-center">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Release Date</th>
                                    <th>Rating</th>
                                    <th>Ticket Price</th>
                                    <th>Country</th>
                                    <th>Genres</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    films.length > 0 && (
                                        films.map((row, key)=>(
                                            <tr key={key}>
                                                <td>{row.name}</td>
                                                <td>{row.description}</td>
                                                <td>{row.release_date}</td>
                                                <td>{row.rating}</td>
                                                <td>{row.ticket_price}</td>
                                                <td>{row.country}</td>
  
                                                 <td>
                                                { row.genres.map((genres) => {
                                                 return ( <td> {genres.genre_name} , </td> ); 
                                                }) }   
                                                </td> 
                                            </tr>
                                        ))
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                
            </div>
          </div>
      </div>
    )
}