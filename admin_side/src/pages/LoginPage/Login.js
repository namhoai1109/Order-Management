import React, { Component } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faUser } from '@fortawesome/free-solid-svg-icons';

import Background from '~/assets/images/backgroundAdmin.jpg';



import './Login.scss';

function Login() {

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="adminPage_container">
            <div className="login_background">
                <img src={Background} alt="Background" />
            </div>
            <div className="login_container">
                <div className="login_form">
                    <div className="login_form_title">Login</div>
                    <Form
                        name="basic"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >

                        <Form.Item
                            label={<FontAwesomeIcon icon={faUser} />}
                            name="username"
                            rules={[
                                {

                                    required: true,
                                    message: 'Please input your username!',
                                    placeholder: 'Username'
                                },
                            ]}

                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label={<FontAwesomeIcon icon={faKey} />}
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                    placeholder: 'Password'
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            className='login_form_remember'
                            name="remember"
                            valuePropName="checked"
                        >
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item className="login_form_btnSubmit">
                            <Button className='btnSubmit' type="primary" htmlType="submit">Submit</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>

    );

}

export default Login;