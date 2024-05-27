import React, { useState, useEffect } from 'react'
import DefaultLayout from '../components/DefaultLayout';
import { DeleteOutlined, PlusCircleOutlined , MinusCircleOutlined} from '@ant-design/icons';
import { useSelector,useDispatch } from 'react-redux';
import { Button, Modal, Table, message, Form, Input, Select } from 'antd';

const Cartpages = () => {
    const [subTotal, setSubTotal] = useState (0)
    const [billPopup, setBillPopup] = useState (false)


    const dispatch = useDispatch()
    const {cartItems} = useSelector(state => state.rootReducer)
    //handle Increament

    const handleIncreament = (record) => {
        dispatch ({
            type: 'UPDATE_CART',
            payload: {...record, quantity: record.quantity + 1},
        });

    };

    const handleDecreament = (record) => {
        if(record.quantity !== 1){
            dispatch ({
                type: 'UPDATE_CART',
                payload: {...record, quantity: record.quantity - 1},
            });
    

        }
       
    };

    const columns = [
        {title:'Name', dataIndex:'name'},
        {title:'Image', dataIndex:'image', 
        render:(image,record) => (<img src = {image} alt = {record.name} height='60' width='60' />
    ),
},
        {title:'Price', dataIndex:'price'},
        {title:'Quantity', dataIndex:'_id',
        render: (id, record) => <div>
        <PlusCircleOutlined className="mx-3" style={{cursor:'pointer'}}
        onClick={() => handleIncreament (record)} />
        <b>{record.quantity}</b>
        <MinusCircleOutlined className="mx-3" style={{cursor:'pointer'}}
        onClick={() => handleDecreament (record)} />
    </div>},
        {
            title:'Actions', dataIndex:'_id', render:(id,record) => <DeleteOutlined style={{cursor:'pointer'}}
        onClick={() => dispatch({
            type:'DELETE_FROM_CART',
            payload:record

        }) } />
     },

    ];

    useEffect(() =>{
        let temp=0
        cartItems.forEach(item => temp = temp + (item.price * item.quantity)) 
        setSubTotal(temp);
    },[cartItems]);

    //handleSubmit
    const handleSubmit = (values) => {
        console.log(values);
    }


  return (
    <DefaultLayout>
        <h1>Cart Pages</h1>
        <Table columns={columns} dataSource={cartItems} bordered />    
        <div className='d-flex flex-column align-items-end'>
            <hr/>
            <h3>SubTotal: Kshs  <b> {subTotal} </b> /- </h3>
            <Button type='primary' onClick={() => setBillPopup(true)}>Create Invoice</Button>
        </div>
        <Modal title="Create Invoice" 
        visible={billPopup} 
        onCancel={() => setBillPopup(false)}
         footer={false}>
            <Form layout='vertical' 
             onFinish={handleSubmit}>
            <Form.Item name="CustomerName" label="Customer Name">
              <Input/>
            </Form.Item>
            <Form.Item name="CustomerNumber" label="Customer Contact">
              <Input/>
            </Form.Item>
           
            <Form.Item name="PaymentMode" label="Payment Method">
            <Select>
              <Select.Option value="cash">Cash</Select.Option>
              <Select.Option value="card">Card</Select.Option>
            </Select>
            </Form.Item>
            <div className='bill-item'>
                <h5> Sub Total:<b>{subTotal}</b></h5>
                <h4>
                    Tax
                    <b>{((subTotal / 100 ) * 3).toFixed(2)}</b>
                </h4>
                <h3>
                    GRAND TOTAL - {""}
                    <b>
                        {Number(subTotal) + Number(((subTotal / 100 ) * 10).toFixed(2))}
                    </b>
                </h3>
            </div>
            <div className='d-flex justify-content-end'>
              <Button type='primary' htmlType='submit'>
                Generate Bill
              </Button>
            </div>     
         </Form>
        </Modal>
    </DefaultLayout>
  )
}

export default Cartpages;