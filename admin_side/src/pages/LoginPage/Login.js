import React, { Component } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faUser } from '@fortawesome/free-solid-svg-icons';


import './Login.scss';

class Login extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const onFinish = (values) => {
            console.log('Success:', values);
        };
        const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
        };
        return (
            <div className="adminPage_container">
                <div className="login_container">
                    <div className="login_form">
                        <div className="login_form_title">Login</div>
                        <Form
                            name="basic"
                            labelCol={{
                                span: 8,
                            }}
                            wrapperCol={{
                                span: 16,
                            }}
                            style={{
                                width: '350px',
                                transform: 'translate(-51px,15px)',
                            }}
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >

                            <Form.Item
                                style={{ marginBottom: '12px' }}
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
                                style={{ marginBottom: '8px' }}
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
                                style={{ marginBottom: '10px' }}
                                name="remember"
                                valuePropName="checked"
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                            >
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            <Form.Item
                                wrapperCol={{
                                    offset: 13,
                                    span: 16,
                                }}
                            >
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>

        );
    }
}

export default Login;