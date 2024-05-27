import { Form, Input, Button } from 'antd';
import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
    const handleSubmit = (value) =>{
        console.log(value)
    }
  return (
    <>
        <div className='register'>
            <div className='register-form'>            
            <h1>DIAMOND CAFE</h1>
            <h3>Register Page</h3>

            <Form
            layout='vertical'
            
              onFinish={handleSubmit}>
            <Form.Item name="name" label="Name">
              <Input/>
            </Form.Item>
            <Form.Item name="user id" label="User ID">
              <Input/>
            </Form.Item>
            <Form.Item name="password" label="Password">
              <Input/>
            </Form.Item>

            <div className='d-flex justify-content-between'>
                <p>
                    Already Register Please
                    <Link to="/login">Log In Here!</Link>

                </p>
                
              <Button type='primary' htmlType='submit'>
                REGISTER
              </Button>
            </div>     
         </Form>

        </div>
        </div>
    </>
  )
}

export default Register;
