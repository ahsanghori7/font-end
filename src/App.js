import * as React from "react";
import './App.css';
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import 'bootstrap/dist/css/bootstrap.css';

import { BrowserRouter as Router , Routes, Route, Link , Navigate } from "react-router-dom";

import FilmLists from "./components/film/list.component"; 
import Film from "./components/film/film.component";
import CreateFilm from "./components/film/add.component";

 

function App() {
  return (
    <Router>
    <Navbar bg="primary">
      <Container>
        <Link to={""} className="navbar-brand text-white">
          Font End
        </Link>
      </Container>
    </Navbar>

    <Container className="mt-5">
      <Row>
        <Col md={12}>
          <Routes>
          <Route path="/" element={<Navigate replace to="/films/" />} />
          <Route path="/films/create" element={<CreateFilm />} />
          <Route exact path='/films/' element={<FilmLists />} />
          <Route exact path='/films/:slug' element={<Film />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  </Router>
  );
}

export default App;
