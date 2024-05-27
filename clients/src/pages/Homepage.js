import React, { useState, useEffect} from "react";
import DefaultLayout from "./../components/DefaultLayout";
import ItemList from "./../components/ItemList";
import { Row, Col } from "antd";
import { useDispatch } from "react-redux";
import axios from "axios";


const Homepage = () => {
    const [itemsData, setItemsData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("foods")
    const categories = [
        {name: "drinks", 
        imageUrl: "https://www.flaticon.com/free-icon/drink_2738730?term=drinks&page=1&position=3&origin=search&related_id=2738730"},

        {
            name: "deserts",
            imageUrl: "https://www.flaticon.com/free-icon/cake_605199?term=cake&page=1&position=1&origin=search&related_id=605199"


        },
        {
            name: "foods",
            imageUrl: "https://www.flaticon.com/free-icon/food_2738731?term=food&page=1&position=4&origin=search&related_id=2738731"

        }
    ]
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
                dispatch({type: 'HIDE_LOADING'})
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }

        getAllItems();  
    },[dispatch]);
  return (
    <DefaultLayout>
        <div className="d-flex">
            {categories.map(category =>(
                <div key={category.name} className={`d-flex category ${selectedCategory === category.name && 'category-active'}`}
                onClick={() => setSelectedCategory(category.name)}
                >
                    <h4>{category.name}</h4>
                    <img src= {category.name} alt={category.name}
                     height="60" width="60"/>
                </div>
            ))}
        </div>
     <Row>
        {
            itemsData
            .filter((i) => i.category === selectedCategory)
            .map((item) => (
                <Col xs={24} lg={6} md={12} sm={6}>
                    <ItemList key={item.id} item={item} /> 
                </Col>
            ))
        }
     </Row>
    </DefaultLayout>
  );
};

export default Homepage;