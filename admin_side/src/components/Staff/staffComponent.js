import React, { useState } from "react";
import { Button, Modal, Form, Input } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { usedAddStaff } from "~/services/Admin/services";


export const AddStaff = () => {
    const [data, setData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setData((prevState) => ({ ...prevState, [name]: value }));
    };

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = async () => {
        const staff = { ...data };
        try {
            await usedAddStaff(staff);
            setVisible(false);
            setConfirmLoading(false);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    const handleCancel = () => {
        console.log("Clicked cancel button");
        setVisible(false);
    };

    return (
        <>
            <Button onClick={showModal} className="staff_add">
                <FontAwesomeIcon icon={faPlus} />
                Add Staff
            </Button>
            <Modal
                title="Add Staff"
                open={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <Form>
                    <Form.Item label="Username">
                        <Input
                            placeholder="Username"
                            name="username"
                            value={data.username || ""}
                            onChange={handleInputChange}
                        />
                    </Form.Item>
                    <Form.Item label="Password">
                        <Input.Password
                            placeholder="Password"
                            name="password"
                            value={data.password || ""}
                            onChange={handleInputChange}
                        />
                    </Form.Item>
                    <Form.Item label="Email">
                        <Input
                            placeholder="Email"
                            name="email"
                            value={data.email || ""}
                            onChange={handleInputChange}
                        />
                    </Form.Item>
                    <Form.Item label="Phone">
                        <Input
                            placeholder="Phone"
                            name="phone"
                            value={data.phone || ""}
                            onChange={handleInputChange}
                        />
                    </Form.Item>
                    <Form.Item label="Name">
                        <Input
                            placeholder="Name"
                            name="name"
                            value={data.name || ""}
                            onChange={handleInputChange}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );

}
