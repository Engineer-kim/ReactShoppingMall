/*eslint-disable*/
import { useContext, useEffect, useState } from "react";
import { Router, useNavigate, useParams } from "react-router-dom";
import { Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../store';

function Detail(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const tabs = ["탭0", "탭1", "탭2"];
    const [isVisible, setIsVisible] = useState(true);
    // const [isText, setIsText] = useState(false);
    //const [inputValue, setInputValue] = useState('');

    const [tab, tabChange] = useState(0);

    
    let { id } = useParams();
    let findProduct = props.shoes.find(x => x.id == id);

    console.log("현재 신발 ID: ", id);

    if (!findProduct) {
        return <div>상품을 찾을 수 없습니다.</div>;
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false)
        }, 2000);
        return () => clearTimeout(timer);
    }, [])


    useEffect(() => {
        let extractData = localStorage.getItem('watched');
        extractData =  JSON.parse(extractData);
        extractData.push(findProduct.id);
        extractData = new Set(extractData);
        extractData = Array.from(extractData)
        localStorage.setItem('watched', JSON.stringify(extractData))
    }, []);


    // const handleInputChange = (e) => {
    //     const value = e.target.value;
    //     setInputValue(value);

    //     if (isNaN(value) == true) {
    //         setIsText(true);
    //     } else {
    //         setIsText(false);
    //     }
    // };

    return (
        <div className="container">
            {
                isVisible == true
                    ? <div className=" alert alert-warning">
                        2초이내 구매시 할인
                    </div>
                    : null
            }
            <div className="row">
                <div className="col-md-6">
                    <img src={`https://codingapple1.github.io/shop/shoes${parseInt(id) + 1}.jpg`} width="100%" />
                </div>
                <div className="col-md-6">
                    {/* <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                    /> */}
                    <h4 className="pt-5">{findProduct.title}</h4>
                    <p>{findProduct.content}</p>
                    <p>{findProduct.price}</p>
                    {console.log(findProduct)}
                    
                    <button className="btn btn-danger" onClick={() => {
                        dispatch(addItem({id : findProduct.id, name : findProduct.title}))
                    }}>주문하기</button>
                </div>
                <button className="btn btn-primary" onClick={() => navigate('/cart')}>장바구니로 이동</button>
            </div>
            <Nav variant="tabs" defaultActiveKey="link0">
                {tabs.map((title, index) => (
                    <Nav.Item key={index}>
                        <Nav.Link onClick={() => tabChange(index)} eventKey={`link${index}`}>
                            {title}
                        </Nav.Link>
                    </Nav.Item>
                ))}
            </Nav>
            <TabContent tab={tab} shoes={props.shoes} />

        </div>
    )

}

function TabContent({ tab, shoes }) {
    let [fade, setFade] = useState('')
    let [opacityDegree, changeOpacity] = useState(0)

    useEffect(() => {
        let fadeTimer = setTimeout(() => {
            setFade('end')
            changeOpacity(1)
        }, 200)
        return () => {
            clearTimeout(fadeTimer)
            setFade('')
            changeOpacity(0)
        }
    }, [tab])

    return (
        <div className={'start ' + fade} style={{ opacity: opacityDegree }}>
            {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tab]}
        </div>
    )
}


export default Detail;