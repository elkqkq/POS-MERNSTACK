import React, { useEffect, useState, useRef } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import ReactToPrint from 'react-to-print';
import { useDispatch } from 'react-redux';
import { EyeOutlined } from '@ant-design/icons';
import { useReactToPrint } from 'react-to-print'; // Correct import for useReactToPrint
import axios from 'axios';
import { Modal, Button, Table } from 'antd';
import '../styles/InvoiceStyle.css';

const BillsPage = () => {
    const componentRef = useRef();
    const dispatch = useDispatch();
    const [billsData, setBillsData] = useState([]);
    const [popupModal, setPopupModal] = useState(false);
    const [selectedBill, setSelectedBill] = useState({});

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

    // print invoice
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    // table columns
    const columns = [
        { title: 'ID', dataIndex: '_id' },
        { title: 'customerName', dataIndex: 'customerName' },
        { title: 'CustomerNumber', dataIndex: 'CustomerNumber' },
        { title: 'subTotal', dataIndex: 'subTotal' },
        { title: 'Tax', dataIndex: 'Tax' },
        { title: 'Total Amount', dataIndex: 'totalAmount' },
        {
            title: 'Actions',
            dataIndex: '_id',
            render: (id, record) => (
                <div>
                    <EyeOutlined style={{ cursor: 'pointer' }} onClick={() => {
                        setSelectedBill(record);
                        setPopupModal(true);
                    }} />
                </div>
            ),
        },
    ];

    console.log(selectedBill);

    return (
        <DefaultLayout>
            <div className='d-flex justify-content-between'>
                <h1>Invoice List</h1>
            </div>

            <Table columns={columns} dataSource={billsData} bordered />

            {
                popupModal && (
                    <Modal
                        title="Invoice Details"
                        open={popupModal}
                        onCancel={() => setPopupModal(false)}
                        footer={null}
                    >
                        {/* ----------------invoice modal start---------------------- */}
                        <div id='invoice-POS' ref={componentRef}>
                            <center id='top'>
                                <div className='logo' />
                                <div className='info'>
                                    <h2>DIAMOND CAFE</h2>
                                    <p>Contact: 0729935458 | Nairobi, Kenya</p>
                                </div>
                            </center>

                            <div id='mid'></div>
                            <div className='mt-2'>
                                <p>
                                    Client Name : <b>{selectedBill.clientName}</b>
                                    <br />
                                    Contact No : <b>{selectedBill.clientNumber}</b>
                                    <br />
                                    Date : <b>{new Date(selectedBill.date).toISOString().substring(0, 10)}</b>
                                    <br />
                                </p>
                                <hr style={{ margin: "5px" }} />
                            </div>

                            <div id='bot'></div>
                            <div id='table'>
                                <table>
                                    <tbody>
                                        <tr className='tabletitle'>
                                            <td className='item'>
                                                <h2>Item</h2>
                                            </td>
                                            <td className='Hours'>
                                                <h2>Qty</h2>
                                            </td>
                                            <td className='Rate'>
                                                <h2>Price</h2>
                                            </td>
                                            <td className='Rate'>
                                                <h2>Total</h2>
                                            </td>
                                        </tr>
                                        {selectedBill.cartItems.map((item) => (
                                            <tr className='service' key={item.name}>
                                                <td className='tableitem'>
                                                    <p className='itemtext'>{item.name}</p>
                                                </td>
                                                <td className='tableitem'>
                                                    <p className='itemtext'>{item.quantity}</p>
                                                </td>
                                                <td className='tableitem'>
                                                    <p className='itemtext'>{item.price}</p>
                                                </td>
                                                <td className='tableitem'>
                                                    <p className='itemtext'>{item.quantity * item.price}</p>
                                                </td>
                                            </tr>
                                        ))}
                                        <tr className='tabletitle'>
                                            <td />
                                            <td />
                                            <td className='Rate'>
                                                <h2>vat</h2>
                                            </td>
                                            <td className='payment'>
                                                <h2>{selectedBill.vat}</h2>
                                            </td>
                                        </tr>
                                        <tr className='tabletitle'>
                                            <td />
                                            <td />
                                            <td className='Rate'>
                                                <h2>Grand Total</h2>
                                            </td>
                                            <td className='payment'>
                                                <h2>
                                                    <b>{selectedBill.totalAmount}</b>
                                                </h2>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div id='legalcopy'>
                                <p className='legal'>
                                    <strong>Thank you for your order!</strong>At Diamond Cafe, we believe in creating not just a place for dining but a warm and welcoming community. As the owner, I want to take a moment to personally thank each and every one of you for your continued support and patronage.<b>Diamondcafe@gmail.com</b>
                                </p>
                            </div>

                            {/* ----------------invoice modal end---------------------- */}
                           
                        </div>
                        <div className='d-flex justify-content-end mt-3'>
                                <Button type='primary' onClick={handlePrint}>Print</Button>
                            </div>
                    </Modal>
                )
            }
        </DefaultLayout>
    );
};

export default BillsPage;