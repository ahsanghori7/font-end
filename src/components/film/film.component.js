import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { useParams , useNavigate  } from 'react-router-dom';
import Swal from 'sweetalert2';
export default function Flim(props) {
    const navigate = useNavigate();
    const [comment, setComment] = useState("")
    const [film_id, setFilm_id] = useState("")
    const [film, setFilm] = useState([])
    const [token, setToken] = useState()
    const slug = useParams()


    useEffect(()=>{
        fetchFlim() 
        fetchToken()
    },[])

    const para =  slug.slug 


    const fetchFlim = async () => {
        await axios.get("http://localhost:8000/api/film/"+para).then(({data})=>{
            setFilm(data)
        })
    }


    const formData = new FormData()

    formData.append('email', "ahsan@gmailcom")
    formData.append('password', "12345")

    const fetchToken = async () => {
        await axios.post('http://localhost:8000/api/login',formData).then(({data})=>{
            setToken(data.success.token) 

        })
    }

    const config = {
    headers: { Authorization: "Bearer "+token }
    };

    const postComment = async (e) => {
    e.preventDefault();

    const formData = new FormData()

    formData.append('comment', comment)
    formData.append('film_id', film.id)
    formData.append('added_by', 1)

    await axios.post(`http://localhost:8000/api/add_comment`, formData, config ).then(({data})=>{
       
       //console.log(data);

        Swal.fire({
          text:data.message,
          icon:"success"
        })

      //window.location.reload(false);
    }).catch(({response})=>{
   
        Swal.fire({
          text:response.data.message,
          icon:"error"
        })

      
    })
  }

    return (
      <div className="container">
          <div className="row">
          
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
                                    
                                </tr>
                            </thead>
                            <tbody>
                                
                                                <td>{film.name}</td>
                                                <td>{film.description}</td>
                                                <td>{film.release_date}</td>
                                                <td>{film.rating}</td>
                                                <td>{film.ticket_price}</td>
                                                <td>{film.country}</td>
   

                                
                            </tbody>
                        </table>
                    </div>
                

                  <Form onSubmit={postComment}>
                  <Row> 
                      <Col>
                        <Form.Group controlId="Name">
                            <Form.Label>Post Your Comment</Form.Label>
                            <Form.Control type="text" required value={comment} onChange={(event)=>{
                              setComment(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
                
                
                  <Button variant="primary" className="mt-2" size="lg" block="block" type="submit">
                    Save
                  </Button>
                </Form>

            </div>
          </div>
      </div>
    )
}