// 
import React, {useEffect, useState} from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useDispatch } from 'react-redux';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import axios from 'axios'
import { Table,Modal,Button, Form, Input, Select, message } from 'antd';
// import { Modal,Button } from 'antd/es/radio';

const Itemspage = () => {
  const dispatch = useDispatch ()
  const [itemsData, setItemsData] = useState([]);
  const [popupmodal, setpopupmodal] = useState (false)
  const [editItem, setEditItem] = useState (null)

//get item
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
      dispatch({type: 'HIDE_LOADING'});
        console.log(error);
    }
}
  //use effect
  useEffect (() => {
    getAllItems();  
},[]);

//handleDelete
  const handleDelete = async (record) => {
    try {
      dispatch({
          type: 'SHOW_LOADING'
      });
     await axios.post('/api/items/delete-item', {itemId:record._id});
      message.success('Item Deleted Succesfully')
      getAllItems();  
      setpopupmodal (false);
      dispatch({type: 'HIDE_LOADING'})
      
  } catch (error) {
    dispatch({type: 'HIDE_LOADING'});
    message.error ('Something Went Wrong')
      console.log(error);
  }
  }



const columns = [
  {title:'Name', dataIndex:'name'},
  {title:'Image', dataIndex:'image', 
  render:(image,record) => (<img src = {image} alt = {record.name} height='60' width='60' />
),
},
  {title:'Price', dataIndex:'price'},
  
  {
      title:'Actions', dataIndex:'_id', render:(id,record) => <div>
      <EditOutlined style={{cursor:'pointer'}}
      onClick={() =>{
        setEditItem(record);
        setpopupmodal(true);

      }}
      />
      
      <DeleteOutlined style={{cursor:'pointer'}}
       onClick={()  =>{
        handleDelete(record)
       }}
       />
      </div> 
},

];
//handle submit
const handleSubmit = async (value) => {
  if (editItem === null){
    try {
      dispatch({
          type: 'SHOW_LOADING'
      })
      const res = await axios.post('/api/items/add-item', value);
      message.success('Item Added Succesfully')
      getAllItems();  
      setpopupmodal (false);
      dispatch({type: 'HIDE_LOADING'})
      
  } catch (error) {
    dispatch({type: 'HIDE_LOADING'});
    message.error ('Something Went Wrong')
      console.log(error);
  }
  }else{
    try {
      dispatch({
          type: 'SHOW_LOADING'
      })
       await axios.put('/api/items/edit-item', {...value, itemId:editItem._id});
      message.success('Item Updated Succesfully')
      getAllItems();  
      setpopupmodal (false);
      dispatch({type: 'HIDE_LOADING'})
      
  } catch (error) {
    dispatch({type: 'HIDE_LOADING'});
    message.error ('Something Went Wrong')
      console.log(error);
  }
  }
  
};
  return (
    <div>
      <DefaultLayout>
        <div className='d-flex justify-content-between'>
        <h1>Item List</h1>
        <Button type='primary' onClick={() => setpopupmodal(true)}>Add Item</Button> 
        </div>
        
        <Table columns={columns} dataSource={itemsData} bordered />
       {
        popupmodal && (
          <Modal title={`${editItem !== null ? 'Edit Item ': 'Add New Item'}`}
           open={popupmodal} 
           onCancel={() => {
            setEditItem(null)
            setpopupmodal(false)
          
          }}
          footer={false}
          >
         <Form layout='vertical' initialValues={editItem} onFinish={handleSubmit}>
            <Form.Item name="name" label="Name">
              <Input/>
            </Form.Item>
            <Form.Item name="price" label="Price">
              <Input/>
            </Form.Item>
            <Form.Item name="image" label="Image URL">
              <Input/>
            </Form.Item>
            <Form.Item name="category" label="Category">
            <Select>
              <Select.Option value="drinks">Drinks</Select.Option>
              <Select.Option value="deserts">Deserts</Select.Option>
              <Select.Option value="foods">Foods</Select.Option> 
            </Select>
            </Form.Item>
            <div className='d-flex justify-content-end'>
              <Button type='primary' htmlType='submit'>
                SAVE
              </Button>
            </div>     
         </Form>
        </Modal>
        )
       }
      </DefaultLayout>
    </div>
  )
}

export default Itemspage
