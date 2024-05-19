// import React from 'react';
// import { Button, Card } from 'antd';
// import { useDispatch } from 'react-redux';

// const ItemList = ({ item }) => {
//   const dispatch = useDispatch();

//   const handleAddToCart = () => {
//     try {
//       dispatch({
//         type: "ADD_TO_CART",
//         payload: item
//       });
//     } catch (error) {
//       console.error('Error adding item to cart:', error);
//       // Handle error gracefully, e.g., show a toast notification
//     }
//   };

//   const { Meta } = Card;
  
//   return (
//     <div>
//       <Card
//         style={{ width: 240, marginBottom: 20 }}
//         cover={<img alt={item.name} src={item.image} style={{ height: 200 }} />}
//       >
//         <Meta title={item.name} />
//         <div className='item-button'>
//           <Button onClick={handleAddToCart}>Add to cart</Button>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default ItemList;

import React from 'react';
import { Button, Card } from 'antd';
import { useDispatch } from 'react-redux';



const ItemList = ({ item }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    try {
      dispatch({
        type: "ADD_TO_CART",
        payload: item
      });
    } catch (error) {
      console.error('Error adding item to cart:', error);
      // Handle error gracefully, e.g., show a toast notification
    }
  };

  const { Meta } = Card;
  return <div>
    <Card
      style={{ width: 240, marginBottom: 20 }}
      cover={<img alt={item.name} src={item.image} style={{ height: 200 }} />}
    >
      <Meta title={item.name} />
      <div className='item-button'>
        <Button onClick={handleAddToCart}>Add to cart</Button>
      </div>
    </Card>
  </div>;
};
export default ItemList;