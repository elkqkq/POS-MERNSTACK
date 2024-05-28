// 
import React, {useEffect, useState} from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Table } from 'antd';


const Customerpage = () => {
    const [billsData, setBillsData] = useState([]);
    const dispatch = useDispatch();
    const getAllBills = async () => {
        try {
            dispatch({ type: "SHOW_LOADING" });
            const { data } = await axios.get('/api/bills/get-bills');
            setBillsData(data);
            dispatch({ type: "HIDE_LOADING" });
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllBills();
    }, []);
    // table columns
    const columns = [
        { title: 'ID', dataIndex: '_id' },
        { title: 'customerName', dataIndex: 'customerName' },
        { title: 'CustomerNumber', dataIndex: 'CustomerNumber' },
        
        
    ];

  return (
    <DefaultLayout>
        <h1>Customers Page</h1>
        <Table columns={columns} dataSource={billsData} bordered pagination={false} />

    </DefaultLayout>
  )
}

export default Customerpage
