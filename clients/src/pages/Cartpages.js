import React from 'react'
import DefaultLayout from '../components/DefaultLayout';
import { DeleteOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { Table } from 'antd';

const Cartpages = () => {
    const {cartItems} = useSelector(state => state.rootReducer)

    const columns = [
        {title:'Name', dataIndex:'name'},
        {title:'Image', dataIndex:'image', 
        render:(image,record) => (<img src = {image} alt = {record.name} height='60' width='60' />
    ),
},
        {title:'Price', dataIndex:'price $'},
        {title:'Quantity'},
        {title:'Actions', dataIndex:'id', render:(id,record) => <DeleteOutlined />}

    ]
  return (
    <DefaultLayout>
        <h1>Cart Pages</h1>
        <Table columns={columns} dataSource={cartItems} bordered />    

    </DefaultLayout>
  )
}

export default Cartpages