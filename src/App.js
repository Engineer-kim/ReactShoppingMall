/*eslint-disable*/
import logo from './logo.svg';
import { useState } from "react";
import { Navbar, Container, Nav } from 'react-bootstrap'
import './App.css';
import data from './data';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Detail from './routes/Detail';

function App() {

  let [shoes] = useState(data);
  let navigate = useNavigate();



  console.log(shoes);

  return (
    <div className='App'>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>K.H.J.Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={() => { navigate('/detail') }}>Detail</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Link to="/">홈</Link>
      <Link to="/detail">상세페이지</Link>
      <Routes>
        <Route path='/' element={
          <>
            <div className='main-bg'></div>
            <div className="container">
              <div className="row">
                {/* <Product shoes = {shoes[1]} i={2}/>
                  <Product shoes = {shoes[2]} i={3}/> */}
                {
                  shoes.map((a, i) => {
                    return (
                      <Product shoes={shoes[i]} i={i} />
                    )
                  })
                }
              </div>
            </div>
          </>
        } />
        <Route path='/detail/:id' element={<Detail shoes = {shoes} />} />

        </Routes>
    </div>
  );
}

function Product(props) {
  return (
    <div className="col-md-4">
      <img src={`https://codingapple1.github.io/shop/shoes${props.i + 1}.jpg`} width="80%" />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </div>
  )
}

function About() {
  return (
    <div>
      <h4>about페이지임</h4>
      <Outlet></Outlet>
    </div>
  )
}

function EventPage() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  )
}


export default App;
