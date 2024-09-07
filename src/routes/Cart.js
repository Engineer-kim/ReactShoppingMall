
/*eslint-disable*/
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { changeName } from './../store/userSlice.js';
import { changeQuantity  } from '../store.js'

function Cart() {

    const state = useSelector((state) => state);
    let dispatch = useDispatch(); //StoreJs 로 요청 보내주는 함수


    return (
        <div>{state.user.name} 의 장바구니
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state.cart.map((number, idx) => {
                            return (
                                <tr key={idx}>
                                    <td>{idx}</td>
                                    <td>{state.cart[idx].name}</td>
                                    <td>{state.cart[idx].count}</td>
                                    <td>
                                        <button onClick={() => {
                                            dispatch(changeQuantity(idx));
                                        }}>
                                            +
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}
export default Cart;