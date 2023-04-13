import React from "react";
import { Button, Modal, Form, Input } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import useAddStaff from "./useAddStaff";

const AddStaff = () => {
    const { data, visible, setVisible, handleInputChange, handleOk } = useAddStaff();

    return (
        <>
            <Button onClick={() => setVisible(true)} className="staff_add">
                <FontAwesomeIcon icon={faPlus} />
                Add Staff
            </Button>
            <Modal
                title="Add Staff"
                visible={visible}
                onOk={handleOk}
                onCancel={() => {
                    console.log("Clicked cancel button");
                    setVisible(false);
                }}
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
};

export default AddStaff;
