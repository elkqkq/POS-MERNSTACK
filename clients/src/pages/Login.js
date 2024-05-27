import { Form, Input, Button } from 'antd';
import React from 'react'
import { Link } from 'react-router-dom'
const Login = () => {
        const handleSubmit = (value) =>{
            console.log(value)
        };
  return (

    <>
    <div className='login'>
        <div className='register-form'>            
        <h1>DIAMOND CAFE</h1>
        <h3>Log In Page</h3>

        <Form
        layout='vertical'
        
          onFinish={handleSubmit}>
        <Form.Item name="user id" label="User ID">
          <Input/>
        </Form.Item>
        <Form.Item name="password" label="Password">
          <Input/>
        </Form.Item>

        <div className='d-flex justify-content-between'>
            <p>
                Not  A User Please
                <Link to="/register">Register Here!</Link>

            </p>
            
          <Button type='primary' htmlType='submit'>
           LOG-IN
          </Button>
        </div>     
     </Form>

    </div>
    </div>
</>
  )
}

export default Login;
