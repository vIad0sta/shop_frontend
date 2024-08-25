import React, {useEffect, useState} from 'react';
import {Pagination} from "@mui/material";
import OrderRequests from "../Requests/OrderRequests";

function OrdersHistoryPage(props) {
    const [params, setParams] = useState({size: 12})
    const [currentPage, setCurrentPage] = useState(1);
    const [pagesCount, setPagesCount] = useState(1);
    const [ordersHistory, setOrdersHistory] = useState([])
    useEffect(() => {
        fetchProducts();
    }, [params]);
    const fetchProducts = async () => {
        const ordersData = await OrderRequests.getAllOrders(params)
        setOrdersHistory(ordersData.orders);
        setPagesCount(ordersData.pages);
    }
    const onPageChange = (event, value) => {
        event.preventDefault()
        setCurrentPage(value - 1);
        setParams({...params, page: value - 1});
    }
    return (
        <div>
            <div>
                {ordersHistory && ordersHistory.map(order => (
                    <p>{order.id}</p>
                ))}
            </div>
            <div style={{marginTop: '20px'}}>
                <Pagination
                    onChange={onPageChange}
                    color={'secondary'}
                    count={pagesCount}
                    size="large"
                    defaultPage={1}
                />
            </div>
        </div>

    );
}

export default OrdersHistoryPage;