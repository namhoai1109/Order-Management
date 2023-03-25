import { Form, Button } from "react-bootstrap"

// import { EmployeeContext } from '../contexts/EmployeeContext';
import { useContext, useState } from 'react';

const EditShipper = ({ shipper }) => {

    const id = shipper.id;

    const [name, setName] = useState(shipper.name);
    const [email, setEmail] = useState(shipper.email);
    const [address, setAddress] = useState(shipper.address);
    const [phone, setPhone] = useState(shipper.phone);


    // const { updateEmployee } = useContext(EmployeeContext);

    // const updatedEmployee = { id, name, email, address, phone }

    const handleSubmit = (e) => {
        e.preventDefault();
        // updateEmployee(id, updatedEmployee)
    }

    return (

        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Name *"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                    type="email"
                    placeholder="Email *"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                    as="textarea"
                    placeholder="Address"
                    rows={3}
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Phone"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </Form.Group>
            <Button variant="success" type="submit" block>
                Edit Employee
            </Button>
        </Form>

    )
}

export default EditShipper;