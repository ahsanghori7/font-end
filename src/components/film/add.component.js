import React, { useEffect , useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'

export default function CreateProduct() {
  const navigate = useNavigate();

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [release_date, setRelease_date] = useState("")
  const [rating, setRating] = useState("")
  const [ticket_price, setTicket_price] = useState("")
  const [country, setCountry] = useState("")
  const [image, setImage] = useState()
  const [token, setToken] = useState()

  const changeHandler = (event) => {
		setImage(event.target.files[0]);
	};


   useEffect(()=>{
       fetchToken()
    },[])

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
    }
     
 
  const createProduct = async (e) => {
    e.preventDefault();

    

    const formData = new FormData()

    formData.append('name', name)
    formData.append('release_date', release_date)
    formData.append('rating', rating)
    formData.append('ticket_price', ticket_price)
    formData.append('country', country)
    formData.append('description', description)
    formData.append('photo', image)

    await axios.post(`http://localhost:8000/api/film_add`, formData, config).then(({data})=>{
      
      if(data.message == "Film has been added !!"){

       Swal.fire({
        icon:"success",
        text:data.message
      })

       navigate('/films/')

      }else{

        Swal.fire({
        icon:"warning",
        text:data
      })

      }
    
    
    }).catch(({response})=>{
      if(response.status===422){

        Swal.fire({
        icon:"error",
        text:response.data.errors
        })

      }else{
        Swal.fire({
          text:response.data.message,
          icon:"error"
        })
      }
    })
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Create Film</h4>
              <hr />
              <div className="form-wrapper">
                
                <Form onSubmit={createProduct}>
                  <Row> 
                      <Col>
                        <Form.Group controlId="Name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" required value={name} onChange={(event)=>{
                              setName(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
                  <Row> 
                      <Col>
                        <Form.Group controlId="Name">
                            <Form.Label>Release date</Form.Label>
                            <Form.Control type="date" required value={release_date} onChange={(event)=>{
                              setRelease_date(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
                  <Row> 
                      <Col>
                        <Form.Group controlId="Name">
                            <Form.Label>Rating</Form.Label>
                            <Form.Control type="text" required value={rating} onChange={(event)=>{
                              setRating(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
                  <Row> 
                      <Col>
                        <Form.Group controlId="Name">
                            <Form.Label>Ticket Price</Form.Label>
                            <Form.Control type="text" required value={ticket_price} onChange={(event)=>{
                              setTicket_price(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
                  <Row> 
                      <Col>
                        <Form.Group controlId="Name">
                            <Form.Label>Country</Form.Label>
                            <Form.Control type="text" required  value={country} onChange={(event)=>{
                              setCountry(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
                  <Row className="my-3">
                      <Col>
                        <Form.Group controlId="Description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" required rows={3} value={description} onChange={(event)=>{
                              setDescription(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="Image" className="mb-3">
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="file" required onChange={changeHandler} />
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
        </div>
      </div>
    </div>
  )
}