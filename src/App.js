/*eslint-disable*/
import logo from './logo.svg';
import { createContext, Suspense, useEffect, useState, lazy } from "react";
import { Navbar, Container, Nav } from 'react-bootstrap'
import './App.css';
import data from './data';
import { Routes, Route, Link, useNavigate, Outlet, json } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';

export let Context1 = createContext();


const Detail = lazy(() => import('./routes/Detail.js'))
const Cart = lazy(() => import('./routes/Cart.js'))

function App() {
  useEffect(() => {
    let watchedItems = localStorage.getItem('watched')
    //watched'라는 항목이 저장되어 있지 않은 경우
    if (!watchedItems) {
      localStorage.setItem('watched', JSON.stringify([]));
      return;
    }
    watchedItems = JSON.parse(watchedItems);
  }, []);


  let [itemId, clickItem] = useState([]);



  let [shoes] = useState(data);
  let navigate = useNavigate();
  let [additionalShoes, setAdditionalShoes] = useState([]);
  let [count, changeCount] = useState(0);
  let [loading, setLoading] = useState(false);
  let [재고] = useState([10, 11, 12]);



  console.log(shoes);

  const getData = () => {
    console.log("count:::::::::::" + count)
    if (count >= 2) {
      alert("더이상 가져올 상품 없음");
      return;
    }
    const clickCount = count + 1;
    changeCount(clickCount);

    setLoading(true);

    axios.get('https://codingapple1.github.io/shop/data2.json')
      .then((result) => {
        console.log(result.data);
        setAdditionalShoes(prevShoes => [...prevShoes, ...result.data]);
      })
      .catch(() => {
        console.log('실패함');
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 250);
      })
  };


  let result = useQuery('작명', () =>
    axios.get('https://codingapple1.github.io/userdata.json')
      .then((a) => { return a.data })
  );

  return (
    <div className='App'>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>K.H.J.Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={() => { navigate('/detail') }}>Detail</Nav.Link>
          </Nav>
          <Nav className='ms-auto' style={{ color: 'white' }}>
            {result.data && result.data.name} {/*데이터가 있으면 있는 데이터중 이름이란 벨류의 값을 읽어오도록함*/}
          </Nav>
        </Container>
      </Navbar>
      <Suspense fallback={<div>로딩중임</div>}>
        <Routes>
          <Route path='/' element={
            <>
              <div className='main-bg'></div>
              <div className="container">
                <div className="row">
                  {/* 로딩 중일 때 */}
                  {loading ? (
                    <IsLoading />
                  ) : (
                    <>
                      {shoes.map((a, i) => (
                        <Product key={i} shoes={shoes[i]} i={i} />
                      ))}
                      {additionalShoes.map((shoe, i) => (
                        <Product
                          key={i + shoes.length}
                          shoes={shoe}
                          i={i + shoes.length}
                        />
                      ))}
                    </>
                  )}
                </div>
              </div>
              <button onClick={getData}>더보기</button>
            </>
          }
          />
          <Route path="/detail/:id" element={
            <Detail shoes={shoes} />
          } />
          <Route path='/cart' element={
            <Cart />
          } />
        </Routes>
      </Suspense>
    </div>
  );
}

function Product(props) {
  const navigate = useNavigate();
  const goToDetail = (id) => {
    navigate(`/detail/${id}`);
  };

  let indexValue = (parseInt(props.shoes.id) + 1)
  // console.log("1번 신발 사진:::" + `https://codingapple1.github.io/shop/shoes${props.i}.jpg`);
  // console.log("2번 신발 사진:::" + `https://codingapple1.github.io/shop/shoes${props.i+1}.jpg`);
  // console.log("3번 신발 사진:::" + `https://codingapple1.github.io/shop/shoes${props.i+2}.jpg`);
  return (
    <div className="col-md-4">
      <img src={`https://codingapple1.github.io/shop/shoes` + indexValue + `.jpg`} width="80%" alt={`shoes${parseInt(props.shoes.id) + 1}`} />
      <h4 onClick={() => goToDetail(props.shoes.id)}>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </div>
  )
}

function IsLoading() {
  return (
    <div className=" alert alert-warning">
      <p>로딩 중입니다...</p>
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
