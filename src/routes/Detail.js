import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import data from "../data";
import styled from 'styled-components';

let Box = styled.div`
  padding : 20px;
  color : grey
`;
let YellowBtn = styled.button`
  background : ${props => props.bg};
  color : ${props => props.bg == 'blue' ? 'white' : 'black'};
  padding : 10px;
`;


function Detail(props) {

    const [isVisible, setIsVisible] = useState(true);
    const [isText, setIsText] = useState(false);
    const [inputValue, setInputValue] = useState('');

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
    console.log(findProduct.id)

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        if (isNaN(value) == true) {
            setIsText(true);
        } else {
            setIsText(false);
        }
    };

    return (
        <div className="container">
            {
                isVisible == true
                    ? <div className=" alert alert-warning">
                        2초이내 구매시 할인
                    </div>
                    : null
            }
            <Box>
                <YellowBtn bg="red">버튼</YellowBtn>
            </Box>
            <div className="row">
                <div className="col-md-6">
                    <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
                </div>
                <div className="col-md-6">
                    {
                        isText == false
                            ? <div className=" alert alert-warning">
                                그러지마세요
                            </div>
                            : null
                    }
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                    <h4 className="pt-5">{findProduct.title}</h4>
                    <p>{findProduct.content}</p>
                    <p>{findProduct.price}</p>
                    <button className="btn btn-danger">주문하기</button>
                </div>
            </div>
        </div>
    )

}

export default Detail;