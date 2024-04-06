import { get } from 'lodash';
import React from 'react';
import { useSelector } from 'react-redux';
import DealerOrderBoxContainer from '../container/DealerOrderBoxContainer';
import OrderBoxContainer from '../container/OrderBoxContainer';

const OrderBoxPage = () => {
    const userData = useSelector((store) => store.auth.user);
    const isAdmin = get(userData, "token.data.isAdmin", false);
 
    return (
        <>
            {
            isAdmin ?
                    <OrderBoxContainer /> 
                    :
                    <DealerOrderBoxContainer/>
            }
        </>
    );
};

export default OrderBoxPage;
