import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import data from "../data";
import styled from 'styled-components';
import { Nav } from 'react-bootstrap';

function Detail(props) {
    const tabs = ["탭0", "탭1", "탭2"];
    const [isVisible, setIsVisible] = useState(true);
    // const [isText, setIsText] = useState(false);
    //const [inputValue, setInputValue] = useState('');

    const [tab, tabChange] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false)
        }, 2000);
        return () => clearTimeout(timer);
    }, [])

    let { id } = useParams();
    let findProduct = props.shoes.find(x => x.id == id);

    if (!findProduct) {
        return <div>상품을 찾을 수 없습니다.</div>;
    }

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
                    <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
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
                    <button className="btn btn-danger">주문하기</button>
                </div>
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
            <TabContent tab={tab} />

        </div>
    )

}

function TabContent({ tab }) {
    let [fade, setFade] = useState('')
    let [opacityDegree, changeOpacity] = useState(0)

    useEffect(() => {
       let fadeTimer = setTimeout(()=> {
            setFade('end')
            changeOpacity(1)
        } , 200)
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