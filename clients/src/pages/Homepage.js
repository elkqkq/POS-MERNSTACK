import React, { useState, useEffect} from "react";
import DefaultLayout from "./../components/DefaultLayout";
import ItemList from "./../components/ItemList";
import { Row, Col } from "antd";
import { UseDispatch, useDispatch } from "react-redux";
import axios from "axios";


const Homepage = () => {
    const [itemsData, setItemsData] = useState([]);
    const dispatch = useDispatch ()
    //useEffect
    useEffect (() => {
        const getAllItems = async ()  => {
            try {
                dispatch({
                    type: 'SHOW_LOADING'
                })
                const {data} = await axios.get('/api/items/get-item');
                setItemsData(data);
                // dispatch({type: 'HIDE_LOADING'})
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }

        getAllItems();  
    },[]);
  return (
    <DefaultLayout>
     <Row>
        {
            itemsData.map((item) => (
                <Col xs={24} lg={6} md={12} sm={6}>
                    <ItemList item={item} />
                </Col>
            ))
        }
     </Row>
    </DefaultLayout>
  );
};

export default Homepage;